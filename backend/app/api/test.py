from fastapi import APIRouter
from app.services.chroma_service import list_documents

router = APIRouter()


@router.get("/test/documents")
def get_documents():
    return list_documents()