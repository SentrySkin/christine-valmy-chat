// Configuration file for n8n + Vertex AI integration
// Copy this to config.js and update with your actual values

const config = {
  // n8n Webhook Configuration
  n8n: {
    webhookUrl: process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/chat',
    timeout: parseInt(process.env.REACT_APP_REQUEST_TIMEOUT) || 30000,
    secret: process.env.N8N_WEBHOOK_SECRET || null
  },
  
  // Chat Configuration
  chat: {
    maxMessageLength: 1000,
    typingDelay: 1500,
    retryAttempts: 3
  },
  
  // Error Messages
  errors: {
    connectionFailed: 'Failed to connect to AI service. Please try again.',
    timeout: 'Request timed out. Please try again.',
    invalidResponse: 'Received invalid response from AI service.',
    networkError: 'Network error. Please check your connection.'
  }
};

export default config; 