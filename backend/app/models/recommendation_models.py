from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    filename: str
    topic: str
    score: int
    total: int
    percentage: float