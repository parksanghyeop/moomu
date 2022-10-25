from datetime import datetime
from pydantic import BaseModel


class StationBase(BaseModel):
    bus_id: int
    name: str
    lat: str
    lng: str
    order: int
    arrived_time: datetime
    commute_or_leave: bool


class StationCreate(StationBase):
    pass


class Station(StationBase):
    id: int

    class Config:
        orm_mode = True
