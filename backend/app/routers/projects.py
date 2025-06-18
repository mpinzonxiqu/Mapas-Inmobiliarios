from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.crud import project as crud
from app.schemas import project as schema

router = APIRouter(prefix="/projects", tags=["projects"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[schema.Project])
def list_projects(db: Session = Depends(get_db)):
    return crud.get_projects(db)

@router.get("/{project_id}", response_model=schema.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    return crud.get_project(db, project_id)

@router.post("/", response_model=schema.Project)
def create_project(project: schema.ProjectCreate, db: Session = Depends(get_db)):
    return crud.create_project(db, project)

@router.put("/{project_id}", response_model=schema.Project)
def update_project(project_id: int, project: schema.ProjectCreate, db: Session = Depends(get_db)):
    return crud.update_project(db, project_id, project)

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    crud.delete_project(db, project_id)
    return {"ok": True}
