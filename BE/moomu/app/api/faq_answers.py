from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import faq_answer_crud, faq_crud
from app.db.schemas import FaQAnswer, FaQAnswerCreate, FaQAnswerUpdate, FaQAnswerBase
from app.dependencies import get_db

from app.service.jwt_service import validate_token

router = APIRouter(
    prefix="/faq/answer",
    tags=["faq-answers"],
    responses={404: {"description": "Not found"}},
)


@router.post("", response_model=FaQAnswer)
def create_faq_answer(
    faq_answer: FaQAnswerBase,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )

    db_faq = faq_crud.get_faq(db, faq_id=faq_answer.faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")

    new_faq_answer = FaQAnswerCreate(
        **faq_answer.dict(),
        user_id=payload.get("id")
    )
    return faq_answer_crud.create_faq_answer(db=db, faq_answer=new_faq_answer)


@router.put("/edit/{faq_answer_id}", response_model=FaQAnswer)
def update_faq_answer(
    faq_answer_id: int,
    faq_answer: FaQAnswerUpdate,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )

    db_faq_answer = faq_answer_crud.get_faq_answer(
        db, faq_answer_id=faq_answer_id
    )
    if db_faq_answer is None:
        raise HTTPException(status_code=404, detail="건의사항을 찾을 수 없습니다.")
    return faq_answer_crud.update_faq_answer(
        db=db, faq_answer=faq_answer, faq_answer_id=faq_answer_id
    )


@router.delete("/delete/{faq_answer_id}", response_model=FaQAnswer)
def delete_faq_answer(
    faq_answer_id: int, 
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    db_faq_answer = faq_answer_crud.get_faq_answer(
        db, faq_answer_id=faq_answer_id
    )
    if db_faq_answer is None:
        raise HTTPException(status_code=404, detail="건의사항을 찾을 수 없습니다.")
    return faq_answer_crud.delete_faq_answer(
        db=db, faq_answer_id=faq_answer_id
    )
