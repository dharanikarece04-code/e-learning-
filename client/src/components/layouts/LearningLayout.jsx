import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, FileText, CheckCircle, HelpCircle } from 'lucide-react';
import './LearningLayout.css';

const LearningLayout = () => {
    const navigate = useNavigate();

    return (
        <div className="layout-learning">
            {/* Minimal Header */}
            <header className="learning-header glass-panel">
                <div className="header-left">
                    <button
                        className="btn-back"
                        onClick={() => navigate('/dashboard')}
                        title="Back to Dashboard"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="course-info">
                        <span className="course-breadcrumb">Advanced React Patterns</span>
                        <h1 className="lesson-title">1.2 Component Inversion of Control</h1>
                    </div>
                </div>

                <div className="header-right">
                    <button className="btn btn-secondary btn-sm desktop-only">
                        <MessageSquare size={16} style={{ marginRight: '6px' }} /> Q&A
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <CheckCircle size={16} style={{ marginRight: '6px' }} /> Mark Complete
                    </button>
                </div>
            </header>

            <div className="learning-body">
                {/* Main Content Area (Video/Reading) */}
                <main className="learning-content">
                    <Outlet />
                </main>

                {/* Curriculum Sidebar */}
                <aside className="curriculum-sidebar">
                    <div className="sidebar-header">
                        <h3>Course Content</h3>
                        <span className="progress-text">12% Complete</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: '12%' }}></div>
                    </div>

                    <div className="curriculum-list">
                        {/* Mock Module Data */}
                        <div className="module-group expanded">
                            <div className="module-header">
                                <h4>1. Advanced Component Patterns</h4>
                                <span>3 / 8 | 45m</span>
                            </div>
                            <ul className="lesson-list">
                                <li className="lesson-item completed">
                                    <CheckCircle size={16} className="status-icon" />
                                    <span className="lesson-name">1.1 Compound Components</span>
                                    <span className="lesson-time">12:30</span>
                                </li>
                                <li className="lesson-item active">
                                    <div className="status-icon playing"></div>
                                    <span className="lesson-name">1.2 Component Inversion of Control</span>
                                    <span className="lesson-time">15:45</span>
                                </li>
                                <li className="lesson-item locked">
                                    <div className="status-icon empty"></div>
                                    <span className="lesson-name">1.3 State Reducer Pattern</span>
                                    <span className="lesson-time">18:20</span>
                                </li>
                            </ul>
                        </div>

                        <div className="module-group">
                            <div className="module-header">
                                <h4>2. Performance Optimization</h4>
                                <span>0 / 5 | 1h 20m</span>
                            </div>
                        </div>

                        <div className="module-group">
                            <div className="module-header">
                                <h4>3. System Design for Frontend</h4>
                                <span>0 / 12 | 3h 15m</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LearningLayout;
