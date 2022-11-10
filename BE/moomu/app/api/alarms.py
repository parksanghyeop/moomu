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
    user_id = payload.get("id")
    db_alarms = alarm_crud.get_alarms_by_user(db, user_id=user_id)
    return db_alarms


@router.delete("/delete/all")
def delete_alarms_by_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return alarm_crud.delete_alarms_by_user(db, user_id=user_id)


@router.delete("/delete/{alarm_id}")
def delete_alarm_by_id(
    alarm_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_id = payload.get("id")
    return alarm_crud.delete_alarm_by_id(db, alarm_id=alarm_id, user_id=user_id)


@router.put("/read/all")
def update_read_alarm_by_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return alarm_crud.update_read_alarms_all_by_user(db, user_id=user_id)


@router.put("/read/{alarm_id}")
def update_read_alarm_by_id(
    alarm_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_id = payload.get("id")
    return alarm_crud.update_read_alarm_by_id(db, alarm_id=alarm_id, user_id=user_id)


@router.get("/count-not-read")
def get_count_not_read_alarms(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return alarm_crud.get_count_not_read_alarms(db, user_id=user_id)
