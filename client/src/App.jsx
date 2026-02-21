import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import useAuthStore from './store/authStore';

// Layouts
import PublicLayout from './components/layouts/PublicLayout';
import DashboardLayout from './components/layouts/DashboardLayout';
import LearningLayout from './components/layouts/LearningLayout';
import ProtectedRoute from './components/layouts/ProtectedRoute';

// Pages
import Home from './features/catalog/Home';
import Catalog from './features/catalog/Catalog';
import CoursePlayer from './features/learning/CoursePlayer';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import InstructorDashboard from './features/instructor/InstructorDashboard';
import CourseCreationWizard from './features/instructor/CourseCreationWizard';
import Checkout from './features/catalog/Checkout';
import StudentProfile from './features/student/StudentProfile';

function App() {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    // Hydrate auth from Supabase session on app load
    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Catalog />} />
                    <Route path="/checkout/:courseId" element={<Checkout />} />
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                </Route>

                {/* Dashboard Routes — Protected by Supabase Auth */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route path="/dashboard" element={
                            <div className="dashboard-view-fade-in">
                                <h2>Welcome back! 👋</h2>
                                <p className="text-secondary" style={{ marginTop: '0.5rem' }}>You've learned for 4 hours this week. Keep it up!</p>

                                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    <Link to="/learn/1" className="glass-panel" style={{ padding: '1.5rem', display: 'block' }}>
                                        <h3>Advanced React Patterns</h3>
                                        <div style={{ marginTop: '1rem', background: 'var(--bg-elevated)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ width: '60%', background: 'var(--accent-primary)', height: '100%' }}></div>
                                        </div>
                                        <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>60% Complete - Click to Continue</p>
                                    </Link>
                                </div>
                            </div>
                        } />
                        <Route path="/profile" element={<StudentProfile />} />
                        <Route path="/my-learning" element={<StudentProfile />} />
                        <Route path="/certificates" element={<StudentProfile />} />
                        <Route path="/settings" element={<StudentProfile />} />

                        {/* Instructor Specific Routes */}
                        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                        <Route path="/instructor/courses/create" element={<CourseCreationWizard />} />
                    </Route>
                </Route>

                {/* Learning Player Routes (Distraction-free) — Also Protected */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/learn" element={<LearningLayout />}>
                        <Route path=":courseId" element={<CoursePlayer />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
