from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import FaQAnswerCreate, FaQAnswerUpdate
from app.db.crud import alarm_crud


def get_faq_answer(db: Session, faq_answer_id: int):
    return (
        db.query(models.FaQAnswer).filter(models.FaQAnswer.id == faq_answer_id).first()
    )


def get_faq_answer_by_faq_id(db: Session, faq_id: int):
    return db.query(models.FaQAnswer).filter(models.FaQAnswer.faq_id == faq_id).all()


def get_faq_answers(db: Session, page: int, limit: int):
    return db.query(models.FaQAnswer).offset(page).limit(limit).all()


def create_faq_answer(db: Session, faq_answer: FaQAnswerCreate):
    db_faq_answer = models.FaQAnswer(**faq_answer.dict())
    db.add(db_faq_answer)
    db.commit()
    db.refresh(db_faq_answer)

    # 건의사항 작성자에게 알림 전송
    db_user = (
        db.query(models.User)
        .filter(models.User.id == db_faq_answer.faq.user_id)
        .first()
    )

    alarm_crud.create_alarm_from_event(
        db=db,
        model=models.FaQAnswer,
        target_id=db_faq_answer.faq_id,
        content=db_faq_answer.content,
        db_users=db_user,
    )

    return db_faq_answer


def update_faq_answer(db: Session, faq_answer_id: int, faq_answer: FaQAnswerUpdate):
    db_faq_answer = (
        db.query(models.FaQAnswer).filter(models.FaQAnswer.id == faq_answer_id).first()
    )
    db_faq_answer.content = faq_answer.content
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
