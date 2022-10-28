from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.db import models


def get_total_items(db: Session, model: models.Base, limit: int):
    return db.query(model).count()


def get_total_pages(db: Session, model: models.Base, limit: int):
    if get_total_items(db, model, limit) % limit == 0:
        return get_total_items(db, model, limit) // limit
    return db.query(model).count() // limit + 1


def page(db: Session, model: models.Base, page: int, limit: int):

    items = (
        db.query(model)
        .order_by(model.id.desc())
        .offset(page * limit)
        .limit(limit)
        .all()
    )
    total_pages = get_total_pages(db, model, limit)
    total_items = get_total_items(db, model, limit)

    if page > total_pages:
        raise HTTPException(status_code=404, detail="페이지가 존재하지 않습니다.")

    response = {
        "items": items,
        "total_items": total_items,
        "total_pages": total_pages,
        "current_page": page,
        "limit": limit,
    }

    return response
