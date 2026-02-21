from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.db.session import get_db
from app.models.catalog import Course, Category
from app.schemas.catalog_schema import CourseResponse, CategoryResponse

router = APIRouter()

@router.get("/categories", response_model=List[CategoryResponse])
async def get_categories(db: AsyncSession = Depends(get_db)):
    """Fetch all categories for the frontend taxonomy filter."""
    result = await db.execute(select(Category))
    categories = result.scalars().all()
    # If using actual data, we could just return here.
    # For scaffolding, returning empty list if no DB context.
    return categories

@router.get("/courses", response_model=List[CourseResponse])
async def get_courses(
    category_slug: str = Query(None, description="Filter by category slug"),
    search: str = Query(None, description="Search query string"),
    limit: int = 20,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    """
    Fetch paginated courses. Supports filtering by category and search.
    """
    query = select(Course).where(Course.is_published == True)
    
    # Filter logic...
    if category_slug:
        query = query.join(Category).where(Category.slug == category_slug)
    if search:
        query = query.where(Course.title.ilike(f"%{search}%"))
        
    query = query.limit(limit).offset(offset)
    result = await db.execute(query)
    courses = result.scalars().all()
    
    return courses
