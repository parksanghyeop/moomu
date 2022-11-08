from pydantic import BaseModel
from datetime import datetime


class AlarmBase(BaseModel):
    content: str
    read: bool
    user_id: int
    alarm_type: str
    created_date: datetime | None = None
    target_id: int


class AlarmCreate(AlarmBase):
    pass


class AlarmUpdate(AlarmBase):
    pass


class AlarmDelete(BaseModel):
    pass


class Alarm(AlarmBase):
    id: int

    class Config:
        orm_mode = True
