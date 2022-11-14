from pydantic import BaseModel


class PolyLineBase(BaseModel):
    bus_id: int
    latitude: str
    longitude: str


class PolyLinePosBase(BaseModel):
    latitude: str
    longitude: str


class PolyLine(PolyLineBase):
    id: int

    class Config:
        orm_mode = True


class PolyLinePos(PolyLinePosBase):
    class Config:
        orm_mode = True
