from fastapi import FastAPI
from neo4j import GraphDatabase
app = FastAPI()
driver = GraphDatabase.driver("bolt://neo4j:7687", auth=("neo4j","password"))
@app.get("/recommend/{user_id}")
def recommend(user_id: str, limit: int = 10):
    with driver.session() as session:
        query = """
          MATCH (u:User {id:$uid})-[:LIKES]->(d:Dish)<-[:CONTAINS]-(o:Order)
          RETURN o.restaurant AS restaurant, count(*) AS cnt
          ORDER BY cnt DESC LIMIT $lim
        """
        result = session.run(query, uid=user_id, lim=limit)
        return [{"restaurant": r["restaurant"], "score": r["cnt"]} for r in result]
