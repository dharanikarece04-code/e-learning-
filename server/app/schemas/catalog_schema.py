from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    slug: str
    parent_id: Optional[int] = None

class CategoryResponse(CategoryBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

# Course Schemas
class CourseBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    price: float = 0.0
    category_id: int
    thumbnail_url: Optional[str] = None

class CourseCreate(CourseBase):
    instructor_id: str

class CourseResponse(CourseBase):
    id: int
    instructor_id: str
    is_published: bool
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    
    model_config = ConfigDict(from_attributes=True)
