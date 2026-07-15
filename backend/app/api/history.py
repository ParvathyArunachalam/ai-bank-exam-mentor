from fastapi import APIRouter

from app.services.history_service import get_history

router = APIRouter()


@router.get("/history/{student_id}")

async def history(student_id: str):

    return get_history(student_id)