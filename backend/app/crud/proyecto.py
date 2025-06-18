from sqlalchemy.orm import Session
from app.models.proyecto import Proyecto
from app.schemas.proyecto import ProyectoCreate

def obtener_proyectos(db: Session):
    return db.query(Proyecto).all()

def crear_proyecto(db: Session, proyecto: ProyectoCreate):
    db_proyecto = Proyecto(**proyecto.dict())
    db.add(db_proyecto)
    db.commit()
    db.refresh(db_proyecto)
    return db_proyecto
