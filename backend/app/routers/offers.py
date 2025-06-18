from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud import offer as crud
from app.schemas import offer as schema

router = APIRouter(prefix="/offers", tags=["offers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schema.Offer])
def list_offers(project_id: int, db: Session = Depends(get_db)):
    return crud.get_offers_by_project(db, project_id)

@router.post("/", response_model=schema.Offer)
def create_offer(offer: schema.OfferCreate, db: Session = Depends(get_db)):
    return crud.create_offer(db, offer)

@router.put("/{offer_id}", response_model=schema.Offer)
def update_offer(offer_id: int, offer: schema.OfferCreate, db: Session = Depends(get_db)):
    return crud.update_offer(db, offer_id, offer)

@router.delete("/{offer_id}")
def delete_offer(offer_id: int, db: Session = Depends(get_db)):
    crud.delete_offer(db, offer_id)
    return {"ok": True}
