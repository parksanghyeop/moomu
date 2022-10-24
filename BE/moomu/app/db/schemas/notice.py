from pydantic import BaseModel


class NoticeBase(BaseModel):
    title: str
    content: str


class NoticeCreate(NoticeBase):
    pass


class NoticeUpdate(NoticeBase):
    pass


class Notice(NoticeBase):
    id: int
    title: str
    content: str
    created_date: str
    updated_date: str
    region_id: int
    user_id: int

    class Config:
        orm_mode = True
