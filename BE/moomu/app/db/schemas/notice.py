from pydantic import BaseModel
from datetime import datetime


class NoticeBase(BaseModel):
    title: str
    content: str
    region_id: int
    user_id: int


class NoticeCreate(NoticeBase):
    pass


class NoticeUpdate(NoticeBase):
    pass


class NoticeDelete(BaseModel):
    pass


class Notice(NoticeBase):
    id: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True
