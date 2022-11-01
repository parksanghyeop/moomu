from app.db.schemas.user import User, UserCreate, UserLogin
from app.db.schemas.region import Region, RegionCreate, RegionUpdate, RegionDelete
from app.db.schemas.notice import Notice, NoticeCreate, NoticeUpdate, NoticeDelete
from app.db.schemas.page import Page
from app.db.schemas.faq import FaQ, FaQCreate, FaQUpdate, FaQList
from app.db.schemas.faq_answer import (
    FaQAnswer,
    FaQAnswerCreate,
    FaQAnswerUpdate,
    FaQAnswerDelete,
)
from app.db.schemas.alarm import Alarm, AlarmCreate, AlarmUpdate, AlarmDelete
