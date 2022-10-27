from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import page_crud, faq_crud, faq_answer_crud
from app.db.schemas import Page, FaQ, FaQCreate, FaQUpdate
from app.db import models
from app.dependencies import get_db

router = APIRouter(
    prefix="/faqs",
    tags=["faqs"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=Page)
def get_faqs(page: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return page_crud.page(db, models.FaQ, page, limit)


@router.get("/{faq_id}", response_model=FaQ)
def get_faq(faq_id: int, db: Session = Depends(get_db)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")

    db_answer = faq_answer_crud.get_faq_answer_by_faq_id(db, faq_id=faq_id)
    print(db_answer)
    return {"faq": db_faq, "answer": db_answer}


@router.post("/register")
def create_faq(faq: FaQCreate, db: Session = Depends(get_db)):
    if faq.title is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="제목을 입력해주세요.",
        )

    faq_crud.create_faq(db=db, faq=faq)
    return {"message": "FAQ가 등록되었습니다."}


@router.put("/update/{faq_id}")
def update_faq(faq_id: int, faq: FaQUpdate, db: Session = Depends(get_db)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")

    faq_crud.update_faq(db=db, faq=faq, faq_id=faq_id)
    return {"message": "FAQ가 수정되었습니다."}


@router.delete("/delete/{faq_id}")
def delete_faq(faq_id: int, db: Session = Depends(get_db)):
    db_faq = faq_crud.get_faq(db, faq_id=faq_id)
    if db_faq is None:
        raise HTTPException(status_code=404, detail="FAQ를 찾을 수 없습니다.")

    faq_crud.delete_faq(db=db, faq_id=faq_id)
    return {"message": "FAQ가 삭제되었습니다."}
