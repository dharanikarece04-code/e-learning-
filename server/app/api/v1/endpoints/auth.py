from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas.auth_schema import Token, UserCreate
from app.core.security import create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
async def login_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    OAuth2 compatible token login, getting an access token for future requests.
    In a real app, this would validate against Supabase Auth or DB hash.
    """
    # Scaffolding mock behavior
    if not form_data.username or not form_data.password:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    # Generate token
    token = create_access_token(subject=form_data.username)
    return {"access_token": token, "token_type": "bearer"}

@router.post("/register", response_model=Token)
async def register_user(user_in: UserCreate):
    """
    Register a new user and return a JWT.
    """
    # Normally we would hash password & insert into db.
    token = create_access_token(subject=user_in.email)
    return {"access_token": token, "token_type": "bearer"}
