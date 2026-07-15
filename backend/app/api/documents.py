from fastapi import APIRouter
from app.services.chroma_service import list_documents, delete_file
import uuid

router = APIRouter()


@router.get("/documents")
async def get_documents():

    docs = list_documents()

    files = {}

    # Empty collection
    if docs.get("metadatas") is None:

        return {
            "total_files": 0,
            "files": []
        }

    for meta in docs["metadatas"]:

        if meta is None:
            continue

        filename = meta.get("filename", "Unknown")

        if filename not in files:

            files[filename] = {
                "document_id": str(uuid.uuid5(uuid.NAMESPACE_DNS, filename)),
                "filename": filename,
                "chunks": 0,
                "upload_status": "Uploaded"
            }

        files[filename]["chunks"] += 1

    return {
        "total_files": len(files),
        "files": list(files.values())
    }


@router.delete("/documents/{filename}")
async def remove_document(filename: str):

    deleted = delete_file(filename)

    return {
        "message": f"{filename} deleted successfully",
        "chunks_deleted": deleted
    }