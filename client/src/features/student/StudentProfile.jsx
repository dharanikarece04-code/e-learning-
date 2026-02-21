import React from 'react';
import { User, Award, Clock, Settings, Book, LogOut } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

const StudentProfile = () => {
    const user = useAuthStore(state => state.user);
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const certificates = [
        { id: 1, title: 'Go Fundamentals', date: 'Oct 12, 2025', idStr: 'CERT-A492J8' },
        { id: 2, title: 'Advanced Docker Workflow', date: 'Dec 05, 2025', idStr: 'CERT-F730B1' }
    ];

    return (
        <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '1rem' }}>
            <h1 className="text-xl mb-3">My Profile</h1>

            <div className="dashboard-grid cols-2" style={{ gridTemplateColumns: '1fr 2fr' }}>

                {/* Profile Navigator Sidebar */}
                <div className="glass-panel" style={{ padding: '0', alignSelf: 'start', overflow: 'hidden' }}>
                    <div className="profile-hero p-2 text-center border-bottom" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="avatar-lg mx-auto flex-center mb-1" style={{
                            width: '80px', height: '80px', borderRadius: '50%',
                            background: 'var(--accent-gradient)', fontSize: '2rem', fontWeight: 'bold'
                        }}>
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <h3 className="text-md">{user?.name || 'Student App'}</h3>
                        <span className="text-sm text-muted">{user?.email || 'student@demo.com'}</span>
                        <span className="status-badge mt-1" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent-primary)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>Pro Member</span>
                    </div>

                    <ul className="profile-nav-list" style={{ listStyle: 'none' }}>
                        <li><Link to="/my-learning" className="profile-nav-btn active flex-center" style={{ justifyContent: 'flex-start', padding: '1rem 1.5rem', gap: '0.75rem', borderBottom: '1px solid var(--border-light)' }}><Book size={18} /> My Learning</Link></li>
                        <li><Link to="/certificates" className="profile-nav-btn flex-center text-muted hover-accent" style={{ justifyContent: 'flex-start', padding: '1rem 1.5rem', gap: '0.75rem', borderBottom: '1px solid var(--border-light)' }}><Award size={18} /> Certificates</Link></li>
                        <li><Link to="/settings" className="profile-nav-btn flex-center text-muted hover-accent" style={{ justifyContent: 'flex-start', padding: '1rem 1.5rem', gap: '0.75rem', borderBottom: '1px solid var(--border-light)' }}><Settings size={18} /> Account Settings</Link></li>
                        <li><button onClick={handleLogout} className="profile-nav-btn flex-center text-muted hover-accent" style={{ width: '100%', cursor: 'pointer', background: 'transparent', border: 'none', justifyContent: 'flex-start', padding: '1rem 1.5rem', gap: '0.75rem' }}><LogOut size={18} /> Sign Out</button></li>
                    </ul>
                </div>

                {/* Profile Content Area */}
                <div className="flex-col gap-3" style={{ gap: '1.5rem' }}>

                    {/* Achievements Summary */}
                    <div className="glass-panel p-2">
                        <h3 className="text-md mb-2">Learning Statistics</h3>
                        <div className="stats-grid" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                            <div className="stat-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                <Clock size={20} color="var(--accent-primary)" className="mb-1" />
                                <p className="text-sm text-muted">Time Learned</p>
                                <h4 className="font-medium text-lg">24.5 Hours</h4>
                            </div>
                            <div className="stat-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                <Book size={20} color="var(--info)" className="mb-1" />
                                <p className="text-sm text-muted">Courses Active</p>
                                <h4 className="font-medium text-lg">3 Enrolled</h4>
                            </div>
                            <div className="stat-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                                <Award size={20} color="var(--warning)" className="mb-1" />
                                <p className="text-sm text-muted">Certificates</p>
                                <h4 className="font-medium text-lg">2 Earned</h4>
                            </div>
                        </div>
                    </div>

                    {/* Certificates List */}
                    <div className="glass-panel p-2">
                        <div className="flex-between mb-2">
                            <h3 className="text-md">Recent Certificates</h3>
                            <button className="btn btn-ghost btn-sm">View All</button>
                        </div>

                        <div className="flex-col gap-2" style={{ gap: '1rem' }}>
                            {certificates.map(cert => (
                                <div key={cert.id} className="certificate-card flex-between p-2" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)' }}>
                                    <div className="flex-center" style={{ gap: '1rem' }}>
                                        <div className="cert-icon flex-center" style={{ width: '48px', height: '48px', background: 'rgba(245, 158, 11, 0.15)', borderRadius: 'var(--radius-sm)' }}>
                                            <Award size={24} color="var(--warning)" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium">{cert.title}</h4>
                                            <p className="text-sm text-muted">Issued: {cert.date} • ID: {cert.idStr}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-secondary btn-sm flex-center gap-2">Download PDF</button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default StudentProfile;
