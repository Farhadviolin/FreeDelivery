from elasticsearch import Elasticsearch

es = Elasticsearch('http://elasticsearch:9200')

def search_feed(query: str):
    resp = es.search(index='feed-posts', body={
        'query': {
            'multi_match': {
                'query': query,
                'fields': ['type', 'content.*']
            }
        }
    })
    return [hit['_source'] for hit in resp['hits']['hits']]
