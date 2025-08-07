import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ isAdmin }) {
  const [name, setName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Configuration - Update these with your actual n8n webhook URL
  const N8N_WEBHOOK_URL = process.env.REACT_APP_N8N_WEBHOOK_URL || 'https://sentryskin.app.n8n.cloud/webhook/chat';
  
  // CORS proxy for development (remove in production)
  const CORS_PROXY = process.env.REACT_APP_CORS_PROXY || 'https://cors-anywhere.herokuapp.com/';
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Use CORS proxy in development if needed
  const getWebhookUrl = () => {
    if (isDevelopment && process.env.REACT_APP_USE_CORS_PROXY === 'true') {
      return CORS_PROXY + N8N_WEBHOOK_URL;
    }
    return N8N_WEBHOOK_URL;
  };

  // Add welcome message when component mounts
  useEffect(() => {
    if (!messages.length) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: `Hey there${name ? `, ${name}` : ''}! 👋 How can I help you today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [messages.length, name]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsEditingName(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);
    setError(null);

    try {
      // Send message to n8n webhook
      const response = await sendMessageToN8N(currentMessage, name);
      
      // Handle different response formats
      let responseText = '';
      
      if (response.reply) {
        responseText = response.reply;
      } else if (response.message) {
        responseText = response.message;
      } else if (Array.isArray(response) && response.length > 0) {
        // If response is an array, get the first item's response field
        const firstItem = response[0];
        if (firstItem.response) {
          responseText = firstItem.response;
        } else if (typeof firstItem === 'string') {
          responseText = firstItem;
        } else {
          responseText = JSON.stringify(firstItem);
        }
      } else if (typeof response === 'string') {
        responseText = response;
      } else {
        responseText = 'I received your message but couldn\'t process it properly.';
      }

      // Format the response text (handle newlines and formatting)
      const formattedText = responseText
        .replace(/\\n/g, '\n') // Convert escaped newlines to actual newlines
        .replace(/\n\n\n/g, '\n\n') // Reduce multiple newlines to double newlines
        .replace(/\\"/g, '"') // Convert escaped quotes
        .replace(/\\'/g, "'") // Convert escaped single quotes
        .trim(); // Remove extra whitespace

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: formattedText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      setError(error.message);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendMessageToN8N = async (message, userName) => {
    try {
      // Get Google Cloud authentication token
      const getAuthToken = async () => {
        try {
          // For development, use environment variable
          // For production, this should be handled server-side
          return process.env.REACT_APP_GCP_AUTH_TOKEN || 'your-gcp-identity-token-here';
        } catch (error) {
          console.error('Error getting auth token:', error);
          throw new Error('Authentication failed');
        }
      };

      const authToken = await getAuthToken();
      
      // Debug: Log the token (remove this after testing)
      console.log('Auth token being sent:', authToken);
      console.log('Webhook URL:', getWebhookUrl());
      console.log('Message being sent:', message);
      
      // Convert messages to history format for the agent
      const history = messages
        .filter(msg => msg.type !== 'bot' || !msg.isError) // Exclude error messages
        .map(msg => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          text: msg.text
        }));

      const payload = {
        user_id: "1", // You might want to make this dynamic
        thread_id: "1", // You might want to make this dynamic
        query: message,
        history: history
      };

      console.log('Payload being sent:', payload);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000, // 30 second timeout
        withCredentials: false // Disable credentials for CORS
      };

      // Add CORS proxy headers if using proxy
      if (isDevelopment && process.env.REACT_APP_USE_CORS_PROXY === 'true') {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      const response = await axios.post(getWebhookUrl(), payload, config);

      console.log('Response received:', response.data);
      console.log('Response type:', typeof response.data);
      console.log('Is array:', Array.isArray(response.data));
      return response.data;
    } catch (error) {
      console.error('Error sending message to n8n:', error);
      
      // Provide more specific error messages
      if (error.code === 'ERR_NETWORK') {
        throw new Error('Network error: Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.response?.status === 404) {
        throw new Error('Webhook not found: The chat service endpoint is not available. Please check the configuration.');
      } else if (error.response?.status === 403) {
        throw new Error('Access denied: CORS policy blocked the request. Please check the server configuration.');
      } else if (error.response?.status >= 500) {
        throw new Error('Server error: The chat service is experiencing issues. Please try again later.');
      } else {
        throw new Error('Failed to get response from AI. Please try again.');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        {isEditingName ? (
          <form onSubmit={handleNameSubmit} className="name-edit-form">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="name-edit-input"
              autoFocus
              onBlur={() => setIsEditingName(false)}
            />
          </form>
        ) : (
          <h2 onClick={() => setIsEditingName(true)} className="editable-name">
            Hey there{name ? `, ${name}` : <span className="placeholder-text"> Enter your name</span>}! 👋
          </h2>
        )}
        <p className="chat-subtitle">Christine Valmy Chat</p>
      </div>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'} ${message.isError ? 'error-message' : ''}`}
          >
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="typing-indicator">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
              <span>Typing...</span>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
          disabled={isTyping}
        />
        <button type="submit" className="send-button" disabled={!currentMessage.trim() || isTyping}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
