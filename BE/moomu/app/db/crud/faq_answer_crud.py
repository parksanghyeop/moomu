from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import FaQAnswerCreate, FaQAnswerUpdate


def get_faq_answer(db: Session, faq_answer_id: int):
    return (
        db.query(models.FaQAnswer).filter(models.FaQAnswer.id == faq_answer_id).first()
    )


def get_faq_answer_by_faq_id(db: Session, faq_id: int):
    return db.query(models.FaQAnswer).filter(models.FaQAnswer.faq_id == faq_id).first()


def get_faq_answers(db: Session, page: int, limit: int):
    return db.query(models.FaQAnswer).offset(page).limit(limit).all()


def create_faq_answer(db: Session, faq_answer: FaQAnswerCreate):
    db_faq_answer = models.FaQAnswer(**faq_answer.dict())
    db.add(db_faq_answer)
    db.commit()
    db.refresh(db_faq_answer)
    return db_faq_answer


def update_faq_answer(db: Session, faq_answer_id: int, faq_answer: FaQAnswerUpdate):
    db_faq_answer = (
        db.query(models.FaQAnswer).filter(models.FaQAnswer.id == faq_answer_id).first()
    )
    db_faq_answer.answer = faq_answer.answer
    db.commit()
    db.refresh(db_faq_answer)
    return db_faq_answer


def delete_faq_answer(db: Session, faq_answer_id: int):
    db_faq_answer = (
        db.query(models.FaQAnswer).filter(models.FaQAnswer.id == faq_answer_id).first()
    )
    db.delete(db_faq_answer)
    db.commit()
    return db_faq_answer
