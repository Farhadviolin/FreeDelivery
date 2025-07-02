from fastapi import FastAPI
from pydantic import BaseModel
import boto3

class VRContent(BaseModel):
    restaurantId: str

app = FastAPI()
s3 = boto3.client('s3')

@app.get("/content/360/{restaurant_id}")
async def get_360_content(restaurant_id: str):
    # returns list of S3 URLs
    bucket = "delivery-vr-content"
    prefix = f"{restaurant_id}/360/"
    objs = s3.list_objects_v2(Bucket=bucket, Prefix=prefix).get('Contents', [])
    return [f"https://cdn.delivery.com/{obj['Key']}" for obj in objs]
