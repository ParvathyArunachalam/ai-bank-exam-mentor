from pydantic import BaseModel
from typing import List


class QuestionResult(BaseModel):
    question: str
    correct: bool


class PerformanceRequest(BaseModel):
    score: int
    total: int
    percentage: float
    results: List[QuestionResult]