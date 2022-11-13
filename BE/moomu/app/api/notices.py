# notice api

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import notice_crud, user_crud, region_crud, page_crud
from app.db.schemas import NoticeBase, NoticeCreate, NoticeUpdate, Notice, Page
from app.db import models
from app.dependencies import get_db

from app.service.jwt_service import validate_token

router = APIRouter(
    prefix="/notice",
    tags=["notice"],
    responses={404: {"description": "Not found"}},
)


def validate_user(db: Session, user_id: int):
    db_user = user_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")


def validate_region(db: Session, region_id: int):
    db_region = region_crud.get_region(db, region_id=region_id)
    if db_region is None:
        raise HTTPException(status_code=404, detail="지역을 찾을 수 없습니다.")


@router.get("", response_model=Page)
def get_notices(
    page: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    return page_crud.page(db, models.Notice, page, limit)


@router.get("/{notice_id}", response_model=Notice)
def get_notice(
    notice_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    db_notice = notice_crud.get_notice(db, notice_id=notice_id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")
    return db_notice


@router.post("")
def create_notice(
    notice: NoticeBase,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    if notice.title is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="제목을 입력해주세요.",
        )

    new_notice = NoticeCreate(
        **notice.dict(),
        user_id=payload.get("id"),
        region_id=payload.get("region")
    )

    notice_crud.create_notice(db=db, notice=new_notice)
    return {"message": "공지사항이 등록되었습니다."}


@router.put("/edit/{notice_id}")
def update_notice(
    notice_id: int,
    notice: NoticeUpdate,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )
    db_notice = notice_crud.get_notice(db, notice_id=notice_id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")

    notice_crud.notice_update(db, notice_id, notice)
    return {"message": "공지사항이 수정되었습니다."}


@router.delete("/delete/{notice_id}")
def delete_notice(
    notice_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="권한이 없습니다."
        )

    db_notice = notice_crud.get_notice(db, notice_id=notice_id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")

    notice_crud.delete_notice(db=db, notice_id=notice_id)
    return {"message": "공지사항이 삭제되었습니다."}