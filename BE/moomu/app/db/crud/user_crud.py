from sqlalchemy.orm import Session
from sqlalchemy import literal

from app.db import models
from app.db.schemas import UserCreate
import bcrypt

from app.db.schemas.user import UserUpdate
from app.db.schemas.commute_or_leave import CommuteOrLeave


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).filter(models.User.user_role == 0).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
    # 비밀번호 암호화
    hashed_pw = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    user.password = hashed_pw
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user


def update_user(db: Session, user_id: int, user: UserUpdate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_user.nickname = user.nickname
    db_user.class_group = user.class_group
    db_user.region_id = user.region_id
    db.commit()
    db.refresh(db_user)
    return db_user


def update_expo_token(db: Session, user_id: int, expo_token: str):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_user.expo_token = expo_token
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_expo_token(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_user.expo_token = None
    db.commit()
    db.refresh(db_user)
    return db_user


def get_exists_user_at_station(
    db: Session, station_id: int, commute_or_leave: CommuteOrLeave
):
    if commute_or_leave == CommuteOrLeave.COMMUTE:
        q = db.query(models.User).filter(models.User.start_station_id == station_id)
    else:
        q = db.query(models.User).filter(models.User.end_station_id == station_id)
    return db.query(literal(True)).filter(q.exists()).scalar()


def update_user_station(
    db: Session, user_id: int, station_id: int, commute_or_leave: CommuteOrLeave
):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if commute_or_leave == CommuteOrLeave.COMMUTE:
        db_user.start_station_id = station_id
    else:
        db_user.end_station_id = station_id
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user_station(db: Session, user_id: int, commute_or_leave: CommuteOrLeave):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if commute_or_leave == CommuteOrLeave.COMMUTE:
        db_user.start_station_id = None
    else:
        db_user.end_station_id = None
    db.commit()
    db.refresh(db_user)
    return db_user
