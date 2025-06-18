from sqlalchemy import Column, Integer, String, Float, Text
from app.database import Base

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    location = Column(String(100), nullable=False)
    description = Column(Text)
    price = Column(Float)
    property_type = Column(String(50))
    area = Column(Float)
