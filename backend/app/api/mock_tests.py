from fastapi import APIRouter, HTTPException

from app.services.mock_test_service import (
    get_mock_tests,
    get_mock_test,
    delete_mock_test
)

router = APIRouter()


# ==========================================
# Get All Mock Tests
# ==========================================
@router.get("/mock-tests")
async def list_mock_tests():

    tests = get_mock_tests()

    return {
        "total_tests": len(tests),
        "tests": tests
    }


# ==========================================
# Get One Mock Test
# ==========================================
@router.get("/mock-tests/{mock_test_id}")
async def view_mock_test(mock_test_id: str):

    test = get_mock_test(mock_test_id)

    if test is None:
        raise HTTPException(
            status_code=404,
            detail="Mock Test Not Found"
        )

    return test


# ==========================================
# Delete Mock Test
# ==========================================
@router.delete("/mock-tests/{mock_test_id}")
async def remove_mock_test(mock_test_id: str):

    deleted = delete_mock_test(mock_test_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Mock Test Not Found"
        )

    return {
        "message": "Mock Test Deleted Successfully"
    }