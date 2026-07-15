from app.services.embedding_service import create_embeddings
from app.services.chroma_service import search_documents


def get_topic_context(topic, filename):

    # If topic is empty, use filename as retrieval query
    query = topic.strip()

    if query == "":
        query = filename

    embedding = create_embeddings([query])[0]

    results = search_documents(
        embedding,
        filename=filename,
        n_results=15
    )

    documents = results.get("documents", [])

    if not documents or len(documents[0]) == 0:
        return ""

    return "\n\n".join(documents[0])