from fastapi import APIRouter

from app.models.test_models import SubmitTestRequest
from app.services.evaluation_service import evaluate_test

router = APIRouter()


@router.post("/submit-test")
async def submit_test(request: SubmitTestRequest):

    result = evaluate_test(
        [answer.dict() for answer in request.answers]
    )

    return result