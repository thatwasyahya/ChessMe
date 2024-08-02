import React from 'react';
import '../styles/PromotionModal.css';

// Emojis for chess pieces
const pieceEmojis = {
  white: {
    q: '👑', // White Queen
    r: '♖', // White Rook
    b: '♗', // White Bishop
    n: '♘', // White Knight
  },
  black: {
    q: '👑', // Black Queen
    r: '♜', // Black Rook
    b: '♝', // Black Bishop
    n: '♞', // Black Knight
  },
};

function PromotionModal({ color, onSelect }) {
  // Determine the color-specific emojis
  const emojis = pieceEmojis[color] || {};

  return (
    <div className="promotion-modal">
      <button className="close-button" onClick={() => onSelect(null)}>×</button>
      <h2>Select a piece to promote to:</h2>
      <div className="promotion-buttons">
        <button className="promotion-button" onClick={() => onSelect('q')}>
          {emojis.q} Queen
        </button>
        <button className="promotion-button" onClick={() => onSelect('r')}>
          {emojis.r} Rook
        </button>
        <button className="promotion-button" onClick={() => onSelect('b')}>
          {emojis.b} Bishop
        </button>
        <button className="promotion-button" onClick={() => onSelect('n')}>
          {emojis.n} Knight
        </button>
      </div>
    </div>
  );
}

export default PromotionModal;
