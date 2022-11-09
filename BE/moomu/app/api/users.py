from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.crud import user_crud
from app.db.schemas.user import UserUpdate, UserStation
from app.db.schemas import UserCreate, User, UserLogin, ExpoToken, UserBus
from app.dependencies import get_db
import bcrypt

from app.service.jwt_service import generate_access_token, validate_token
from app.db.schemas.commute_or_leave import CommuteOrLeave

router = APIRouter(
    prefix="/users",
    tags=["users"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/admin", response_model=list[User])
def get_all_user(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_role = payload.get("role")
    if user_role < 5:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED, detail="권한이 없습니다."
        )
    db_users = user_crud.get_users(db)
    if db_users is None:
        raise HTTPException(status_code=404, detail="Users not found")
    return db_users


@router.get("/profile", response_model=User)
def read_user(db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    user_id = payload.get("id")
    db_user = user_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/profile/edit", response_model=User)
def edit_user(
    user: UserUpdate,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_id = payload.get("id")
    db_user = user_crud.update_user(db, user_id, user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/profile/delete", response_model=User)
def delete_user(db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    user_id = payload.get("id")
    db_user = user_crud.delete_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/register", response_model=User)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이미 가입된 사용자 입니다.",
        )
    return user_crud.create_user(db=db, user=user)


@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="존재하지 않는 사용자 입니다.",
        )
    if not bcrypt.checkpw(
        user.password.encode("utf-8"), db_user.password.encode("utf-8")
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="비밀번호가 일치하지 않습니다.",
        )
    # 토큰 발급
    return generate_access_token(db_user)


@router.post("/token")
def auth_token(
    user: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    db_user = user_crud.get_user_by_username(db, username=user.username)
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="존재하지 않는 사용자 입니다.",
        )
    if not bcrypt.checkpw(
        user.password.encode("utf-8"), db_user.password.encode("utf-8")
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="비밀번호가 일치하지 않습니다.",
        )
    # 토큰 발급
    return generate_access_token(db_user)


@router.post("/expo_token")
def update_expo_token(
    expo_token: ExpoToken,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    print(expo_token.expo_token)
    user_id = payload.get("id")
    db_user = user_crud.update_expo_token(db, user_id, expo_token.expo_token)
    if db_user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    return {"message": "토큰이 등록되었습니다."}


@router.delete("/expo_token")
def delete_expo_token(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    db_user = user_crud.delete_expo_token(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="사용자를 찾을 수 없습니다.")
    return {"message": "토큰이 삭제되었습니다."}


@router.get("/exists")
def get_exists_user(
    station_id: int, commute_or_leave: CommuteOrLeave, db: Session = Depends(get_db)
):
    return user_crud.get_exists_user_at_station(db, station_id, commute_or_leave)


@router.get("/station", response_model=UserStation)
def get_user_station(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    db_user = user_crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.put("/station/edit", response_model=User)
def edit_user_station(
    station_id: int,
    commute_or_leave: CommuteOrLeave,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_id = payload.get("id")
    db_user = user_crud.update_user_station(db, user_id, station_id, commute_or_leave)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/station/delete", response_model=User)
def delete_user_station(
    commute_or_leave: CommuteOrLeave,
    db: Session = Depends(get_db),
    payload: dict = Depends(validate_token),
):
    user_id = payload.get("id")
    db_user = user_crud.delete_user_station(db, user_id, commute_or_leave)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/bus", response_model=list[UserBus])
def get_user_bus(
    db: Session = Depends(get_db), payload: dict = Depends(validate_token)
):
    user_id = payload.get("id")
    return user_crud.get_user_bus(db, user_id)
