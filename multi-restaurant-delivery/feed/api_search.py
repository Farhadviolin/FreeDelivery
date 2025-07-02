from fastapi import FastAPI, Query
from feed.search import search_feed

app = FastAPI()

@app.get('/feed/search')
def feed_search(q: str = Query(...)):
    return search_feed(q)
