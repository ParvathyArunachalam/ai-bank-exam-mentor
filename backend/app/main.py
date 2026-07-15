from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.home import router as home_router
from app.api.upload import router as upload_router
from app.api.test import router as test_router
from app.api.query import router as query_router
from app.api.documents import router as documents_router
from app.api.generate_test import router as test_generation_router
from app.api.submit_test import router as submit_router
from app.api.performance import router as performance_router
from app.api.recommendation import router as recommendation_router
from app.api.save_result import router as save_router
from app.api.history import router as history_router
from app.api.progress import router as progress_router
from app.api.dashboard import router as dashboard_router
from app.api.list_documents import router as list_documents_router
from app.api.mock_tests import router as mock_tests_router



app = FastAPI(title="AI Bank Exam Mentor API")

# ---------------- CORS ----------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------- Routers --------------

app.include_router(home_router)
app.include_router(upload_router)
app.include_router(test_router)
app.include_router(query_router)
app.include_router(documents_router)
app.include_router(test_generation_router)
app.include_router(submit_router)
app.include_router(performance_router)
app.include_router(recommendation_router)
app.include_router(save_router)
app.include_router(history_router)
app.include_router(progress_router)
app.include_router(dashboard_router)
app.include_router(list_documents_router)
app.include_router(mock_tests_router)