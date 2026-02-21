from sqlalchemy import Column, String, DateTime, Boolean
from datetime import datetime
from app.db.session import Base

class UserProfile(Base):
    """
    Public profile data that extends the auth identity.
    Authentication itself is handled externally via Supabase Auth.
    """
    __tablename__ = "profiles"

    id = Column(String, primary_key=True) # Matches Supabase auth.users UUID
    email = Column(String, unique=True, index=True, nullable=False)
    
    # role enum: student, instructor, admin
    role = Column(String, default="student") 
    
    full_name = Column(String(100), nullable=True)
    avatar_url = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
