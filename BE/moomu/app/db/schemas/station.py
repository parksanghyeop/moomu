from datetime import time
from pydantic import BaseModel


class StationBase(BaseModel):
    bus_id: int
    name: str
    lat: str
    lng: str
    order: int
    arrived_time: time
    commute_or_leave: bool


class StationCreate(StationBase):
    pass


class StationPos(BaseModel):
    lat: str
    lng: str


class Station(StationBase):
    id: int

    class Config:
        orm_mode = True
