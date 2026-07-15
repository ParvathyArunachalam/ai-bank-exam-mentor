from fastapi import APIRouter

from app.services.history_service import get_progress

router = APIRouter()


@router.get("/progress/{student_id}")

async def progress(student_id: str):

    return get_progress(student_id)