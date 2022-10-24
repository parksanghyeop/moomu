from pydantic import BaseModel

from app.db.schemas.region import Region


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
