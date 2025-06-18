from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.proyecto import Proyecto, ProyectoCreate
from app.crud import proyecto as crud

router = APIRouter()

def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()

@router.get("/", response_model=list[Proyecto])
def listar(db: Session = Depends(get_db)):
    return crud.obtener_proyectos(db)

@router.post("/", response_model=Proyecto)
def crear(proy: ProyectoCreate, db: Session = Depends(get_db)):
    return crud.crear_proyecto(db, proy)
