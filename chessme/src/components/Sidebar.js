import React, { useState } from 'react';
import '../styles/Sidebar.css';

function Sidebar({ setGameMode, currentGameMode }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    // Add user's message to chat
    const userMessage = { role: 'user', content: inputMessage };
    setChatMessages([...chatMessages, userMessage]);

    // Send message to backend
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });
      const data = await response.json();
      
      // Add bot's response to chat
      const botMessage = { role: 'bot', content: data.text };
      setChatMessages([...chatMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    // Clear input field
    setInputMessage('');
  };

  return (
    <div className="sidebar">
      <h2>Game Modes</h2>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={currentGameMode === 'player'}
            onChange={() => setGameMode(currentGameMode === 'bot' ? 'player' : 'bot')}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="chatbox">
        <div className="chat-messages">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
