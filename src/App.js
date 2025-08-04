import React, { useState, useEffect } from 'react';
import './App.css';

function App({ isAdmin }) {
  const [name, setName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simulate loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Add welcome message when component mounts
  useEffect(() => {
    if (!isLoading && !messages.length) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: `Hey there${name ? `, ${name}` : ''}! 👋 How can I help you today?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [isLoading, messages.length, name]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsEditingName(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        text: `Thanks for your message${name ? `, ${name}` : ''}! I'm a demo chat interface. This is a sample response.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

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

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type === 'user' ? 'user-message' : 'bot-message'}`}
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
    </div>
  );
}

export default App; 