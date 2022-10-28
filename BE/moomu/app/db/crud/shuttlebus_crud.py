from sqlalchemy.orm import Session, Load
from sqlalchemy import select
from app.db.models import Bus, Station
from app.db.schemas.bus import BusBase
from app.db.schemas.station import StationBase


# 버스
def get_bus(db: Session, bus_id: int):
    return (
        db.query(Bus).options(Load(Bus).lazyload("*")).filter(Bus.id == bus_id).first()
    )


def get_buses(db: Session, region_id: int):
    return (
        db.query(Bus)
        .options(Load(Bus).lazyload("*"))
        .filter(Bus.region_id == region_id)
        .all()
    )


def create_bus(db: Session, bus: BusBase):
    db_bus = Bus(**bus.dict())
    db.add(db_bus)
    db.commit()
    db.refresh(db_bus)
    return db_bus


def delete_bus(db: Session, bus_id: int):
    db.query(Bus).filter(Bus.id == bus_id).delete()
    db.commit()


def update_bus(db: Session, bus_id: int, name: str):
    db.query(Bus).filter(Bus.id == bus_id).update({"name": name})
    db.commit()


def exist_bus(db: Session, bus: BusBase):
    return (
        db.query(Bus)
        .filter(Bus.name == bus.name)
        .filter(Bus.region_id == bus.region_id)
        .first()
    )


# 정류장
def get_station(db: Session, station_id: int):
    return db.query(Station).filter(Station.id == station_id).first()


def get_stations(db: Session, bus_id: int):
    return (
        db.query(Station).filter(Station.bus_id == bus_id).order_by(Station.order).all()
    )


def create_station(db: Session, station_list: list[StationBase]):
    for i in station_list:
        db.add(Station(**i.dict()))
    db.commit()


def delete_station(db: Session, bus_id: int):
    db.query(Station).filter(Station.bus_id == bus_id).delete()
    db.commit()


def get_station_pos(db: Session, station_id: int):
    return db.execute(
        select(Station.lat, Station.lng).where(Station.id == station_id)
    ).first()
