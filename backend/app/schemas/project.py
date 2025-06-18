from pydantic import BaseModel

class ProjectBase(BaseModel):
    name: str
    location: str
    description: str | None = None
    price: float
    property_type: str
    area: float

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    class Config:
        orm_mode = True
