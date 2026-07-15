from pydantic import BaseModel

class UploadedDocument(BaseModel):
    document_id: str
    filename: str
    upload_time: str