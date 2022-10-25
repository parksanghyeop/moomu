from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import shuttlebus_crud
from app.db.schemas.bus import Bus, BusBase
from app.db.schemas.station import Station
from app.dependencies import get_db

router = APIRouter(
    prefix="/shuttlebus",
    tags=["shuttlebus"],
    responses={404: {"description": "Not found"}},
)


@router.get("/bus", response_model=list[Bus])
def get_buses(region_id: int, db: Session = Depends(get_db)):
    db_buses = shuttlebus_crud.get_buses(db, region_id)
    return db_buses


@router.get("/bus/{bus_id}", response_model=Bus)
def get_bus(bus_id: int, db: Session = Depends(get_db)):
    db_bus = shuttlebus_crud.get_bus(db, bus_id=bus_id)
    if db_bus is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bus not found"
        )
    db_bus.stations = shuttlebus_crud.get_stations(db, bus_id=bus_id)
    return db_bus


@router.get("/station/{station_id}", response_model=Station)
def get_station(station_id: int, db: Session = Depends(get_db)):
    db_station = shuttlebus_crud.get_station(db, station_id=station_id)
    if db_station is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Station not found"
        )
    return db_station


@router.post("/bus/register")
def create_bus(bus: BusBase, db: Session = Depends(get_db)):
    if shuttlebus_crud.exist_bus(db, bus) is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="이미 등록된 버스 이름입니다."
        )
    shuttlebus_crud.create_bus(db, bus)
    return {"message": "버스 등록에 성공했습니다."}
