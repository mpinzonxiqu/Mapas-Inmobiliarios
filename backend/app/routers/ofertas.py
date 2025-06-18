from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_ofertas():
    return {"message": "Listado de ofertas"}
