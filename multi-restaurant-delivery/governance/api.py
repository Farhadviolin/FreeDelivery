from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlalchemy, json

engine = sqlalchemy.create_engine("postgresql://...")
app = FastAPI()

class ModelCard(BaseModel):
    model_name: str
    version: str
    author: str
    description: str
    data_sources: dict
    fairness_metrics: dict
    performance_metrics: dict

@app.post("/model-card")
def create_card(card: ModelCard):
    with engine.begin() as conn:
        conn.execute(
          "INSERT INTO model_cards(model_name,version,author,description,data_sources,fairness_metrics,performance_metrics) "
          "VALUES(:model_name,:version,:author,:description,:data_sources::jsonb,:fairness_metrics::jsonb,:performance_metrics::jsonb)",
          card.dict()
        )
    return {"status":"ok"}
