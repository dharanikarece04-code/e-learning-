import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './PublicLayout.css';
import { BookOpen, Search, LogIn, Menu } from 'lucide-react';

const PublicLayout = () => {
    return (
        <div className="layout-public">
            <header className="navbar glass-panel">
                <div className="container nav-content">
                    <Link to="/" className="logo">
                        <div className="logo-icon"></div>
                        <span className="logo-text text-gradient">Lumina</span>
                    </Link>

                    <div className="nav-search">
                        <Search className="search-icon" size={18} />
                        <input type="text" placeholder="What do you want to learn?" />
                    </div>

                    <nav className="nav-links desktop-only">
                        <Link to="/courses" className="nav-item">Catalog</Link>
                        <Link to="/pricing" className="nav-item">Pricing</Link>
                        <Link to="/enterprise" className="nav-item">Enterprise</Link>
                    </nav>

                    <div className="nav-actions">
                        <Link to="/auth/login" className="btn btn-ghost desktop-only">
                            Log in
                        </Link>
                        <Link to="/auth/register" className="btn btn-primary">
                            Sign up
                        </Link>
                        <button className="mobile-menu-btn mobile-only">
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <Outlet />
            </main>

            <footer className="footer">
                <div className="container footer-content">
                    <div className="footer-brand">
                        <div className="logo">
                            <span className="logo-text text-gradient">Lumina Learning</span>
                        </div>
                        <p className="footer-tagline">Empowering the world to develop skills for the future.</p>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Platform</h4>
                            <Link to="/courses">Browse Catalog</Link>
                            <Link to="/certificates">Certificates</Link>
                            <Link to="/instructors">Instructors</Link>
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <Link to="/about">About Us</Link>
                            <Link to="/careers">Careers</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                    </div>
                </div>
                <div className="container footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Lumina Inc. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
