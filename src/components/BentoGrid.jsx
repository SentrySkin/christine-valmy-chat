import React from 'react';
import './BentoGrid.css';

const BentoGrid = () => {
  return (
    <div className="bento-container">
      {/* Hero Section - Chat Functionality */}
      <div className="bento-item hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo">CV</div>
          </div>
          <h1 className="hero-title">Christine Valmy</h1>
          <div className="chat-form">
            <div className="input-container">
              <input
                type="text"
                placeholder="Ask me anything about Christine Valmy..."
                className="chat-input"
                disabled
              />
              <div className="input-icons">
                <span className="emoji-icon">😊</span>
                <button className="send-icon" disabled>→</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Panel */}
      <div className="bento-item locations-panel">
        <h3 className="panel-title">Our Locations</h3>
        <div className="location-list">
          <div className="location-item">
            <span className="location-icon">📍</span>
            <span>New York City</span>
          </div>
          <div className="location-item">
            <span className="location-icon">📍</span>
            <span>Los Angeles</span>
          </div>
          <div className="location-item">
            <span className="location-icon">📍</span>
            <span>Miami</span>
          </div>
          <div className="location-item">
            <span className="location-icon">📍</span>
            <span>Chicago</span>
          </div>
        </div>
      </div>

      {/* Enrollment Panel */}
      <div className="bento-item enrollment-panel">
        <h3 className="panel-title">Enrollment</h3>
        <div className="enrollment-divider"></div>
        <p className="enrollment-text">
          Ready to start your journey in esthetics? Our comprehensive programs are designed to prepare you for a successful career in the beauty industry.
        </p>
      </div>

      {/* Schedule Panel */}
      <div className="bento-item schedule-panel">
        <h3 className="panel-title">Class Schedule</h3>
        <div className="schedule-content">
          <div className="schedule-item">
            <span className="time">9:00 AM</span>
            <span className="class">Morning Theory</span>
          </div>
          <div className="schedule-item">
            <span className="time">11:00 AM</span>
            <span className="class">Practical Lab</span>
          </div>
          <div className="schedule-item">
            <span className="time">2:00 PM</span>
            <span className="class">Advanced Techniques</span>
          </div>
        </div>
      </div>

      {/* Courses Panel */}
      <div className="bento-item courses-panel">
        <div className="courses-icon">🎓</div>
        <h3 className="panel-title">Our Courses</h3>
        <p>Comprehensive esthetics training programs</p>
      </div>

      {/* Alumni Panel */}
      <div className="bento-item alumni-panel">
        <h3 className="panel-title">Alumni Success</h3>
        <p className="alumni-text">
          Join thousands of successful graduates who have built thriving careers in esthetics and beauty therapy.
        </p>
        <div className="flip-link">
          <span>View Success Stories</span>
          <span className="flip-icon">→</span>
        </div>
      </div>

      {/* Image Panel */}
      <div className="bento-item image-panel">
        <div className="image-placeholder">
          <div className="image-content">
            <div className="facial-treatment">
              <div className="client-head"></div>
              <div className="therapist-hands"></div>
              <div className="cityscape"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid; 