from fastapi import APIRouter
from app.api.v1.endpoints import catalog

api_router = APIRouter()
api_router.include_router(catalog.router, prefix="/catalog", tags=["Catalog"])
