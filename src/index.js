import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Check if we're in WordPress admin or frontend
const isAdmin = window.location.href.includes('wp-admin');
const targetElement = isAdmin ? 'cvt-react-app' : 'cvt-frontend-app';

// Initialize the app
function initApp() {
  const container = document.getElementById(targetElement);
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App isAdmin={isAdmin} />
      </React.StrictMode>
    );
  }
}

// Export for global access
window.CVTApp = {
  initFrontend: initApp
};

// Auto-initialize if element exists
if (document.getElementById(targetElement)) {
  initApp();
} 