from sqlalchemy.orm import Session
from app.db import models
from app.db.schemas import AlarmCreate
from app.service.notification_service import send_notification


def get_alarm(db: Session, alarm_id: int):
    return db.query(models.Alarm).filter(models.Alarm.id == alarm_id).first()


def get_alarms(db: Session, page: int, limit: int):
    return db.query(models.Alarm).offset(page).limit(limit).all()


def create_alarm(db: Session, alarm: AlarmCreate):
    db_alarm = models.Alarm(**alarm.dict())
    db.add(db_alarm)
    db.commit()
    db.refresh(db_alarm)
    return db_alarm


def create_alarm_from_event(
    db: Session, model: models.Base, target_id: int, content: str, db_users: list
):

    print(db_users)
    alarm_type = model.__tablename__
    if isinstance(db_users, list):
        for user in db_users:
            db_alarm = models.Alarm(
                user_id=user.id,
                content=content,
                target_id=target_id,
                read=False,
                alarm_type=alarm_type,
            )
            db.add(db_alarm)
            db.commit()
            db.refresh(db_alarm)
    else:
        db_alarm = models.Alarm(
            user_id=db_users.id,
            content=content,
            target_id=target_id,
            read=False,
            alarm_type=alarm_type,
        )
        db.add(db_alarm)
        db.commit()
        db.refresh(db_alarm)

    token_list = get_token_list(db_users)
    send_notification(token_list, "새로운 알림이 도착했습니다.", content)

    return len(db_users) if isinstance(db_users, list) else 1


def delete_alarm(db: Session, alarm_id: int):
    db_alarm = db.query(models.Alarm).filter(models.Alarm.id == alarm_id).first()
    db.delete(db_alarm)
    db.commit()
    return db_alarm


def read_alarm(db: Session, alarm_id: int):
    db_alarm = db.query(models.Alarm).filter(models.Alarm.id == alarm_id).first()
    db_alarm.read = True
    db.commit()
    db.refresh(db_alarm)
    return db_alarm


def get_token_list(user_list):
    token_list = []
    for user in user_list:
        token_list.append(f"ExponentPushToken[{user.fcm_token}]")

    return token_list
