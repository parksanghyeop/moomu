from pydantic import BaseModel


class RegionBase(BaseModel):
    name: str


class RegionCreate(RegionBase):
    pass


class RegionUpdate(RegionBase):
    id: int


class RegionDelete(BaseModel):
    id: int


class Region(RegionBase):
    id: int

    class Config:
        orm_mode = True
