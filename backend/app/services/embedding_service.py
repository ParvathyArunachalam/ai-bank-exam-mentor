import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


def create_embeddings(texts):
    embeddings = []

    for text in texts:
        response = genai.embed_content(
            model="models/text-embedding-004",
            content=text,
            task_type="retrieval_document"
        )

        embeddings.append(response["embedding"])

    return embeddings