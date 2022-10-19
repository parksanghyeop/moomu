from datetime import datetime
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class Region(Base):
    __tablename__ = "region"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(50), unique=True, index=True)

    users = relationship("User", back_populates="region")
    bus = relationship("Bus", back_populates="region")
    notices = relationship("Notice", back_populates="region")
    faqs = relationship("Faq", back_populates="region")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(20), nullable=False)
    password = Column(String(50), nullable=False)
    grade = Column(Integer, nullable=False, default=0)

    region_id = Column(Integer, ForeignKey("region.id"))
    start_statoin_id = Column(Integer, ForeignKey("station.id"))
    end_station_id = Column(Integer, ForeignKey("station.id"))

    region = relationship("Region", back_populates="user")
    alarms = relationship("Alarm", back_populates="user")
    notices = relationship("Notice", back_populates="user")
    faqs = relationship("Faq", back_populates="user")
    start_station = relationship("Station", back_populates="start_user")
    end_station = relationship("Station", back_populates="end_user")


class Alarm(Base):
    __tablename__ = "alarm"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String(255), unique=True, index=True, nullable=False)
    read = Column(Boolean, default=False)
    created_date = Column(DateTime, default=datetime.now)
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="alarms")


class Bus(Base):
    __tablename__ = "bus"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    station_id = Column(Integer, ForeignKey("station.id"))
    region_id = Column(Integer, ForeignKey("region.id"))

    stations = relationship("Station", back_populates="bus")
    region = relationship("Region", back_populates="bus")


class Station(Base):
    __tablename__ = "station"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(50), unique=True, index=True, nullable=False)
    bus_id = Column(Integer, ForeignKey("bus.id"))

    bus = relationship("Bus", back_populates="stations")
    start_users = relationship("User", back_populates="start_station", uselist=False)
    end_users = relationship("User", back_populates="end_station", uselist=False)


class Notice(Base):
    __tablename__ = "notice"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    updated_date = Column(DateTime, default=datetime.now)
    region_id = Column(Integer, ForeignKey("region.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

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
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="faqs")
    region = relationship("Region", back_populates="faqs")
    faq_answer = relationship("FaQAnswer", back_populates="faq", uselist=False)


class FaQAnswer(Base):
    __tablename__ = "faq_answer"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(Text, nullable=False)
    created_date = Column(DateTime, default=datetime.now)
    updated_date = Column(DateTime, default=datetime.now)
    faq_id = Column(Integer, ForeignKey("faq.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="faq_answers")
    faq = relationship("FaQ", back_populates="faq_answers")
