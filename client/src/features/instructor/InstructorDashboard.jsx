import React from 'react';
import {
    Users, DollarSign, BookOpen, Star,
    TrendingUp, Activity, MessageSquare, Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Instructor.css';
import useAuthStore from '../../store/authStore';

const InstructorDashboard = () => {
    const user = useAuthStore(state => state.user);

    // Mock Analytical Data
    const stats = [
        { label: 'Total Revenue', value: '$12,450', trend: '+14%', icon: <DollarSign size={20} />, color: 'var(--success)' },
        { label: 'Total Students', value: '1,248', trend: '+8%', icon: <Users size={20} />, color: 'var(--info)' },
        { label: 'Active Courses', value: '4', trend: '0%', icon: <BookOpen size={20} />, color: 'var(--accent-primary)' },
        { label: 'Avg. Rating', value: '4.8', trend: '+0.1', icon: <Star size={20} fill="currentColor" />, color: 'var(--warning)' },
    ];

    const recentCourses = [
        { id: 1, title: 'Advanced React Patterns', students: 842, revenue: '$8,420', status: 'Published' },
        { id: 2, title: 'TypeScript for Enterprise', students: 310, revenue: '$3,100', status: 'Published' },
        { id: 3, title: 'Next.js 14 Deep Dive', students: 96, revenue: '$930', status: 'Published' },
        { id: 4, title: 'GraphQL Fundamentals', students: 0, revenue: '$0', status: 'Draft' },
    ];

    return (
        <div className="instructor-dashboard animate-fade-in">
            <div className="dashboard-header flex-between mb-2">
                <div>
                    <h1 className="text-xl">Instructor Dashboard</h1>
                    <p className="text-secondary">Welcome back, {user?.name || 'Instructor'}. Here's what's happening today.</p>
                </div>
                <Link to="/instructor/courses/create" className="btn btn-primary btn-sm flex-center gap-2">
                    <Plus size={16} /> Create Course
                </Link>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid mb-3">
                {stats.map((stat, i) => (
                    <div key={i} className="stat-card glass-panel">
                        <div className="stat-icon-wrapper" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p className="stat-label text-muted">{stat.label}</p>
                            <div className="stat-value-row">
                                <h3 className="stat-value">{stat.value}</h3>
                                <span className={`stat-trend ${stat.trend.startsWith('+') ? 'text-success' : ''}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid cols-2">
                {/* Course Performance Table */}
                <div className="dashboard-section glass-panel flex-col">
                    <div className="section-header flex-between p-2 pb-0">
                        <h3 className="text-md">Course Performance</h3>
                        <button className="btn btn-ghost btn-sm">View All</button>
                    </div>
                    <div className="table-responsive p-1">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Students</th>
                                    <th>Revenue</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentCourses.map(course => (
                                    <tr key={course.id}>
                                        <td className="font-medium">{course.title}</td>
                                        <td>{course.students.toLocaleString()}</td>
                                        <td>{course.revenue}</td>
                                        <td>
                                            <span className={`status-badge ${course.status.toLowerCase()}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Center / Needs Attention */}
                <div className="dashboard-section glass-panel flex-col">
                    <div className="section-header p-2 pb-0">
                        <h3 className="text-md">Needs Attention</h3>
                        <p className="text-sm text-muted">Tasks requiring your review</p>
                    </div>
                    <div className="action-list p-2">

                        <div className="action-item">
                            <div className="action-icon warning-bg">
                                <MessageSquare size={16} color="var(--warning)" />
                            </div>
                            <div className="action-details">
                                <h4>12 Unanswered Q&A Threads</h4>
                                <p className="text-sm text-muted">Students are waiting for your response in "Advanced React Patterns"</p>
                            </div>
                            <button className="btn btn-secondary btn-sm">Review</button>
                        </div>

                        <div className="action-item">
                            <div className="action-icon info-bg">
                                <Activity size={16} color="var(--info)" />
                            </div>
                            <div className="action-details">
                                <h4>High Drop-off Rate Detected</h4>
                                <p className="text-sm text-muted">Module 4 in "TypeScript for Enterprise" has a 45% drop-off rate.</p>
                            </div>
                            <button className="btn btn-secondary btn-sm">Analyze</button>
                        </div>

                        <div className="action-item">
                            <div className="action-icon accent-bg">
                                <Star size={16} color="var(--accent-primary)" />
                            </div>
                            <div className="action-details">
                                <h4>5 New Reviews</h4>
                                <p className="text-sm text-muted">You received three 5-star and two 4-star reviews today.</p>
                            </div>
                            <button className="btn btn-secondary btn-sm">Read</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorDashboard;
