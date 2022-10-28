from pydantic import BaseModel

from app.db.schemas.station import Station


class BusBase(BaseModel):
    region_id: int
    name: str


class BusCreate(BusBase):
    pass


class Bus(BusBase):
    id: int
    stations: list[Station] = []

    class Config:
        orm_mode = True
