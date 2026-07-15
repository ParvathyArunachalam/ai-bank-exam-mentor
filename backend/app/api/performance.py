from fastapi import APIRouter

from app.models.performance_models import PerformanceRequest
from app.services.performance_service import analyze_performance

router = APIRouter()


@router.post("/performance-analysis")
async def performance_analysis(request: PerformanceRequest):

    analysis = analyze_performance(
        request.score,
        request.total,
        request.percentage,
        [result.dict() for result in request.results]
    )

    return analysis