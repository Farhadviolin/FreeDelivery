# rag_service.py
from fastapi import FastAPI
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Weaviate
from langchain.chains import RetrievalQA
app = FastAPI()
emb = OpenAIEmbeddings()
vect = Weaviate("http://weaviate:8080", "faiss-index", embedding_function=emb.embed_query)
qa = RetrievalQA.from_chain_type(llm=OpenAI(model="gpt-4-turbo"), retriever=vect.as_retriever())
@app.post("/chat")
def chat(question: str):
    answer = qa.run(question)
    log_conversation(question, answer)
    return {"answer": answer}
