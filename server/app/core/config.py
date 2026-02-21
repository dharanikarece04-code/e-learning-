from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "E-Learning Platform API"
    API_V1_STR: str = "/api/v1"
    
    # Database URL (docker-compose Postgres)
    DATABASE_URL: str = "postgresql+asyncpg://postgres:supersecretpassword@db:5432/elearning_db"
    
    # Legacy secret (kept for backward compat with mock auth endpoints)
    SECRET_KEY: str = "super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 1 week

    # Supabase — used to validate tokens issued by Supabase Auth
    # Get from: Supabase Dashboard -> Project Settings -> API -> JWT Settings -> JWT Secret
    SUPABASE_URL: str = "https://placeholder.supabase.co"
    SUPABASE_JWT_SECRET: str = "placeholder-jwt-secret"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
