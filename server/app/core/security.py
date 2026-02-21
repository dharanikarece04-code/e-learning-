"""
Security utilities - Updated to validate Supabase JWT tokens.

Supabase issues JWT tokens signed with HS256 using the project's JWT Secret.
This module validates those tokens so the FastAPI backend can trust the user's identity.
"""
from typing import Optional
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.config import settings

# Use HTTPBearer instead of OAuth2PasswordBearer since Supabase handles OAuth
security = HTTPBearer(auto_error=False)


def verify_supabase_token(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
) -> dict:
    """
    Validates a Bearer token issued by Supabase Auth.
    
    The token is a standard JWT signed with the Supabase JWT Secret 
    (found in Supabase Project Settings → API → JWT Settings → JWT Secret).
    
    Returns the decoded payload containing:
        - sub: the user's Supabase UUID
        - email: the user's email
        - role: 'authenticated' for logged-in users
    """
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated. Include a Bearer token.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            # Supabase tokens use 'authenticated' as the audience
            options={"verify_aud": False},
        )
        return payload

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user_id(payload: dict = Depends(verify_supabase_token)) -> str:
    """Extracts the Supabase user UUID from the token payload."""
    user_id: str = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing user identifier (sub claim)",
        )
    return user_id


def get_current_user_email(payload: dict = Depends(verify_supabase_token)) -> str:
    """Extracts the user's email from the token payload."""
    email: str = payload.get("email")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing email claim",
        )
    return email
