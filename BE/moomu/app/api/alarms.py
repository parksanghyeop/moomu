from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.crud import alarm_crud, page_crud
from app.db.schemas import AlarmCreate, Alarm, Page
from app.db import models
from app.dependencies import get_db
from app.service.jwt_service import validate_token


router = APIRouter(
    prefix="/alarms",
    tags=["alarms"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=list[Alarm])
def get_alarms_by_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    print("hi")
    user_id = payload.get("id")
    db_alarms = alarm_crud.get_alarms_by_user(db, user_id=user_id)
    return db_alarms


@router.delete("")
def delete_alarms_by_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return alarm_crud.delete_alarms_by_user(db, user_id=user_id)


@router.put("")
def update_read_alarm_by_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return alarm_crud.update_read_alarm_by_user(db, user_id=user_id)
