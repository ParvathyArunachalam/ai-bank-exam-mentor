from fastapi import APIRouter
from pydantic import BaseModel

from app.services.test_service import get_topic_context
from app.services.ai_service import generate_mock_test
from app.services.mock_test_service import save_mock_test

router = APIRouter()


class TestRequest(BaseModel):

    document_id: str
    filename: str
    topic: str
    number_of_questions: int
    difficulty: str = "Medium"


@router.post("/generate-test")
async def generate_test(request: TestRequest):

    # ---------------------------------------
    # Get Context from ChromaDB
    # ---------------------------------------
    context = get_topic_context(
        request.topic,
        request.filename
    )

    # ---------------------------------------
    # Generate Questions using Gemini
    # ---------------------------------------
    questions = generate_mock_test(
        context,
        request.topic,
        request.number_of_questions
    )

    # ---------------------------------------
    # Save Mock Test into SQLite
    # ---------------------------------------
    mock_test_id = save_mock_test(
        document_id=request.document_id,
        title=f"{request.topic} Mock Test",
        difficulty=request.difficulty,
        question_count=request.number_of_questions,
        questions=questions
    )

    # ---------------------------------------
    # Return Response
    # ---------------------------------------
    return {

        "mock_test_id": mock_test_id,

        "document_id": request.document_id,

        "topic": request.topic,

        "difficulty": request.difficulty,

        "number_of_questions": request.number_of_questions,

        "questions": questions

    }