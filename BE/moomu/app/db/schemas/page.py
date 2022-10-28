from pydantic import BaseModel


class Page(BaseModel):
    items: list
    total_pages: int
    total_items: int
    current_page: int
    limit: int

    class Config:
        orm_mode = True
