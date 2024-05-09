import React, { useState, useEffect } from 'react';
import { doc, setDoc, collection } from "firebase/firestore"; 
import { getAuth, signOut } from "firebase/auth";
import { db } from '../../firebase/firebase-config';
import AuthModal from './AuthModal';
import LogoutModal from './LogoutModal';  // Import LogoutModal
import './MineSweeper.scss';

const MineSweeper = () => {
  const num_of_rows = 12;
  const num_of_cols = 24;
  const num_of_bombs = 55;
  const [board, setBoard] = useState([]);
  const [alive, setAlive] = useState(true);
  const [firstClick, setFirstClick] = useState(true);
  const [flags, setFlags] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);  // State for the logout modal

  const colors = {1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey'};

  const restartGame = () => {
    setBoard(initializeBoard());
    setAlive(true); 
    setFirstClick(true); 
    setFlags(0); 
    setClicks(0);
    setSeconds(0);
  };

  useEffect(() => {
    setBoard(initializeBoard());
    const timer = setInterval(() => {
      if (alive) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [alive]);

  const revealBombsAndIncorrectFlags = () => {
    const updatedBoard = board.map(row => {
      return row.map(cell => {
        if (cell.hasBomb) {
          return { ...cell, clicked: true };
        }
        if (cell.flagged && !cell.hasBomb) {
          return { ...cell, markedIncorrectly: true };
        }
        return cell;
      });
    });
    setBoard(updatedBoard);
  };

  const initializeBoard = () => {
    return Array.from({ length: num_of_rows }, () =>
      Array.from({ length: num_of_cols }, () => ({
        hasBomb: false, clicked: false, flagged: false, markedIncorrectly: false, adjacentBombs: 0
      })));
  };

  const placeBombs = (initialRow, initialCol) => {
    let tempBoard = [...board];
    let bombsPlaced = 0;

    while (bombsPlaced < num_of_bombs) {
      let row = Math.floor(Math.random() * num_of_rows);
      let col = Math.floor(Math.random() * num_of_cols);

      const isInitialOrAdjacent = Math.abs(row - initialRow) <= 1 && Math.abs(col - initialCol) <= 1;

      if (!tempBoard[row][col].hasBomb && !isInitialOrAdjacent) {
        tempBoard[row][col].hasBomb = true;
        bombsPlaced++;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (tempBoard[row + i] && tempBoard[row + i][col + j] && !tempBoard[row + i][col + j].hasBomb) {
              tempBoard[row + i][col + j].adjacentBombs++;
            }
          }
        }
      }
    }
    return tempBoard;
  };

  const checkWin = (newBoard) => {
    let clickedCellsCount = 0;
    newBoard.forEach(row => {
      row.forEach(cell => {
        if (cell.clicked || cell.hasBomb) clickedCellsCount++;
      });
    });

    if (clickedCellsCount === num_of_rows * num_of_cols) {
      setAlive(false);
      saveGameStats(seconds, true, clicks, num_of_bombs - flags);
      setTimeout(() => alert("Congratulations, you won!"), 0);
    }
  };

  const formatDate = () => {
    const now = new Date();
    const month = ('0' + (now.getMonth() + 1)).slice(-2); // getMonth() is zero-indexed
    const day = ('0' + now.getDate()).slice(-2);
    const year = now.getFullYear();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    return `${month}-${day}-${year}-${hours}-${minutes}-${seconds}`;
  };

  const saveGameStats = async (timeSpent, gameWon, clicksMade, bombsLeft) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      // User is signed in, show the LogoutModal instead of AuthModal
      setShowLogoutModal(true);
      const emailSanitized = user.email.replace(/[\.\@\,\/\#\\\$\[\]]/g, '_');
      const userRef = doc(db, `minesweeperStats`, emailSanitized);
      const gamesCollectionRef = collection(userRef, 'games');
      const formattedDate = formatDate();
      const gameStatsRef = doc(gamesCollectionRef, formattedDate);
      const gameData = {
          time: timeSpent,
          won: gameWon,
          clicks: clicksMade,
          bombsRemaining: bombsLeft,
          timestamp: Date.now(),
      };
      try {
          await setDoc(gameStatsRef, gameData);
          console.log('Game stats saved successfully!');
      } catch (error) {
          console.error('Failed to save game stats', error);
      }
    } else {
      // No user is signed in, show the AuthModal
      setShowAuthModal(true);
    }
  };

  const handleCellClick = (row, col) => {
    if (!alive || board[row][col].clicked || board[row][col].flagged) return;
    if (firstClick) {
      const tempBoard = placeBombs(row, col);
      setBoard(tempBoard);
      setFirstClick(false);
    }
    let newBoard = [...board];
    newBoard[row][col].clicked = true;
    if (newBoard[row][col].hasBomb) {
      setAlive(false);
      revealBombsAndIncorrectFlags();
      saveGameStats(seconds, false, clicks, num_of_bombs - flags);
      setTimeout(() => alert('Game Over!'), 0);
    } else {
      if (newBoard[row][col].adjacentBombs === 0) {
        revealAdjacentCells(newBoard, row, col);
      }
      checkWin(newBoard);
    }
    setBoard(newBoard);
    setClicks(clicks + 1);
  };

  const handleRightClick = (event, row, col) => {
    event.preventDefault();
    if (!alive || board[row][col].clicked) return;
    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
    setClicks((prevClicks) => prevClicks + 1);
    setFlags(newBoard[row][col].flagged ? flags + 1 : flags - 1);
  };

  const revealAdjacentCells = (board, row, col) => {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (row + i >= 0 && row + i < num_of_rows && col + j >= 0 && col + j < num_of_cols && !board[row + i][col + j].clicked) {
          board[row + i][col + j].clicked = true;
          if (board[row + i][col + j].adjacentBombs === 0) {
            revealAdjacentCells(board, row + i, col + j);
          }
        }
      }
    }
  };

  const renderCell = (cell, row, col) => {
    let cellContent = "";
    const cellStyle = {};

    if (cell.clicked) {
      if (cell.hasBomb) {
          cellContent = "💣";
      } else if (cell.adjacentBombs > 0) {
          cellContent = cell.adjacentBombs;
          cellStyle.color = colors[cell.adjacentBombs];
      }
    } else if (!alive) {
      if (cell.flagged && !cell.hasBomb) {
          cellContent = "❌"; 
      } else if (cell.hasBomb) {
          cellContent = "💣";
      }
    } else if (cell.flagged) {
      cellContent = "🚩";
    }
    let cellClass = `cell ${cell.clicked || !alive ? 'clicked' : ''} ${!alive && cell.hasBomb ? 'bomb' : ''}`;
    return (
      <td key={`cell-${row}-${col}`} 
          onClick={() => handleCellClick(row, col)} 
          onContextMenu={(event) => handleRightClick(event, row, col)}
          className={cellClass}
          style={cellStyle}>
        {cellContent}
      </td>
    );
  };

  return (
    <div className='MineSweeper'>
      <div className="MineSweeper-setting">
        <div className="game-info">
          <span>Clicks: {clicks}</span>
          <span>Bombs Remaining: {num_of_bombs - flags}</span>
          <span>Seconds: {seconds}</span>
        </div>
        <button onClick={restartGame} className="restart-button">Restart Game</button> {}
        <table className="minesweeper-board">
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showLogoutModal && <LogoutModal onClose={() => setShowLogoutModal(false)} />}
    </div>
  );
};

export default MineSweeper;
