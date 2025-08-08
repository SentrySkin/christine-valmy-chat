import React from 'react';
import '../styles/BentoGrid.css';
import Chat from './Chat';
import facialTreatmentImage from '../images/facial-treatment.jpg';

const BentoGrid = () => {
  // Get the logo URL from WordPress data
  const getLogoUrl = () => {
    // Use the logo URL from WordPress if available
    if (window.cvtAjax?.logoUrl) {
      return window.cvtAjax.logoUrl;
    }
    
    // Fallback to constructing the URL
    const pluginUrl = window.cvtAjax?.pluginUrl || '/wp-content/plugins/christine-valmy-test/';
    return `${pluginUrl}public/images/logos/cv logo round.svg`;
  };
  
  const logoUrl = getLogoUrl();
  
  return (
    <div className="bento-container">
      {/* Hero Section - Chat Functionality */}
      <div className="bento-item hero-section">
        <div className="hero-content">
          <div className="logo-container">
            <div className="logo">
              <img 
                src={logoUrl}
                alt="Christine Valmy Logo"
                onError={(e) => {
                  console.error('Logo failed to load:', e.target.src);
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div style={{ display: 'none', fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-gradient-start)' }}>
                CV
              </div>
            </div>
          </div>
          <h1 className="hero-title">Christine Valmy</h1>
          <div className="chat-form">
            <Chat isAdmin={false} />
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
            <span>New Jersey</span>
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
          <img 
            src={facialTreatmentImage} 
            alt="Facial Treatment" 
            onError={(e) => {
              console.error('Facial treatment image failed to load:', e.target.src);
              e.target.style.display = 'none';
              // You could add a fallback placeholder here
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BentoGrid; 