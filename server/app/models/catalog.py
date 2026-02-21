from sqlalchemy import Column, Integer, String, Text, ForeignKey, Numeric, Boolean, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.session import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    name = Column(String(100), nullable=False)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    
    # Relationships
    courses = relationship("Course", back_populates="category")

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    instructor_id = Column(String, nullable=False)  # Maps to auth.users UUID in Supabase
    category_id = Column(Integer, ForeignKey("categories.id"))
    
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True, nullable=False)
    description = Column(Text)
    price = Column(Numeric(10, 2), default=0.0)
    is_published = Column(Boolean, default=False)
    thumbnail_url = Column(String, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    category = relationship("Category", back_populates="courses")
    modules = relationship("Module", back_populates="course", cascade="all, delete-orphan")

class Module(Base):
    __tablename__ = "modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String(200), nullable=False)
    sort_order = Column(Integer, default=0)

    # Relationships
    course = relationship("Course", back_populates="modules")
