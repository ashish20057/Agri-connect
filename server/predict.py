import sys
import json
import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import pickle
import os

# Add the classifier directory to sys.path to import PlantDiseaseModel
classifier_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Plant-Disease-Classifier-main'))
sys.path.append(classifier_path)

from plant_disease_classifier import PlantDiseaseModel

def predict(image_path):
    try:
        models_dir = os.path.join(classifier_path, 'models')
        config_path = os.path.join(models_dir, 'model_config.json')
        
        with open(config_path, 'r') as f:
            config = json.load(f)
            
        # Class names
        with open(os.path.join(classifier_path, config['class_names_path']), 'r') as f:
            class_names = json.load(f)
            
        # Transform
        with open(os.path.join(classifier_path, config['transform_path']), 'rb') as f:
            transform = pickle.load(f)
            
        # Label Encoder
        with open(os.path.join(classifier_path, config['label_encoder_path']), 'rb') as f:
            label_encoder = pickle.load(f)

        device = torch.device("cpu") # Use CPU for inference on server
        model = PlantDiseaseModel(num_classes=len(class_names))
        model.load_state_dict(torch.load(os.path.join(classifier_path, config['model_path']), map_location=device, weights_only=True))
        model.eval()

        image = Image.open(image_path).convert("RGB")
        image_tensor = transform(image).unsqueeze(0).to(device)

        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)[0]
            
        top_prob, top_idx = torch.topk(probabilities, 5)
        
        results = []
        for i in range(5):
            idx = top_idx[i].item()
            prob = top_prob[i].item()
            class_name = label_encoder.inverse_transform([idx])[0]
            results.append({
                "class": class_name,
                "confidence": prob * 100
            })
            
        return {"success": True, "predictions": results}
    except Exception as e:
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No image path provided"}))
    else:
        print(json.dumps(predict(sys.argv[1])))
