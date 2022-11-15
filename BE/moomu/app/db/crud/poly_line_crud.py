from sqlalchemy.orm import Session
from app.db.models import PolyLine
from app.db.schemas.poly_line import PolyLinePosBase


def get_polyLine(db: Session, bus_id: int):
    return db.query(PolyLine).filter(PolyLine.bus_id == bus_id).all()


def create_polyLine(db: Session, poly_list: list[PolyLinePosBase], bus_id: int):
    db.add_all(
        [
            PolyLine(bus_id=bus_id, longitude=poly[0], latitude=poly[1])
            for poly in poly_list
        ]
    )
    db.commit()


def delete_polyLine(db: Session, bus_id: int):
    db.query(PolyLine).filter(PolyLine.bus_id == bus_id).delete()
    db.commit()
