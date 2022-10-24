from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import users
from app.db import database, models


def get_application():
    _app = FastAPI(title=settings.PROJECT_NAME)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return _app


models.Base.metadata.create_all(bind=database.engine)

app = get_application()

# 사용자 관련 API
app.include_router(users.router)


# 루트 경로로 접속하면 Swagger 문서로 리다이렉트
@app.get("/")
def root():
    return RedirectResponse("/docs")


# 테스트용 헬로월드
@app.get("/helloworld")
def helloworld():
    return {"hello": "world"}
