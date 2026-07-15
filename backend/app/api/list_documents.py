from fastapi import APIRouter
from app.database.document_store import documents

router = APIRouter()

@router.get("/documents")
def list_documents():

    return documents