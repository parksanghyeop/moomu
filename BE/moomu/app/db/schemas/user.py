from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    nickname: str
    class_group: int
    region_id: int


class UserCreate(UserBase):
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
