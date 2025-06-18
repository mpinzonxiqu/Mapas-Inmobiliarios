from sqlalchemy.orm import Session
from app.models.offer import Offer
from app.schemas.offer import OfferCreate

def get_offers_by_project(db: Session, project_id: int):
    return db.query(Offer).filter(Offer.project_id == project_id).all()

def create_offer(db: Session, offer: OfferCreate):
    db_offer = Offer(**offer.dict())
    db.add(db_offer)
    db.commit()
    db.refresh(db_offer)
    return db_offer

def update_offer(db: Session, offer_id: int, offer_data: OfferCreate):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    for key, value in offer_data.dict().items():
        setattr(offer, key, value)
    db.commit()
    db.refresh(offer)
    return offer

def delete_offer(db: Session, offer_id: int):
    offer = db.query(Offer).filter(Offer.id == offer_id).first()
    db.delete(offer)
    db.commit()
    return offer
