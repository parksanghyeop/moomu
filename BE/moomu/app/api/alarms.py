from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.crud import alarm_crud, page_crud
from app.db.schemas import AlarmCreate, Alarm, Page
from app.db import models
from app.dependencies import get_db


router = APIRouter(
    prefix="/alarms",
    tags=["alarms"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=Page)
def get_alarms(page: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return page_crud.page(db, models.Alarm, page, limit)


@router.get("/{alarm_id}", response_model=Alarm)
def get_alarm(alarm_id: int, db: Session = Depends(get_db)):
    db_alarm = alarm_crud.get_alarm(db, alarm_id=alarm_id)
    if db_alarm is None:
        raise HTTPException(status_code=404, detail="알람을 찾을 수 없습니다.")
    return db_alarm


@router.post("/register")
def create_alarm(alarm: AlarmCreate, db: Session = Depends(get_db)):
    alarm_crud.create_alarm(db=db, alarm=alarm)
    return {"message": "알람이 등록되었습니다."}
