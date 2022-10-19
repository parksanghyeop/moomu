from fastapi import Header, HTTPException
from app.db.database import SessionLocal

async def get_token_header(x_token: str = Header(...)):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")
    return x_token

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
