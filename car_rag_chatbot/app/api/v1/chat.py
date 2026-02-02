from fastapi import APIRouter
from app.models.chat_scema import ChatRequest, ChatResponse

from app.database.vector import retrieve_cars_for_query
from app.core.llm import generate_response

router = APIRouter() 

@router.post("/chat", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    retrieved = retrieve_cars_for_query(request.query)
    answer = generate_response(request.query, retrieved)
    return {"answer": answer}
