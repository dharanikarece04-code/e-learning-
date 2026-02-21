import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Award,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X
} from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const navItems = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { path: '/my-learning', icon: <BookOpen size={20} />, label: 'My Learning' },
        { path: '/certificates', icon: <Award size={20} />, label: 'Certificates' },
        { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    return (
        <div className="layout-dashboard">
            {/* Mobile Sidebar Overlay */}
            <div
                className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar Navigation */}
            <aside className={`dashboard-sidebar glass-panel ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="logo">
                        <div className="logo-icon small"></div>
                        <span className="logo-text text-gradient">Lumina</span>
                    </Link>
                    <button className="mobile-only btn-ghost" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <p className="nav-section-title">STUDENT</p>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-nav-item text-error">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="dashboard-main">
                {/* Top Navbar */}
                <header className="dashboard-header glass-panel">
                    <div className="header-left">
                        <button className="btn-ghost mobile-only" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <div className="dashboard-search desktop-only">
                            <Search className="search-icon" size={18} />
                            <input type="text" placeholder="Search your courses..." />
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="btn-icon">
                            <Bell size={20} />
                            <span className="notification-dot"></span>
                        </button>
                        <div className="user-profile-menu">
                            <div className="avatar">
                                <img src="https://ui-avatars.com/api/?name=Alex+Doe&background=6366F1&color=fff" alt="User" />
                            </div>
                            <div className="user-info desktop-only">
                                <span className="user-name">Alex Doe</span>
                                <span className="user-role">Student</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
