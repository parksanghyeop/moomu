from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import FaQCreate, FaQUpdate


def get_faq(db: Session, faq_id: int):
    return db.query(models.FaQ).filter(models.FaQ.id == faq_id).first()


def get_faqs(db: Session, page: int, limit: int):
    return db.query(models.FaQ).offset(page).limit(limit).all()


def create_faq(db: Session, faq: FaQCreate):
    db_faq = models.FaQ(**faq.dict())
    db.add(db_faq)
    db.commit()
    db.refresh(db_faq)
    return db_faq


def update_faq(db: Session, faq_id: int, faq: FaQUpdate):
    db_faq = db.query(models.FaQ).filter(models.FaQ.id == faq_id).first()
    db_faq.question = faq.question
    db_faq.answer = faq.answer
    db.commit()
    db.refresh(db_faq)
    return db_faq


def delete_faq(db: Session, faq_id: int):
    db_faq = db.query(models.FaQ).filter(models.FaQ.id == faq_id).first()
    db.delete(db_faq)
    db.commit()
    return db_faq
