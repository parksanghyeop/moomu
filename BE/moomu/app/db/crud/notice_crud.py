from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import NoticeCreate, NoticeUpdate


def get_notice(db: Session, notice_id: int):
    return db.query(models.Notice).filter(models.Notice.id == notice_id).first()


def get_notices(db: Session, page: int, limit: int):
    return db.query(models.Notice).offset(page).limit(limit).all()


def get_notices_by_region(db: Session, region_id: int):
    return db.query(models.Notice).filter(models.Notice.region_id == region_id).all()


def create_notice(db: Session, notice: NoticeCreate):
    db_notice = models.Notice(**notice.dict())
    db.add(db_notice)
    db.commit()
    db.refresh(db_notice)
    return db_notice


def notice_update(db: Session, notice_id: int, notice: NoticeUpdate):
    db_notice = db.query(models.Notice).filter(models.Notice.id == notice_id).first()
    db_notice.title = notice.title
    db_notice.content = notice.content
    db_notice.region_id = notice.region_id
    db.commit()
    db.refresh(db_notice)
    return db_notice


def delete_notice(db: Session, notice_id: int):
    db_notice = db.query(models.Notice).filter(models.Notice.id == notice_id).first()
    db.delete(db_notice)
    db.commit()
    return db_notice
