from fastapi import FastAPI
from app.database import Base, engine
from app.routers import proyectos, ofertas, stats

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(proyectos.router, prefix="/proyectos", tags=["Proyectos"])
app.include_router(ofertas.router, prefix="/ofertas", tags=["Ofertas"])
app.include_router(stats.router, prefix="/stats", tags=["Estadísticas"])

