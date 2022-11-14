from pydantic import BaseModel, typing
from typing import Optional
from app.db.schemas.station import Station


class UserBase(BaseModel):
    nickname: str
    class_group: int
    region_id: int


class UserCreate(UserBase):
    username: str
    password: str


class UserUpdate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    username: str
    password: str


class StationBase(BaseModel):
    start_station_id: typing.Any
    end_station_id: typing.Any


class UserStation(StationBase):
    id: int

    class Config:
        orm_mode = True


class ExpoToken(BaseModel):
    expo_token: str


class UserBus(BaseModel):
    user_id: int
    bus_name: str
    commute_or_leave: str
    station_name: str


class UserStationBase(BaseModel):
    nickname: str
    class_group: int
    region_id: int


class UserStationFull(UserStationBase):
    id: int
    start_station: Optional[Station] = None
    end_station: Optional[Station] = None

    class Config:
        orm_mode = True
