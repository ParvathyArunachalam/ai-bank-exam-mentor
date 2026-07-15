from fastapi import APIRouter

from app.models.recommendation_models import RecommendationRequest
from app.services.recommendation_service import generate_recommendation

router = APIRouter()


@router.post("/study-recommendation")
async def study_recommendation(request: RecommendationRequest):

    result = generate_recommendation(
        request.filename,
        request.topic,
        request.score,
        request.total,
        request.percentage
    )

    return result