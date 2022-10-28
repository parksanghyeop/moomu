from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.crud import faq_answer_crud
from app.db.schemas import FaQAnswer, FaQAnswerCreate, FaQAnswerUpdate
from app.dependencies import get_db

router = APIRouter(
    prefix="/faq-answers",
    tags=["faq-answers"],
    responses={404: {"description": "Not found"}},
)


@router.get("/{faq_answer_id}", response_model=FaQAnswer)
def read_faq_answer(faq_answer_id: int, db: Session = Depends(get_db)):
    db_faq_answer = faq_answer_crud.faq_answer.get_faq_answer(
        db, faq_answer_id=faq_answer_id
    )
    if db_faq_answer is None:
        raise HTTPException(status_code=404, detail="건의사항을 찾을 수 없습니다.")
    return db_faq_answer


@router.post("/register", response_model=FaQAnswer)
def create_faq_answer(faq_answer: FaQAnswerCreate, db: Session = Depends(get_db)):
    return faq_answer_crud.create_faq_answer(db=db, faq_answer=faq_answer)


@router.put("/update/{faq_answer_id}", response_model=FaQAnswer)
def update_faq_answer(
    faq_answer_id: int,
    faq_answer: FaQAnswerUpdate,
    db: Session = Depends(get_db),
):
    db_faq_answer = faq_answer_crud.faq_answer.get_faq_answer(
        db, faq_answer_id=faq_answer_id
    )
    if db_faq_answer is None:
        raise HTTPException(status_code=404, detail="건의사항을 찾을 수 없습니다.")
    return faq_answer_crud.faq_answer.update_faq_answer(
        db=db, faq_answer=faq_answer, faq_answer_id=faq_answer_id
    )


@router.delete("/delete/{faq_answer_id}", response_model=FaQAnswer)
def delete_faq_answer(faq_answer_id: int, db: Session = Depends(get_db)):
    db_faq_answer = faq_answer_crud.faq_answer.get_faq_answer(
        db, faq_answer_id=faq_answer_id
    )
    if db_faq_answer is None:
        raise HTTPException(status_code=404, detail="건의사항을 찾을 수 없습니다.")
    return faq_answer_crud.faq_answer.delete_faq_answer(
        db=db, faq_answer_id=faq_answer_id
    )
