from sqlalchemy.orm import Session, Load

from app.db.models import Bus, Station
from app.db.schemas.bus import BusBase
from app.db.schemas.station import StationBase


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
    db_bus = get_bus(bus_id)
    db.delete(db_bus)
    db.commit()


def update_bus(db: Session, bus_id: int, bus: BusBase):
    db.query(Bus).filter(Bus.id == bus_id).update(**bus.dict())
    db.commit()


def get_station(db: Session, station_id: int):
    return db.query(Station).filter(Station.id == station_id).first()


def get_stations(db: Session, bus_id: int):
    return (
        db.query(Station).filter(Station.bus_id == bus_id).order_by(Station.order).all()
    )


def create_station(db: Session, station: StationBase):
    db_station = Station(**station.dict())
    db.add(db_station)
    db.commit()
    db.refresh(db_station)
    return db_station


def delete_station(db: Session, bus_id: int):
    db.query(Station).filter(Station.bus_id == bus_id).delete()
    db.commit()


def exist_bus(db: Session, bus: BusBase):
    return (
        db.query(Bus)
        .filter(Bus.name == bus.name).filter(Bus.region_id == bus.region_id)
        .first()
    )
