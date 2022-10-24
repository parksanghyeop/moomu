from pydantic import BaseModel


class RegionBase(BaseModel):
    name: str


class RegionCreate(RegionBase):
    pass


class Region(RegionBase):
    id: int

    class Config:
        orm_mode = True
