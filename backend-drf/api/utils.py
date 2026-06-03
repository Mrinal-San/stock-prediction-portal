import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_plot(plot_img_path):
    media_root = settings.MEDIA_ROOT
    if not isinstance(media_root, str):
        media_root = str(media_root)
    
    # Create media directory if it doesn't exist
    os.makedirs(media_root, exist_ok=True)
    
    image_path = os.path.join(media_root, plot_img_path)
    plt.savefig(image_path)
    plt.close()
    image_url = settings.MEDIA_URL + plot_img_path  
    return image_url