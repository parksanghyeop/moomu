from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy.orm import Session
from app.db.crud import shuttlebus_crud, poly_line_crud
from app.db.schemas.bus import Bus, BusBase
from app.db.schemas.station import Station, StationBase, StationPos
from app.db.schemas.poly_line import PolyLineBase, PolyLinePos
from app.dependencies import get_db
from app.service.shuttlebus_service import bus_near_station
from app.db.schemas.commute_or_leave import CommuteOrLeave
from app.service.jwt_service import validate_token

router = APIRouter(
    prefix="/shuttlebus",
    tags=["shuttlebus"],
    responses={404: {"description": "Not found"}},
)


@router.get("/bus", response_model=list[Bus])
def get_buses(
    region_id: int, commute_or_leave: CommuteOrLeave, db: Session = Depends(get_db)
):
    db_buses = shuttlebus_crud.get_buses(db, region_id, commute_or_leave)
    return db_buses


@router.get("/bus/{bus_id}", response_model=Bus)
def get_bus(bus_id: int, db: Session = Depends(get_db)):
    db_bus = shuttlebus_crud.get_bus(db, bus_id=bus_id)
    if db_bus is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="해당 버스 정보를 찾을 수 없습니다."
        )
    db_bus.stations = shuttlebus_crud.get_stations(db, bus_id=bus_id)
    db_bus.cur = bus_near_station(db_bus.name, db_bus.stations)
    return db_bus


@router.get("/bus/name/{bus_name}", response_model=list[StationPos])
def get_stations_by_bus_name(
    bus_name: str, commute_or_leave: CommuteOrLeave, db: Session = Depends(get_db)
):
    return shuttlebus_crud.get_stations_by_bus_name(db, bus_name, commute_or_leave)


@router.post("/bus/register")
def create_bus(
    bus: BusBase, db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    if shuttlebus_crud.exist_bus(db, bus) is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="이미 등록된 버스 이름입니다."
        )
    shuttlebus_crud.create_bus(db, bus)
    return {"message": "버스 등록에 성공했습니다."}


@router.put("/bus/edit/{bus_id}")
def update_bus(
    bus_id: int,
    name: str,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    shuttlebus_crud.update_bus(db, bus_id, name)
    return {"message": "버스 정보 수정에 성공했습니다."}


@router.delete("/bus/delete/{bus_id}")
def delete_bus(
    bus_id: int, db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    shuttlebus_crud.delete_bus(db, bus_id)
    return {"message": "버스 정보 삭제에 성공했습니다."}


@router.get("/station/{station_id}", response_model=Station)
def get_station(station_id: int, db: Session = Depends(get_db)):
    db_station = shuttlebus_crud.get_station(db, station_id=station_id)
    if db_station is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Station not found"
        )
    return db_station


@router.post("/station/register")
def create_station(
    station_list: list[StationBase],
    poly_list: list[PolyLineBase],
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    shuttlebus_crud.create_station(db, station_list)
    poly_line_crud.create_polyLine(db, poly_list)
    return {"message": "정류장 등록에 성공했습니다."}


@router.put("/station/edit/{bus_id}")
def update_station(
    bus_id: int,
    station_list: list[StationBase],
    poly_list: list[PolyLineBase],
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    shuttlebus_crud.delete_station(db, bus_id)
    poly_line_crud.delete_polyLine(db, bus_id)
    shuttlebus_crud.create_station(db, station_list)
    poly_line_crud.create_polyLine(db, poly_list)
    return {"message": "정류장 정보 수정/삭제에 성공했습니다."}


@router.post("/station/alarm")
def create_station_alarm(
    station_id: int,
    station_name: str,
    commute_or_leave: CommuteOrLeave,
    db: Session = Depends(get_db),
):
    return shuttlebus_crud.create_station_alarm(
        db, commute_or_leave, station_id, station_name
    )
