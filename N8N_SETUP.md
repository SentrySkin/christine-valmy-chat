# n8n + Vertex AI Integration Setup Guide

## Overview
This guide will help you connect your React chat UI to n8n, which will then connect to Google Cloud Platform's Vertex AI for intelligent responses.

## Architecture
```
React Chat UI → n8n Webhook → Vertex AI → Response back through n8n
```

## Step 1: Set up n8n

### Option A: Self-hosted n8n
```bash
# Install n8n globally
npm install n8n -g

# Start n8n
n8n start

# Or with Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### Option B: n8n Cloud (Recommended)
1. Go to [n8n.cloud](https://n8n.cloud)
2. Create a free account
3. Create a new workspace

## Step 2: Create n8n Workflow

### 1. Create Webhook Trigger
1. In n8n, click "Add Workflow"
2. Add a "Webhook" trigger node
3. Configure the webhook:
   - **HTTP Method**: POST
   - **Path**: `/chat`
   - **Response Mode**: Respond to Webhook
4. Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/chat`)

### 2. Add Google Cloud Vertex AI Node
1. Add a "Google Cloud Vertex AI" node
2. Configure authentication:
   - **Authentication**: Service Account
   - **Service Account Key**: Upload your GCP service account JSON key
3. Configure the node:
   - **Operation**: Generate Text
   - **Model**: `text-bison` or `gemini-pro`
   - **Prompt**: Use the message from the webhook
   - **Temperature**: 0.7
   - **Max Tokens**: 1000

### 3. Add Response Node
1. Add a "Respond to Webhook" node
2. Configure the response:
   ```json
   {
     "reply": "{{ $json.predictions[0].content }}",
     "status": "success"
   }
   ```

## Step 3: Set up Google Cloud Platform

### 1. Enable Vertex AI API
```bash
# Install Google Cloud CLI
# Then run:
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable aiplatform.googleapis.com
```

### 2. Create Service Account
1. Go to Google Cloud Console → IAM & Admin → Service Accounts
2. Create a new service account
3. Add these roles:
   - Vertex AI User
   - Vertex AI Service Agent
4. Create and download the JSON key file

### 3. Set up Vertex AI
1. Go to Vertex AI in Google Cloud Console
2. Create a new model or use existing ones
3. Note the model name (e.g., `text-bison@001`)

## Step 4: Configure React App

### 1. Environment Variables
Create a `.env` file in your React app root:
```env
REACT_APP_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/chat
```

### 2. Update Configuration
In `src/App.js`, update the webhook URL:
```javascript
const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook/chat';
```

## Step 5: Advanced n8n Workflow

### Enhanced Workflow with Error Handling
```json
{
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "chat",
        "responseMode": "responseNode"
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "position": [240, 300]
    },
    {
      "parameters": {
        "operation": "generateText",
        "model": "text-bison@001",
        "prompt": "{{ $json.message }}",
        "temperature": 0.7,
        "maxTokens": 1000
      },
      "name": "Vertex AI",
      "type": "n8n-nodes-base.googleCloudVertexAi",
      "position": [460, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"reply\": \"{{ $json.predictions[0].content }}\",\n  \"status\": \"success\"\n}"
      },
      "name": "Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "position": [680, 300]
    }
  ]
}
```

## Step 6: Testing

### 1. Test n8n Webhook
```bash
curl -X POST https://your-n8n-instance.com/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello, how are you?",
    "userName": "Test User",
    "timestamp": "2024-01-01T00:00:00Z"
  }'
```

### 2. Test React App
1. Start your React app: `npm start`
2. Open the chat interface
3. Send a message
4. Check n8n execution logs

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Configure n8n to allow your domain
2. **Authentication Errors**: Check GCP service account permissions
3. **Timeout Errors**: Increase timeout in React app
4. **Model Not Found**: Verify Vertex AI model name

### Debug Steps:
1. Check n8n execution logs
2. Verify webhook URL is correct
3. Test GCP credentials
4. Check browser console for errors

## Security Considerations

1. **API Keys**: Never commit service account keys to version control
2. **Webhook Security**: Use webhook signatures for production
3. **Rate Limiting**: Implement rate limiting in n8n
4. **Input Validation**: Validate user input before sending to AI

## Production Deployment

### 1. Environment Variables
```env
REACT_APP_N8N_WEBHOOK_URL=https://your-production-n8n.com/webhook/chat
N8N_WEBHOOK_SECRET=your-secret-key
```

### 2. n8n Production Setup
- Use n8n Cloud or self-hosted with proper SSL
- Set up monitoring and logging
- Configure backup and recovery

### 3. GCP Production Setup
- Use production service account
- Set up monitoring and alerting
- Configure proper IAM permissions 