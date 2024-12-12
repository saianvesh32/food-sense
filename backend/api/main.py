from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "models", "1", "model.keras"))

if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file not found at {model_path}")

MODEL = tf.keras.models.load_model(model_path)

CLASS_NAMES = ["Potato___Early_blight", "Potato___Late_blight", "Potato___healthy"]

@app.get("/")
async def api_status():
    return {"message": "api is running"}

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data))
    image = image.resize((256, 256))
    image = np.array(image)
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    
    img_batch = np.expand_dims(image, 0)
    
    predictions = MODEL.predict(img_batch)
    
    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = float(np.max(predictions[0]))
    
    return {
        "class": predicted_class,
        "confidence": confidence
    }

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
