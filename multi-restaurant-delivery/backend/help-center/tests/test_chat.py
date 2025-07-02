import pytest
from rag_service import chat

def test_chat():
    response = chat("Wie funktioniert die Lieferung?")
    assert "answer" in response
