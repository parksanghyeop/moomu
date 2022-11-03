from pydantic import BaseModel


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


class ExpoToken(BaseModel):
    expo_token: str
