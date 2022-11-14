from pydantic import BaseModel

from app.db.schemas.station import Station
from app.db.schemas.commute_or_leave import CommuteOrLeave


class BusBase(BaseModel):
    region_id: int
    name: str
    commute_or_leave: CommuteOrLeave
    order: int


class BusCreate(BusBase):
    pass


class Bus(BusBase):
    id: int
    stations: list[Station] = []

    class Config:
        orm_mode = True
