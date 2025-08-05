// n8n Configuration File
// Update these values with your actual n8n setup

const n8nConfig = {
  // Development n8n webhook URL
  development: {
    webhookUrl: 'https://your-dev-n8n-instance.com/webhook/chat',
    timeout: 30000
  },
  
  // Production n8n webhook URL
  production: {
    webhookUrl: 'https://your-prod-n8n-instance.com/webhook/chat',
    timeout: 30000
  },
  
  // Current environment
  environment: process.env.NODE_ENV || 'development',
  
  // Get current webhook URL
  getWebhookUrl() {
    return this[this.environment].webhookUrl;
  },
  
  // Get current timeout
  getTimeout() {
    return this[this.environment].timeout;
  }
};

export default n8nConfig; 