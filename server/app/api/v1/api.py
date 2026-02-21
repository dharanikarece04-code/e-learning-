from fastapi import APIRouter
from app.api.v1.endpoints import catalog, auth

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(catalog.router, prefix="/catalog", tags=["Catalog"])
