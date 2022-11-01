from pydantic import BaseModel
from datetime import datetime


class FaQBase(BaseModel):
    title: str
    content: str


class FaQCreate(FaQBase):
    region_id: int
    user_id: int


class FaQUpdate(FaQBase):
    pass


class FaQList(FaQBase):
    id: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True


class FaQ(BaseModel):
    faq: object
    answer: list[object]

    class Config:
        orm_mode = True
