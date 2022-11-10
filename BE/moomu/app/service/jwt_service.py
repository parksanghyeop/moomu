from datetime import datetime, timedelta
from jose import jwt, JWTError, ExpiredSignatureError
from fastapi import HTTPException, status, Depends

from app.core.config import settings
from app.db.models import User
from app.db.crud import user_crud

from sqlalchemy.orm import Session
from app.dependencies import get_db
from fastapi.security import OAuth2PasswordBearer

ACCESS_EXPIRES = timedelta(minutes=60)
REFRESH_EXPIRES = timedelta(days=14)

ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="users/token")


def generate_access_token(user: User):
    expire = datetime.utcnow() + ACCESS_EXPIRES
    to_encode = {"id": user.id, "exp": expire, "nickname": user.nickname, "region": user.region_id, "role": user.user_role}
    encode_jwt = jwt.encode(to_encode, settings.ACCESS_KEY, algorithm=ALGORITHM)

    return {"access_token": encode_jwt, "token_type": "bearer"}


def validate_token(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    payload = decode_token(token, db)
    return payload


def decode_token(token: str, db: Session):
    try:
        decode_token = jwt.decode(token, settings.ACCESS_KEY, ALGORITHM)
        # 아이디 확인
        db_user = user_crud.get_user(db, user_id=decode_token.get("id"))

        if not db_user:
            raise JWTError
        return decode_token
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS,
            detail="토큰이 만료되었습니다."
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="인증이 적합하지 않습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )
