import chromadb

_client = None
_collection = None

COLLECTION_NAME = "documents"


def get_collection():
    global _client, _collection

    if _collection is None:
        _client = chromadb.PersistentClient(path="chroma_db")
        _collection = _client.get_or_create_collection(
            name=COLLECTION_NAME
        )

    return _collection


def add_documents(ids, documents, embeddings, metadatas=None):
    get_collection().add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )


def search_documents(query_embedding, n_results=10, filename=None):

    collection = get_collection()

    if filename:
        return collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            where={"filename": filename}
        )

    return collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )


def list_documents():

    return get_collection().get(
        include=["metadatas"]
    )


def delete_file(filename):

    collection = get_collection()

    results = collection.get(
        where={"filename": filename}
    )

    if results["ids"]:
        collection.delete(ids=results["ids"])

    return len(results["ids"])