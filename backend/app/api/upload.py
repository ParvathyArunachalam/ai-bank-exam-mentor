from fastapi import APIRouter, UploadFile, File
from app.services.pdf_service import extract_text
from app.services.chunk_service import create_chunks
from app.services.embedding_service import create_embeddings
from app.services.chroma_service import add_documents
import shutil
import os
import traceback

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/documents/upload")
async def upload_document(file: UploadFile = File(...)):
    try:
        print("STEP 1")

        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        print("STEP 2")

        text = extract_text(file_path)

        print("TEXT LENGTH =", len(text))

        chunks = create_chunks(text)

        print("CHUNKS =", len(chunks))

        embeddings = create_embeddings(chunks)

        print("EMBEDDINGS =", len(embeddings))

        # Unique IDs
        ids = [f"{file.filename}_{i}" for i in range(len(chunks))]

        # Metadata for each chunk
        metadatas = [
            {
                "filename": file.filename,
                "chunk": i
            }
            for i in range(len(chunks))
        ]

        # Store in ChromaDB
        add_documents(
            ids=ids,
            documents=chunks,
            embeddings=embeddings.tolist(),
            metadatas=metadatas
        )

        print("STEP 3")

        return {
            "message": "Uploaded Successfully"
        }

    except Exception as e:
        traceback.print_exc()
        return {
            "error": str(e)
        }