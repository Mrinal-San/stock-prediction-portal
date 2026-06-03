import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import "../../assets/css/Dashboard.css";

const Dashboard = () => {
    const [ticker, setTicker] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [plot, setPlot] = useState();
    const [ma100, setMa100] = useState();
    const [ma200, setMa200] = useState();
    const [prediction, setPrediction] = useState();
    const [mse, setMSE] = useState();
    const [rmse, setRMSE] = useState();
    const [r2, setR2] = useState();

    useEffect(() => {
        const fetchProtectedData = async() => {
            try{
                const response = await axiosInstance.get('protected-view/');
                console.log('Success: ',response.data);
            }catch(error){
                console.error('Error fetching protected data:', error)
            }
        };
        fetchProtectedData();
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            console.log('Sending request to:', 'predict/');
            console.log('Ticker:', ticker);
            const response = await axiosInstance.post('predict/', {ticker : ticker});
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);
            
            if (response.data.error){
                setError(response.data.error);
                setLoading(false);
                return;
            }
            
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            
            const plotUrl = `${backendRoot}${response.data.plot_image}`
            const ma100Url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200Url = `${backendRoot}${response.data.plot_200_dma}`
            const finalPredUrl = response.data.final_pred ? `${backendRoot}${response.data.final_pred}` : null

            
            //Set the plot image URLs in state
            setPlot(plotUrl);
            setMa100(ma100Url);
            setMa200(ma200Url);
            setMSE(response.data.mse)
            setRMSE(response.data.rmse)
            setR2(response.data.r2)
            if (finalPredUrl) {
                setPrediction(finalPredUrl);
            }
            setLoading(false);
            
        }catch(error){
            console.error('Full error object:', error);
            console.error('Error config:', error.config);
            console.error('Error response:', error.response);
            setLoading(false);
            if (error.response && error.response.data) {
                console.error('Backend error data:', error.response.data);
                setError(JSON.stringify(error.response.data.error || error.response.data) || 'Error fetching prediction');
            } else if (error.message) {
                console.error('Error message:', error.message);
                setError(error.message);
            } else {
                setError('Error fetching prediction');
            }
        }
    };

  return (
    <div className="dashboard-container">
  <div className="container">
    <div className="dashboard-card">

      <span className="dashboard-badge">
        AI Stock Prediction
      </span>

      <h1 className="dashboard-title">
        Stock Forecast Dashboard
      </h1>

      <p className="dashboard-subtitle">
        Enter a stock ticker and generate an AI-powered forecast
        visualization based on historical market data.
      </p>

      <form className="prediction-form" onSubmit={handleSubmit}>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Enter Stock Ticker (e.g. AAPL)"
          className="stock-input"
          onChange={(e) => setTicker(e.target.value)}
          required
        />

        <button
          type="submit"
          className="predict-btn"
          disabled={loading}
        >
          {loading ? "Generating Prediction..." : "See Prediction"}
        </button>

      </form>

      {plot && (
        <div className="result-card">
          <div className="result-header">
            <h4>Closing Price</h4>
          </div>

          <img
            src={plot}
            alt="Stock Prediction"
            className="prediction-image"
          />
        </div>
      )}

      {ma100 && (
        <div className="result-card">
          <div className="result-header">
            <h4>100-Day Moving Average</h4>
          </div>

          <img
            src={ma100}
            alt="100 Day MA"
            className="prediction-image"
          />
        </div>
      )}

      {ma200 && (
        <div className="result-card">
          <div className="result-header">
            <h4>200-Day Moving Average</h4>
          </div>

          <img
            src={ma200}
            alt="200 Day MA"
            className="prediction-image"
          />
        </div>
      )}

      {prediction && (
        <div className="result-card">
          <div className="result-header">
            <h4>Final Prediction</h4>
          </div>

          <img
            src={prediction}
            alt="Final Prediction"
            className="prediction-image"
          />
        </div>
      )}

      <div className="metrics-card">
  <div className="metrics-header">
    <h4>Model Evaluation</h4>
    <span className="metrics-badge">Performance Metrics</span>
  </div>

  <div className="metrics-grid">
    <div className="metric-item">
      <span className="metric-label">MSE</span>
      <h3>{Number(mse).toFixed(4)}</h3>
      <small>Mean Squared Error</small>
    </div>

    <div className="metric-item">
      <span className="metric-label">RMSE</span>
      <h3>{Number(rmse).toFixed(4)}</h3>
      <small>Root Mean Squared Error</small>
    </div>

    <div className="metric-item">
    <span className="metric-label">R²</span>
    <h3>{Number(r2).toFixed(4)}</h3>
    <small>Coefficient of Determination</small>
    </div>
  </div>
</div>

    </div>
  </div>
</div>

  )
}

export default Dashboard;