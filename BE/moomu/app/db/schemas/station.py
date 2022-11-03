from datetime import time
from pydantic import BaseModel


class StationBase(BaseModel):
    bus_id: int
    name: str
    lat: str
    lng: str
    order: int
    arrived_time: time


class StationCreate(StationBase):
    pass


class StationPosBase(BaseModel):
    name: str
    lat: str
    lng: str


class Station(StationBase):
    id: int

    class Config:
        orm_mode = True


class StationPos(StationPosBase):
    id: int

    class Config:
        orm_mode = True
