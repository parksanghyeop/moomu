from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import page_crud, faq_crud, faq_answer_crud
from app.db.schemas import Page, FaQ, FaQCreate, FaQUpdate, FaQBase, FaQList
from app.db import models
from app.dependencies import get_db

from app.service.jwt_service import validate_token

router = APIRouter(
    prefix="/faqs",
    tags=["faqs"],
    responses={404: {"description": "Not found"}},
)


@router.get("/user", response_model=list[FaQList])
def get_faqs(db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    user_id = payload.get("id")
    return faq_crud.get_faqs_by_userid(db, user_id)


@router.get("/admin", response_model=Page)
def get_faqs_admin(page: int = 0, limit: int = 10, db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    return page_crud.page(db, models.FaQ, page, limit)


@router.get("/{faq_id}", response_model=FaQ)
def get_faq(faq_id: int, db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")
    user_role = payload.get("role")
    if user_role < 5 and payload.get("id") != db_faq.user_id:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    db_answer = faq_answer_crud.get_faq_answer_by_faq_id(db, faq_id=faq_id)
    return {"faq": db_faq, "answer": db_answer}


@router.post("/write")
def create_faq(faq: FaQBase, db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    if faq.title is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="제목을 입력해주세요.",
        )
    new_faq = FaQCreate(**faq.dict(), user_id=payload.get("id"), region_id=payload.get("region"))
    faq_crud.create_faq(db=db, faq=new_faq)
    return {"message": "FAQ가 등록되었습니다."}


@router.put("/edit/{faq_id}")
def update_faq(faq_id: int, faq: FaQUpdate, db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")
    user_role = payload.get("role")
    if user_role < 5 and payload.get("id") != db_faq.user_id:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    faq_crud.update_faq(db=db, faq=faq, faq_id=faq_id)
    return {"message": "FAQ가 수정되었습니다."}


@router.delete("/delete/{faq_id}")
def delete_faq(faq_id: int, db: Session = Depends(get_db)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")

    faq_crud.delete_faq(db=db, faq_id=faq_id)
    return {"message": "FAQ가 삭제되었습니다."}
