import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import './Catalog.css';

// Mock Data representing the API output
const MOCK_CATEGORIES = [
    { id: 1, name: 'Software Engineering', slug: 'software-engineering', count: 142 },
    { id: 2, name: 'Data Science', slug: 'data-science', count: 85 },
    { id: 3, name: 'UI/UX Design', slug: 'design', count: 56 },
    { id: 4, name: 'Business Strategy', slug: 'business', count: 42 },
];

const MOCK_COURSES = [
    {
        id: 1,
        title: 'Advanced React patterns & System Design',
        instructor: 'Sarah Drasner',
        rating: 4.9,
        reviews: 1240,
        level: 'Advanced',
        duration: '16h 40m',
        price: 89.99,
        category: 'Software Engineering',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        bestSeller: true
    },
    {
        id: 2,
        title: 'Machine Learning A-Z: Python Algorithms',
        instructor: 'Andrew Ng',
        rating: 4.8,
        reviews: 3200,
        level: 'Beginner',
        duration: '22h 15m',
        price: 49.99,
        category: 'Data Science',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        bestSeller: false
    },
    {
        id: 3,
        title: 'Figma for Enterprise Product Design',
        instructor: 'Gary Simon',
        rating: 4.7,
        reviews: 890,
        level: 'Intermediate',
        duration: '8h 30m',
        price: 64.99,
        category: 'UI/UX Design',
        thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        bestSeller: false
    }
];

const Catalog = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <div className="catalog-page">
            {/* Search Header */}
            <div className="catalog-header">
                <div className="container">
                    <h1>Explore the Catalog</h1>
                    <p className="text-secondary">Level up your skills with over 500+ premium courses.</p>

                    <div className="catalog-search glass-panel">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Search for 'Python Data Structures'..." />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>

            <div className="container catalog-body">
                {/* Sidebar Filters */}
                <aside className="catalog-sidebar">
                    <div className="filter-group">
                        <h3>Categories</h3>
                        <ul className="filter-list">
                            <li
                                className={activeCategory === null ? 'active' : ''}
                                onClick={() => setActiveCategory(null)}
                            >
                                <span>All Categories</span>
                            </li>
                            {MOCK_CATEGORIES.map(cat => (
                                <li
                                    key={cat.id}
                                    className={activeCategory === cat.slug ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat.slug)}
                                >
                                    <span>{cat.name}</span>
                                    <span className="count">({cat.count})</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="filter-group">
                        <h3>Level</h3>
                        <div className="checkbox-group">
                            <label><input type="checkbox" /> Beginner</label>
                            <label><input type="checkbox" /> Intermediate</label>
                            <label><input type="checkbox" /> Advanced</label>
                        </div>
                    </div>
                </aside>

                {/* Course Grid */}
                <main className="catalog-results">
                    <div className="results-header">
                        <h2>{activeCategory ? activeCategory.replace('-', ' ').toUpperCase() : 'All Courses'}</h2>
                        <div className="results-sort">
                            <span className="text-muted">Sort by:</span>
                            <select className="glass-panel text-primary">
                                <option>Highest Rated</option>
                                <option>Newest</option>
                                <option>Price: Low to High</option>
                            </select>
                        </div>
                    </div>

                    <div className="course-grid">
                        {MOCK_COURSES.map(course => (
                            <div key={course.id} className="course-card glass-panel" style={{ padding: 0 }}>
                                <img src={course.thumbnail} alt={course.title} className="course-thumb" style={{ width: '100%', height: '180px', objectFit: 'cover', borderTopLeftRadius: 'var(--radius-md)', borderTopRightRadius: 'var(--radius-md)' }} />
                                <div className="course-info p-2" style={{ padding: '1.5rem' }}>
                                    <div className="flex-between mb-1" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span className="text-accent text-sm font-medium">{course.category}</span>
                                        <span className="status-badge" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>{course.level}</span>
                                    </div>
                                    <h3 className="text-md mb-1" style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{course.title}</h3>
                                    <div className="flex-between text-sm text-muted mb-2" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                        <span>{course.duration}</span>
                                        <span>{course.rating} ★ ({course.reviews})</span>
                                    </div>
                                    <div className="flex-between mt-2 pt-1 border-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                                        <span className="font-medium text-lg">${course.price}</span>
                                        <Link to={`/checkout/${course.id}`} className="btn btn-primary btn-sm">Buy Now</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Catalog;
