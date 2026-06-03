from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta
import yfinance as yf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error, r2_score
import os 
from django.conf import settings
from .utils import save_plot
from tensorflow.keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


# Create your views here.
class StockPredictionAPIView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access
    
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            
            try:
                #fetch historical stock data
                now = datetime.now()
                start = datetime(now.year - 10, now.month, now.day)
                end = now
                df = yf.download(ticker, start=start, end=end)
                
                if df.empty:
                    return Response({'error':'No data found for the given ticker.'}, status=status.HTTP_404_NOT_FOUND)
                df = df.reset_index()
                
                # Create media directory if it doesn't exist
                media_root = settings.MEDIA_ROOT
                if isinstance(media_root, str):
                    media_root = media_root
                else:
                    media_root = str(media_root)
                
                os.makedirs(media_root, exist_ok=True)
                
                #Generate Basic Plots
                plt.switch_backend('AGG')  # Use non-interactive backend for plotting
                
                # Closing Price Plot
                plt.figure(figsize=(12,5))
                plt.plot(df.Close, label = 'Close Price')
                plt.title(f'Closing price of {ticker}')
                plt.xlabel('Date')
                plt.ylabel('Close Price')
                plt.legend()
                plot_img_path = f'{ticker}_plot.png'
                plot_img = save_plot(plot_img_path)
                print(f"Saved plot_img: {plot_img}")
                
                # 100-Day Moving Average Plot
                ma100 = df.Close.rolling(100).mean()
                plt.figure(figsize=(12,5))
                plt.plot(df.Close, label='Closing Price')
                plt.plot(ma100,'r',label='100 DMA')
                plt.title(f'Closing price of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Close Price')
                plt.legend()  
                plot_img_path = f'{ticker}_100_dma.png'
                plot_100_dma = save_plot(plot_img_path)
                print(f"Saved plot_100_dma: {plot_100_dma}")
                
                # 200-Day Moving Average Plot
                ma200 = df.Close.rolling(200).mean()
                plt.figure(figsize=(12,5))
                plt.plot(df.Close, label='Closing Price')
                plt.plot(ma100, 'r', label='100 DMA')
                plt.plot(ma200, 'g', label='200 DMA')
                plt.title(f'Closing price of {ticker}')
                plt.xlabel('Days')
                plt.ylabel('Close Price')
                plt.legend()
                plt.tight_layout()
                plot_img_path = f'{ticker}_200_dma.png'
                plot_200_dma = save_plot(plot_img_path)
                print(f"Saved plot_200_dma: {plot_200_dma}")
                
                #Splitting Data into Training and Testing datasets
                data_training = pd.DataFrame(df.Close[0:int(len(df)*0.70)])
                data_testing = pd.DataFrame(df.Close[int(len(df)*0.70): int(len(df))])    
                
                # Scaling down the data between 0  and 1
                scaler = MinMaxScaler(feature_range=(0,1))
                
                # Try to load ML model and make predictions
                final_pred = None
                mse = None
                rmse = None
                r2 = None
                
                try:
                    # Look for model in project root (one level up from backend-drf)
                    model_path = os.path.join(settings.BASE_DIR.parent, 'stock_prediction_model.keras')
                    print(f"Looking for model at: {model_path}")
                    if os.path.exists(model_path):
                        print(f"Model found at {model_path}")
                        model = load_model(model_path)
                        
                        #Preparing Test Data
                        past_100_days = data_training.tail(100)                
                        final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
                        input_data = scaler.fit_transform(final_df)
                        x_test = []
                        y_test = []
                        for i in range(100, input_data.shape[0]):
                            x_test.append(input_data[i-100:i])
                            y_test.append(input_data[i, 0])
                        x_test, y_test = np.array(x_test), np.array(y_test)
                        
                        #Making Predictions
                        y_predicted = model.predict(x_test)
                        
                        # Revert the scaled prices to Original Price
                        y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
                        y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()
                        
                        # Model Evaluation Metrics
                        mse = float(mean_squared_error(y_test, y_predicted))
                        rmse = float(np.sqrt(mse))
                        r2 = float(r2_score(y_test, y_predicted))
                        
                        print(f"MSE: {mse}, RMSE: {rmse}, R2: {r2}")
                        
                        #Plot the final Prediction
                        plt.figure(figsize=(12,5))
                        plt.plot(y_test, label='Original Price')
                        plt.plot(y_predicted, 'r', label='Predicted Price')
                        plt.title(f'Final Prediction for {ticker}')
                        plt.xlabel('Days')
                        plt.ylabel('Close Price')
                        plt.legend()
                        plt.tight_layout()
                        plot_img_path = f'{ticker}_final_pred.png'
                        final_pred = save_plot(plot_img_path)
                        print(f"Saved final_plot: {final_pred}")
                    else:
                        print(f"ML model not found at {model_path}, skipping prediction")
                except Exception as model_error:
                    print(f"Error loading ML model: {str(model_error)}")
                    import traceback
                    print(traceback.format_exc())
                
                response_data = {
                    'status': 'success',
                    'plot_image': plot_img,
                    'plot_100_dma': plot_100_dma,
                    'plot_200_dma': plot_200_dma,
                    'mse': mse,
                    'rmse': rmse,
                    'r2': r2,
                }
                if final_pred:
                    response_data['final_pred'] = final_pred
                
                return Response(response_data, status=status.HTTP_200_OK)
            except Exception as e:
                import traceback
                error_traceback = traceback.format_exc()
                return Response({'error': f'Error processing prediction: {str(e)}\n{error_traceback}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 