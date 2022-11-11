from pydantic import BaseModel


class PolyLineBase(BaseModel):
    bus_id: int
    lat: str
    lng: str


class PolyLinePosBase(BaseModel):
    lat: str
    lng: str


class PolyLine(PolyLineBase):
    id: int

    class Config:
        orm_mode = True


class PolyLinePos(PolyLinePosBase):
    class Config:
        orm_mode = True
