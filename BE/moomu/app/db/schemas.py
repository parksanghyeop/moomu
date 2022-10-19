from locale import strcoll
from pydantic import BaseModel

class RegionBase(BaseModel):
    name: str


class RegionCreate(RegionBase):
    pass

class Region(RegionBase):
    id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str
    name: str
    grade: int
    region_id: int

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    regions: list[Region] = []

    class Config:
        orm_mode = True
