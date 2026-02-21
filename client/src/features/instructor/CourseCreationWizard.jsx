import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Upload, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CourseCreationWizard = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => setStep(s => Math.min(s + 1, 4));
    const handlePrev = () => setStep(s => Math.max(s - 1, 1));
    const handleFinish = () => navigate('/instructor/dashboard');

    return (
        <div className="course-wizard-container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>

            {/* Wizard Header / Progress */}
            <div className="wizard-progress glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <h1 className="text-xl" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Create a New Course</h1>
                <div className="progress-steps" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                    {/* Background Line */}
                    <div style={{ position: 'absolute', top: '15px', left: '10%', right: '10%', height: '2px', background: 'var(--border-light)', zIndex: 0 }}></div>
                    <div style={{ position: 'absolute', top: '15px', left: '10%', width: `${((step - 1) / 3) * 80}%`, height: '2px', background: 'var(--accent-primary)', zIndex: 1, transition: 'width 0.3s' }}></div>

                    {[1, 2, 3, 4].map(num => (
                        <div key={num} className="step-indicator" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                                className="step-circle"
                                style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: step >= num ? 'var(--accent-primary)' : 'var(--bg-elevated)',
                                    border: `2px solid ${step >= num ? 'var(--accent-primary)' : 'var(--border-light)'}`,
                                    color: step >= num ? 'white' : 'var(--text-muted)',
                                    fontWeight: '600'
                                }}
                            >
                                {step > num ? <CheckCircle size={16} /> : num}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: step >= num ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                {num === 1 ? 'Basics' : num === 2 ? 'Curriculum' : num === 3 ? 'Media' : 'Publish'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Wizard Content */}
            <div className="wizard-content glass-panel" style={{ padding: '3rem' }}>

                {step === 1 && (
                    <div className="step-pane animate-fade-in">
                        <h2 className="text-md mb-2">Basic Details</h2>
                        <div className="form-group mb-2">
                            <label>Course Title</label>
                            <input type="text" className="form-input mt-1" placeholder="e.g. Advanced Rust Programming" />
                        </div>
                        <div className="form-group mb-2">
                            <label>Category</label>
                            <select className="form-input mt-1">
                                <option>Software Engineering</option>
                                <option>Data Science</option>
                                <option>Design</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label>Description</label>
                            <textarea className="form-input mt-1" rows={4} placeholder="What will students learn?"></textarea>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-pane animate-fade-in">
                        <h2 className="text-md mb-2">Curriculum Builder</h2>
                        <p className="text-sm text-secondary mb-3">Add sections and lectures to structure your course.</p>

                        <div className="curriculum-builder glass-panel p-2 mb-2" style={{ borderStyle: 'dashed' }}>
                            <h3 className="text-sm">Section 1: Introduction</h3>
                            <div style={{ marginLeft: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div className="flex-between p-1" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                    <span className="text-sm">1. Welcome to the course</span>
                                </div>
                                <div className="flex-between p-1" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                                    <span className="text-sm">2. Environment Setup</span>
                                </div>
                                <button className="btn btn-ghost btn-sm text-accent mt-1" style={{ justifyContent: 'flex-start' }}>+ Add Lecture</button>
                            </div>
                        </div>

                        <button className="btn btn-secondary btn-full">+ Add New Section</button>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-pane animate-fade-in">
                        <h2 className="text-md mb-2">Course Media</h2>

                        <div className="form-group mb-3">
                            <label>Course Thumbnail</label>
                            <div className="upload-dropzone flex-center flex-col glass-panel" style={{ padding: '3rem', marginTop: '0.5rem', borderStyle: 'dashed', cursor: 'pointer' }}>
                                <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                                <p className="font-medium">Click or drag image to upload</p>
                                <p className="text-sm text-muted">750x422 pixels recommended. JPG, JPEG, PNG.</p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Promotional Video</label>
                            <div className="input-wrapper mt-1">
                                <LinkIcon className="input-icon" size={18} />
                                <input type="url" className="form-input" placeholder="https://youtube.com/..." />
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="step-pane animate-fade-in">
                        <h2 className="text-md mb-2">Ready to Publish</h2>
                        <div className="glass-panel p-2 mb-3" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                            <h4 className="text-success mb-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={18} /> All requirements met!
                            </h4>
                            <p className="text-sm text-secondary">Your course "Advanced Python" is ready to be published to the catalog. It will be immediately available to students.</p>
                        </div>

                        <div className="form-group mb-2">
                            <label>Course Pricing</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <span className="text-xl">$</span>
                                <input type="number" className="form-input" placeholder="89.99" style={{ maxWidth: '150px' }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Wizard Footer Controls */}
                <div className="wizard-actions flex-between" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrev}
                        disabled={step === 1}
                        style={{ opacity: step === 1 ? 0.5 : 1 }}
                    >
                        <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
                    </button>

                    {step < 4 ? (
                        <button className="btn btn-primary" onClick={handleNext}>
                            Next Step <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    ) : (
                        <button className="btn btn-primary" style={{ background: 'var(--success)' }} onClick={handleFinish}>
                            Publish Course
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default CourseCreationWizard;
