from pydantic import BaseModel
from datetime import datetime


class FaQBase(BaseModel):
    title: str
    region_id: int
    user_id: int


class FaQCreate(FaQBase):
    content: str


class FaQUpdate(FaQBase):
    content: str


class FaQDelete(BaseModel):
    pass


class FaQList(FaQBase):
    id: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True


class FaQ(BaseModel):
    faq: object
    answer: object

    class Config:
        orm_mode = True
