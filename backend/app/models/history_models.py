from pydantic import BaseModel


class SaveResultRequest(BaseModel):

    student_id: str

    filename: str

    topic: str

    score: int

    total: int

    percentage: float