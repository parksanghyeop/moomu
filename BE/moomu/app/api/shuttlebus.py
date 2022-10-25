from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import shuttlebus_crud
from app.db.schemas.bus import Bus
from app.dependencies import get_db

router = APIRouter(
    prefix="/shuttlebus",
    tags=["shuttlebus"],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=list[Bus])
def get_buses(region_id: int, db: Session = Depends(get_db)):
    db_buses = shuttlebus_crud.get_buses(db, region_id)
    return db_buses


@router.get("/{bus_id}", response_model=Bus)
def get_bus(bus_id: int, db: Session = Depends(get_db)):
    db_bus = shuttlebus_crud.get_bus(db, bus_id=bus_id)
    if db_bus is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Bus not found"
        )
    db_bus.stations = shuttlebus_crud.get_stations(db, bus_id=bus_id)
    return db_bus
