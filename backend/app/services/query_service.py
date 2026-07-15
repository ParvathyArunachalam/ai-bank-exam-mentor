from app.services.embedding_service import create_embeddings
from app.services.chroma_service import search_documents


def query_documents(question: str):
    """
    Convert question to embedding and search ChromaDB.
    """

    query_embedding = create_embeddings([question])[0]

    results = search_documents(query_embedding)

    return results