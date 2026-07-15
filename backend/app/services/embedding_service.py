from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embeddings(chunks):
    if not chunks:
        return []

    embeddings = model.encode(chunks, convert_to_numpy=True)

    return embeddings