import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import Sidebar from './Sidebar';
import PromotionModal from './PromotionModal';

function App() {
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState('bot');
  const [promotion, setPromotion] = useState(null);
  const [promotionSquare, setPromotionSquare] = useState(null);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();

    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      handleGameOver();
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function handleGameOver() {
    setGameOver(true);
    const winner = game.turn() === 'w' ? 'Black' : 'White';
    setWinner(winner);
  }

  function onDrop(source, target) {
    if (gameOver) return false;

    const piece = game.get(source);
    if (piece.type === 'p' && (target[1] === '8' || target[1] === '1')) {
      setPromotionSquare(target);
      setPromotion({ from: source, to: target });
      return false;
    }

    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: 'q',
      });
    });

    if (move === null) return false;

    if (game.game_over() || game.in_draw()) {
      handleGameOver();
    } else if (gameMode === 'bot') {
      setTimeout(makeRandomMove, 200);
    }

    return true;
  }

  function handlePromotion(promotionType) {
    const { from, to } = promotion;
    safeGameMutate((game) => {
      game.move({
        from: from,
        to: to,
        promotion: promotionType,
      });
    });

    setPromotion(null);
    setPromotionSquare(null);
  }

  function restartGame() {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setPromotion(null);
    setPromotionSquare(null);
  }

  useEffect(() => {
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        restartGame();
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="app">
      <Sidebar setGameMode={setGameMode} currentGameMode={gameMode} />
      <div className="main-content">
        <div className="header">
          <div className="game-info">
            <h1>ChessMe</h1>
          </div>
        </div>
        <div className="chessboard-container">
          <Chessboard position={game.fen()} onPieceDrop={onDrop} />
          {gameOver && (
            <div className="game-over">
              <p>Game Over</p>
              <p>Winner: {winner}</p>
              <p>Press Enter to restart</p>
            </div>
          )}
          {promotionSquare && (
            <PromotionModal
              color={game.turn()}
              onSelect={handlePromotion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;