import React, { useState, useEffect } from 'react';
import './App.css';
import BentoGrid from './components/BentoGrid';

function App({ isAdmin }) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="loading-animation">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <h2 className="loading-title">Christine Valmy</h2>
            <p className="loading-subtitle">Initializing chat interface...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <BentoGrid />
    </div>
  );
}

export default App; 