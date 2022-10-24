from sqlalchemy.orm import Session

from app.db import models
from app.db.schemas import UserCreate


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate):
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


def update_user(db: Session, user_id: int, user: UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_user.username = user.username
    db_user.nickname = user.nickname
    db_user.class_group = user.class_group
    db_user.region_id = user.region_id
    db.commit()
    db.refresh(db_user)
    return db_user
