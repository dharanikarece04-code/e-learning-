import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import SessionLocal
from app.models.catalog import Category, Course, Module
from app.models.user import UserProfile
import uuid

async def seed_data():
    async with SessionLocal() as db:
        print("🌱 Seeding database with mock content...")

        # 1. Create Mock Instructor Profile
        instructor_id = str(uuid.uuid4())
        instructor = UserProfile(
            id=instructor_id,
            email="instructor@demo.com",
            role="instructor",
            full_name="Sarah Drasner",
            bio="Senior Staff Engineer. Passionate about scalable frontend architectures.",
            avatar_url="https://ui-avatars.com/api/?name=Sarah+Drasner&background=6366F1&color=fff"
        )
        db.add(instructor)

        # 2. Create Categories
        categories = [
            Category(name="Software Engineering", slug="software-engineering", description="Learn modern frameworks, architecture, and languages."),
            Category(name="Data Science", slug="data-science", description="Master machine learning algorithms and AI APIs."),
            Category(name="UI/UX Design", slug="design", description="Design systems, Figma mastery, and user research.")
        ]
        db.add_all(categories)
        await db.commit() # Commit to get IDs
        
        # 3. Create Courses
        course_1 = Course(
            instructor_id=instructor_id,
            category_id=categories[0].id,
            title="Advanced React Patterns & System Design",
            slug="advanced-react-patterns",
            description="Master inversion of control, compound components, and scalable state machines.",
            price=89.99,
            is_published=True,
            thumbnail_url="https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80"
        )
        
        course_2 = Course(
            instructor_id=instructor_id,
            category_id=categories[1].id,
            title="Machine Learning A-Z: Python Algorithms",
            slug="machine-learning-az",
            description="From regression to neural networks.",
            price=49.99,
            is_published=True,
            thumbnail_url="https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80"
        )
        db.add_all([course_1, course_2])
        await db.commit()

        # 4. Create Modules for Course 1
        modules = [
            Module(course_id=course_1.id, title="1. Introduction to Inversion of Control", sequence_order=1, duration_minutes=45),
            Module(course_id=course_1.id, title="2. The Compound Component Pattern", sequence_order=2, duration_minutes=60),
            Module(course_id=course_1.id, title="3. Higher Order Components in 2026", sequence_order=3, duration_minutes=35),
        ]
        db.add_all(modules)
        await db.commit()
        
        print("✅ Seeding complete!")

if __name__ == "__main__":
    asyncio.run(seed_data())
