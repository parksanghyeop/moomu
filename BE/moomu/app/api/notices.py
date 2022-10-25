# notice api

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import notice_crud, user_crud, region_crud
from app.db.schemas import NoticeCreate, NoticeUpdate, Notice, NoticeDelete
from app.dependencies import get_db

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


@router.get("", response_model=list[Notice])
def get_notices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    notices = notice_crud.get_notices(db, skip=skip, limit=limit)
    return notices


@router.get("/{notice_id}", response_model=Notice)
def get_notice(notice_id: int, db: Session = Depends(get_db)):
    db_notice = notice_crud.get_notice(db, notice_id=notice_id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")
    return db_notice


@router.post("/register")
def create_notice(notice: NoticeCreate, db: Session = Depends(get_db)):
    if notice.title is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="제목을 입력해주세요.",
        )

    validate_user(db, notice.user_id)
    validate_region(db, notice.region_id)

    notice_crud.create_notice(db=db, notice=notice)
    return {"message": "공지사항이 등록되었습니다."}


@router.put("/edit")
def update_notice(notice: NoticeUpdate, db: Session = Depends(get_db)):
    db_notice = notice_crud.get_notice(db, notice_id=notice.id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")

    validate_user(db, notice.user_id)
    validate_region(db, notice.region_id)

    notice_crud.update_notice(db=db, notice=notice)
    return {"message": "공지사항이 수정되었습니다."}


@router.delete("/delete")
def delete_notice(notice: NoticeDelete, db: Session = Depends(get_db)):
    db_notice = notice_crud.get_notice(db, notice_id=notice.id)
    if db_notice is None:
        raise HTTPException(status_code=404, detail="공지사항을 찾을 수 없습니다.")
    validate_user(db, notice.user_id)
    db.delete(db_notice)
    db.commit()
    return {"message": "공지사항이 삭제되었습니다."}
