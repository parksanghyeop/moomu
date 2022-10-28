# regions api router

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.crud import region_crud

from app.db.schemas import RegionCreate, Region, RegionUpdate, RegionDelete
from app.dependencies import get_db

from app.service.jwt_service import validate_token

router = APIRouter(
    prefix="/regions",
    tags=["regions"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("", response_model=list[Region])
def read_regions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), payload: dict = Depends(validate_token)):
    regions = region_crud.get_regions(db, skip=skip, limit=limit)
    return regions


@router.get("/{region_id}", response_model=Region)
def read_region(region_id: int, db: Session = Depends(get_db)):
    db_region = region_crud.get_region(db, region_id=region_id)
    if db_region is None:
        raise HTTPException(status_code=404, detail="지역을 찾을 수 없습니다.")
    return db_region


@router.post("/register", response_model=Region)
def register_region(region: RegionCreate, db: Session = Depends(get_db)):
    db_region = region_crud.get_region_by_name(db, name=region.name)
    if db_region:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="이미 등록된 지역 입니다.",
        )
    return region_crud.create_region(db=db, region=region)


@router.delete("/delete/{region_id}", response_model=RegionDelete)
def delete_region(region_id: int, db: Session = Depends(get_db)):
    db_region = region_crud.get_region(db, region_id=region_id)
    if db_region is None:
        raise HTTPException(status_code=404, detail="지역을 찾을 수 없습니다.")
    db.delete(db_region)
    db.commit()
    return db_region


@router.put("/update/{region_id}", response_model=RegionUpdate)
def update_region(region_id: int, region: RegionCreate, db: Session = Depends(get_db)):
    db_region = region_crud.get_region(db, region_id=region_id)
    if db_region is None:
        raise HTTPException(status_code=404, detail="지역을 찾을 수 없습니다.")
    db_region.name = region.name
    db.commit()
    return db_region
