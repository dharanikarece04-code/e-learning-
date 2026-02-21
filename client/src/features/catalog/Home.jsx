import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Code, Zap, Award } from 'lucide-react';

const Home = () => {
    return (
        <div className="home-page animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section" style={{ padding: '8rem 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(10, 10, 11, 0) 70%)', zIndex: 0 }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="status-badge mx-auto mb-2" style={{ background: 'rgba(255,255,255,0.05)', display: 'inline-flex', padding: '0.5rem 1rem', borderRadius: '2rem', border: '1px solid var(--border-light)' }}>
                        <Star size={14} color="var(--warning)" style={{ marginRight: '6px' }} /> Trusted by 50,000+ Engineers
                    </div>

                    <h1 className="hero-title animate-fade-in" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontFamily: 'Outfit, sans-serif', lineHeight: 1.1, marginBottom: '1.5rem', background: 'linear-gradient(to right, #ffffff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Elevate your engineering. <br /> Master the architecture.
                    </h1>

                    <p className="hero-subtitle text-secondary mx-auto animate-fade-in" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', animationDelay: '0.1s', opacity: 0, animationFillMode: 'forwards' }}>
                        Immerse yourself in distraction-free video courses taught by industry veterans. Learn system design, scalable concepts, and advanced deployments.
                    </p>

                    <div className="hero-actions flex-center flex-wrap gap-2 animate-fade-in" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
                        <Link to="/courses" className="btn btn-primary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem' }}>
                            Explore Catalog <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                        <Link to="/auth/register" className="btn btn-secondary" style={{ padding: '1.1rem 2.5rem', fontSize: '1.1rem' }}>
                            Create Free Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="features-section" style={{ padding: '5rem 1.5rem', background: 'var(--bg-secondary)' }}>
                <div className="container dashboard-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>

                    <div className="feature-card glass-panel" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div className="icon-wrapper flex-center mx-auto mb-2" style={{ width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '1rem', color: 'var(--accent-primary)' }}>
                            <Zap size={32} />
                        </div>
                        <h3 className="text-md mb-1" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Interactive Learning</h3>
                        <p className="text-muted text-sm">Our custom distraction-free player locks you into the flow state for maximum retention.</p>
                    </div>

                    <div className="feature-card glass-panel" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div className="icon-wrapper flex-center mx-auto mb-2" style={{ width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '1rem', color: 'var(--success)' }}>
                            <Code size={32} />
                        </div>
                        <h3 className="text-md mb-1" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Architecture Focused</h3>
                        <p className="text-muted text-sm">We don't teach syntax. We teach system design, scalability, and structural patterns.</p>
                    </div>

                    <div className="feature-card glass-panel" style={{ padding: '2.5rem', textAlign: 'center', transition: 'transform 0.3s' }}>
                        <div className="icon-wrapper flex-center mx-auto mb-2" style={{ width: '64px', height: '64px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '1rem', color: 'var(--warning)' }}>
                            <Award size={32} />
                        </div>
                        <h3 className="text-md mb-1" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Verified Credentials</h3>
                        <p className="text-muted text-sm">Earn globally recognized certificates backed by verifiable transaction records.</p>
                    </div>

                </div>
            </section>

            {/* Social Proof CTA */}
            <section style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
                <h2 className="text-xl mb-1" style={{ fontSize: '2.5rem', fontFamily: 'Outfit' }}>Ready to join the elite?</h2>
                <p className="text-secondary mb-3" style={{ fontSize: '1.1rem', marginBottom: '2.5rem' }}>Stop grinding tutorials. Start building real engineering systems.</p>
                <Link to="/auth/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>Get Started Today</Link>
            </section>

        </div>
    );
};

export default Home;
