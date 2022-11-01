from datetime import datetime
from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    DateTime,
    Text,
    TIME,
    Enum,
)
from sqlalchemy.orm import relationship
from app.db.database import Base
from app.db.schemas.commute_or_leave import CommuteOrLeave


class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)

    users = relationship("User", back_populates="region")
    bus = relationship("Bus", back_populates="region")
    notices = relationship("Notice", back_populates="region")
    faqs = relationship("FaQ", back_populates="region")


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    nickname = Column(String(20), nullable=False)
    password = Column(String(100), nullable=False)
    class_group = Column(Integer, nullable=False, default=0)
    region_id = Column(Integer, ForeignKey("region.id"))
    start_station_id = Column(Integer, ForeignKey("station.id", ondelete="SET NULL"))
    end_station_id = Column(Integer, ForeignKey("station.id", ondelete="SET NULL"))
    expo_token = Column(String(255), nullable=True)
    user_role = Column(Integer, nullable=False, default=0)

    region = relationship("Region", back_populates="users")
    alarms = relationship("Alarm", back_populates="user")
    notices = relationship("Notice", back_populates="user")
    faqs = relationship("FaQ", back_populates="faq_user")
    faq_answers = relationship("FaQAnswer", back_populates="answer_user")

    start_station = relationship("Station", foreign_keys=[start_station_id])
    end_station = relationship("Station", foreign_keys=[end_station_id])


class Alarm(Base):
    __tablename__ = "alarm"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String(255), nullable=False)
    read = Column(Boolean, default=False)
    created_date = Column(DateTime, default=datetime.now)
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    alarm_type = Column(String(30), nullable=False)
    target_id = Column(Integer, nullable=False)

    user = relationship("User", back_populates="alarms")


class Bus(Base):
    __tablename__ = "bus"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    region_id = Column(Integer, ForeignKey("region.id"))
    commute_or_leave = Column(Enum(CommuteOrLeave))

    bus_stations = relationship("Station", back_populates="bus")
    region = relationship("Region", back_populates="bus")


class Station(Base):
    __tablename__ = "station"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    bus_id = Column(Integer, ForeignKey("bus.id", ondelete="CASCADE"))
    lat = Column(String(50), nullable=False)
    lng = Column(String(50), nullable=False)
    order = Column(Integer, nullable=False)
    arrived_time = Column(TIME, nullable=False)

    bus = relationship("Bus", back_populates="bus_stations")
    start_users = relationship(
        "User", foreign_keys="User.start_station_id", back_populates="start_station"
    )
    end_users = relationship(
        "User", foreign_keys="User.end_station_id", back_populates="end_station"
    )


class Notice(Base):
    __tablename__ = "notice"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    updated_date = Column(DateTime, default=datetime.now)
    region_id = Column(Integer, ForeignKey("region.id"))
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="notices")
    region = relationship("Region", back_populates="notices")


class FaQ(Base):
    __tablename__ = "faq"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    updated_date = Column(DateTime, default=datetime.now)
    region_id = Column(Integer, ForeignKey("region.id"))
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

    faq_user = relationship("User", back_populates="faqs")
    region = relationship("Region", back_populates="faqs")
    faq_answer = relationship("FaQAnswer", back_populates="faq", uselist=False)


class FaQAnswer(Base):
    __tablename__ = "faq_answer"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(Text, nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    updated_date = Column(DateTime, default=datetime.now)
    faq_id = Column(Integer, ForeignKey("faq.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))

    answer_user = relationship("User", back_populates="faq_answers")
    faq = relationship("FaQ", back_populates="faq_answer")
