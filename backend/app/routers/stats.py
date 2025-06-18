from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.project import Project
from app.models.offer import Offer
from sqlalchemy import func

router = APIRouter(prefix="/stats", tags=["stats"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_stats(db: Session = Depends(get_db)):
    total_projects = db.query(Project).count()
    avg_price = db.query(func.avg(Project.price)).scalar()
    total_offers = db.query(Offer).count()
    return {
        "total_projects": total_projects,
        "average_price": avg_price,
        "total_offers": total_offers
    }
