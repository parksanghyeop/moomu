from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import RegionCreate


def get_region(db: Session, region_id: int):
    return db.query(models.Region).filter(models.Region.id == region_id).first()


def get_region_by_name(db: Session, name: str):
    return db.query(models.Region).filter(models.Region.name == name).first()


def get_regions(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Region).offset(skip).limit(limit).all()


def create_region(db: Session, region: RegionCreate):
    db_region = models.Region(**region.dict())
    db.add(db_region)
    db.commit()
    db.refresh(db_region)
    return db_region


def delete_region(db: Session, region_id: int):
    db_region = db.query(models.Region).filter(models.Region.id == region_id).first()
    db.delete(db_region)
    db.commit()
    return db_region


def update_region(db: Session, region_id: int, region: RegionCreate):
    db_region = db.query(models.Region).filter(models.Region.id == region_id).first()
    db_region.name = region.name
    db.commit()
    db.refresh(db_region)
    return db_region
    
