import React from 'react';
import '../styles/Sidebar.css';

function Sidebar({ setGameMode, currentGameMode }) {
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
    </div>
  );
}

export default Sidebar;
