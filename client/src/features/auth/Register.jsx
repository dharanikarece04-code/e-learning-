import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import './Auth.css';

const Register = () => {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        const result = await register(email, password, fullName);

        if (result.success) {
            if (result.needsVerification) {
                // Supabase sent a confirmation email
                setSuccess(true);
            } else {
                // Auto-confirmed (e.g. email confirmation disabled in Supabase settings)
                navigate('/dashboard');
            }
        }
    };

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-container glass-panel text-center">
                    <div style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={32} color="var(--success)" />
                    </div>
                    <h2>Check your email</h2>
                    <p className="text-secondary" style={{ marginTop: '0.5rem' }}>
                        We sent a confirmation link to <strong>{email}</strong>.<br />
                        Click the link to activate your account.
                    </p>
                    <Link to="/auth/login" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-page">
            <div className="auth-container glass-panel">
                <div className="auth-header">
                    <div className="logo-icon center-icon"></div>
                    <h2>Create an account</h2>
                    <p className="text-secondary">Join millions of learners accelerating their careers.</p>
                </div>

                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 'var(--radius-sm)', color: '#fca5a5', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} />
                            <input
                                type="text"
                                id="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Jane Doe"
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="input-icon" size={18} />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="form-input"
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="input-icon" size={18} />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a strong password (8+ chars)"
                                className="form-input"
                                required
                                minLength={8}
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-full"
                        disabled={isLoading}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? 'Creating account...' : <>Start Learning <ArrowRight size={18} style={{ marginLeft: '8px' }} /></>}
                    </button>
                </form>

                <p className="terms-text text-muted">
                    By registering, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>

                <p className="auth-footer" style={{ marginTop: '2rem' }}>
                    Already have an account? <Link to="/auth/login" className="auth-link">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
