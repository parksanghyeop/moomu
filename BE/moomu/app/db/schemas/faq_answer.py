from pydantic import BaseModel
from datetime import datetime


class FaQAnswerBase(BaseModel):
    faq_id: int
    content: str


class FaQAnswerCreate(FaQAnswerBase):
    pass


class FaQAnswerUpdate(FaQAnswerBase):
    pass


class FaQAnswerDelete(BaseModel):
    pass


class FaQAnswer(FaQAnswerBase):
    id: int
    created_date: datetime
    updated_date: datetime

    class Config:
        orm_mode = True
