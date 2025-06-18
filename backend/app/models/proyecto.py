from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Proyecto(Base):
    __tablename__ = "proyectos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(255))
    descripcion = Column(String(255))
    latitud = Column(Float)
    longitud = Column(Float)
    tipo = Column(String(50))
    precio = Column(Integer)
