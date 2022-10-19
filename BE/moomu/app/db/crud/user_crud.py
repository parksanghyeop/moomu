from sqlalchemy.orm import Session

from app.db import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        username=user.username, 
        name=user.name, 
        password=user.password, 
        grade=user.grade)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_region(db: Session, region_id: int):
    return db.query(models.Region).filter(models.Region.id == region_id).first()

def get_regions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Region).offset(skip).limit(limit).all()

def create_region(db: Session, region: schemas.RegionCreate):
    db_region = models.Region(name=region.name)
    db.add(db_region)
    db.commit()
    db.refresh(db_region)
    return db_region

