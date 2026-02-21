import React, { useState } from 'react';
import {
    Play, Pause, Volume2, VolumeX, Maximize,
    Settings, SkipForward, Rewind, MessageCircle, FileText, Download
} from 'lucide-react';
import './CoursePlayer.css';

const CoursePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const togglePlay = () => setIsPlaying(!isPlaying);
    const toggleMute = () => setIsMuted(!isMuted);

    return (
        <div className="course-player-page">
            {/* Video Area */}
            <div className="video-container">
                <div className="video-wrapper">
                    {/* Mock Video Poster/Player */}
                    <div className="video-mockup">
                        <img
                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                            alt="Video frame"
                            className={`video-poster ${isPlaying ? 'fade-out' : ''}`}
                        />
                        {isPlaying && (
                            <div className="video-playing-state">
                                <div className="code-animation">
                                    <p><span className="keyword">const</span> <span className="function">renderApp</span> = () =&gt; {'{'}</p>
                                    <p>&nbsp;&nbsp;<span className="keyword">return</span> (</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="component">AppProvider</span>&gt;</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="component">MainRouter</span> /&gt;</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="component">AppProvider</span>&gt;</p>
                                    <p>&nbsp;&nbsp;);</p>
                                    <p>{'}'};</p>
                                </div>
                            </div>
                        )}

                        {!isPlaying && (
                            <button className="giant-play-btn" onClick={togglePlay}>
                                <Play size={48} fill="currentColor" />
                            </button>
                        )}
                    </div>

                    {/* Custom Video Controls overlay */}
                    <div className="video-controls glass-panel">
                        <div className="progress-slider">
                            <div className="progress-slider-fill" style={{ width: '35%' }}></div>
                            <div className="progress-slider-thumb" style={{ left: '35%' }}></div>
                        </div>

                        <div className="controls-row">
                            <div className="controls-left">
                                <button className="control-btn" onClick={togglePlay}>
                                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
                                </button>
                                <button className="control-btn"><Rewind size={20} /></button>
                                <button className="control-btn"><SkipForward size={20} /></button>
                                <div className="volume-control">
                                    <button className="control-btn" onClick={toggleMute}>
                                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                    </button>
                                    <div className="volume-slider"><div className="volume-fill" style={{ width: isMuted ? '0%' : '70%' }}></div></div>
                                </div>
                                <span className="time-display">04:12 / 15:45</span>
                            </div>

                            <div className="controls-right">
                                <button className="control-btn"><Settings size={20} /></button>
                                <button className="control-btn"><Maximize size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Area */}
            <div className="player-tabs-container">
                <div className="tabs-header">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FileText size={18} /> Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'qa' ? 'active' : ''}`}
                        onClick={() => setActiveTab('qa')}
                    >
                        <MessageCircle size={18} /> Q&A (24)
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'downloads' ? 'active' : ''}`}
                        onClick={() => setActiveTab('downloads')}
                    >
                        <Download size={18} /> Resources
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab animate-fade-in">
                            <h2>Component Inversion of Control</h2>
                            <div className="instructor-meta">
                                <img src="https://ui-avatars.com/api/?name=Sarah+Drasner&background=6366F1&color=fff" alt="Instructor" className="instructor-avatar" />
                                <div>
                                    <p className="instructor-name">Sarah Drasner</p>
                                    <p className="instructor-title">Senior Staff Engineer</p>
                                </div>
                            </div>
                            <div className="lesson-description">
                                <p>In this lesson, we explore one of the most powerful patterns in modern React: Inversion of Control (IoC). By giving rendering control back to the consumer of your component, you drastically increase its reusability and flexibility.</p>
                                <p>We will refactor a rigid compound component into an IoC pattern using render props and custom hooks.</p>
                            </div>
                        </div>
                    )}

                    {activeTab === 'qa' && (
                        <div className="qa-tab animate-fade-in">
                            <div className="ask-question glass-panel">
                                <input type="text" placeholder="Search course questions or ask your own..." />
                                <button className="btn btn-primary">Ask</button>
                            </div>

                            <div className="question-thread">
                                <div className="asker-avatar">JD</div>
                                <div className="thread-content">
                                    <h4>How does this differ from simple children propagation?</h4>
                                    <p>I'm having trouble understanding when to use render props vs just passing children. Isn't children already inversion of control?</p>
                                    <div className="thread-meta">
                                        <span className="text-accent">John Doe</span> • <span>2 days ago</span> • <span className="reply-count">1 Reply</span>
                                    </div>

                                    <div className="thread-reply">
                                        <div className="replier-avatar instructor-badge">SD</div>
                                        <div className="reply-content">
                                            <p>Great question! With standard children, the parent controls *what* is rendered, but not *how* the child interacts with internal state. By exposing internal state via Render Props (or hooks), you allow the consumer to wire up their own UI elements to your logic.</p>
                                            <span className="text-accent">Sarah Drasner</span> • <span className="text-muted">1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
