from pydantic import BaseModel

class OfferBase(BaseModel):
    project_id: int
    amount: float
    buyer_name: str

class OfferCreate(OfferBase):
    pass

class Offer(OfferBase):
    id: int
    class Config:
        orm_mode = True
