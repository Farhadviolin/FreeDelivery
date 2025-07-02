from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from pymongo import MongoClient
import os

class ContentRequest(BaseModel):
    pageId: str
    currentTitle: str
    currentDescription: str

app = FastAPI()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
mongo = MongoClient(os.getenv("MONGO_URL"))
coll = mongo.get_database("content").suggestions

@app.post("/recommend")
async def recommend(req: ContentRequest):
    prompt = (
      f"Generate SEO-optimized meta title, description and keywords "
      f"for the page titled '{req.currentTitle}'.\n\n"
    )
    resp = await client.chat.completions.create(
      model="gpt-4o", messages=[{"role":"system","content":prompt}]
    )
    content = resp.choices[0].message.content
    suggestion = {"pageId": req.pageId, "suggestion": content}
    coll.insert_one(suggestion)
    return {"suggestion": content}
