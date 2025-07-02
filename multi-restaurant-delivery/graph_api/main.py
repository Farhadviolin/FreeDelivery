from fastapi import FastAPI
from py2neo import Graph
from pydantic import BaseModel

app = FastAPI()
graph = Graph("bolt://neo4j:7687", auth=("neo4j","secret"))

class QueryRequest(BaseModel):
    cypher: str
    params: dict = {}

@app.post("/query")
async def run_cypher(q: QueryRequest):
    result = graph.run(q.cypher, **q.params)
    return [dict(record) for record in result]

@app.get("/recommend/{user_id}")
async def recommend(user_id: str):
    # Beispiel: Greedy PageRank basierte Empfehlungsabfrage
    cypher = """
    MATCH (u:User {id:$uid})-[:ORDERED]->()<-[:ORDERED]-(other:User),
          (other)-[:ORDERED]->(rec:MenuItem)
    RETURN rec.id AS item, count(*) AS score
    ORDER BY score DESC LIMIT 10
    """
    return graph.run(cypher, uid=user_id).data()
