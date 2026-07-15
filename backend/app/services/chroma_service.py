from chromadb import PersistentClient

client = PersistentClient(path="chroma_db")

COLLECTION_NAME = "documents"


def get_collection():
    return client.get_or_create_collection(name=COLLECTION_NAME)


def add_documents(ids, documents, embeddings, metadatas=None):
    collection = get_collection()

    collection.add(
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
    collection = get_collection()

    return collection.get(
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