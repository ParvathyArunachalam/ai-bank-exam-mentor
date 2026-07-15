from fastapi import APIRouter
from pydantic import BaseModel

from app.services.embedding_service import create_embeddings
from app.services.chroma_service import search_documents
from app.services.ai_service import generate_answer

router = APIRouter()


class QueryRequest(BaseModel):
    question: str
    filename: str | None = None


@router.post("/query")
async def query(request: QueryRequest):

    query_embedding = create_embeddings([request.question])[0]

    results = search_documents(
        query_embedding,
        filename=request.filename
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = "\n\n".join(documents)

    answer = generate_answer(request.question, context)

    sources = []

    seen = set()

    for meta in metadatas:
        if meta["filename"] not in seen:
            seen.add(meta["filename"])
            sources.append(meta["filename"])

    return {
        "question": request.question,
        "answer": answer,
        "sources": sources
    }