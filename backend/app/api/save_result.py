from fastapi import APIRouter

from pydantic import BaseModel

from app.services.result_service import save_result

router = APIRouter()


class SaveRequest(BaseModel):

    mock_test_id: str

    evaluation: dict

    performance: dict

    recommendation: dict


@router.post("/save-result")

async def save(request: SaveRequest):

    save_result(

        request.mock_test_id,

        request.evaluation,

        request.performance,

        request.recommendation

    )

    return {

        "message": "Saved Successfully"

    }