from pydantic import BaseModel
from typing import List


class GenerateTestRequest(BaseModel):
    filename: str
    topic: str
    number_of_questions: int


class Answer(BaseModel):
    question: str
    correct_answer: str
    student_answer: str


class SubmitTestRequest(BaseModel):
    answers: List[Answer]