from sqlalchemy.orm import Session
from app.db.models import PolyLine
from app.db.schemas.poly_line import PolyLineBase


def get_polyLine(db: Session, bus_id: int):
    return db.query(PolyLine).filter(PolyLine.bus_id == bus_id).all()


def create_polyLine(db: Session, poly_list: list[PolyLineBase]):
    for i in poly_list:
        db.add(PolyLine(**i.dict()))
    db.commit()


def delete_polyLine(db: Session, bus_id: int):
    db.query(PolyLine).filter(PolyLine.bus_id == bus_id).delete()
    db.commit()
