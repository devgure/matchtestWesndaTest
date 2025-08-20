# ai-service/main.py
from fastapi import FastAPI
from pydantic import BaseModel
import face_recognition
import numpy as np
import json

app = FastAPI()

class PhotoRequest(BaseModel):
    photo_url: str

@app.post("/verify-face")
async def verify_face(request: PhotoRequest):
    # Download image, detect face
    # Return: { "has_face": true, "is_selfie": true, "confidence": 0.9 }
    return {"has_face": True, "is_selfie": True, "confidence": 0.9}