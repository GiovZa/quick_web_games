import React, { useState, useEffect } from 'react';
import { ref, set } from "firebase/database";
import { database } from '../../firebase/firebase-config';
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

  const saveGameStats = (timeSpent, gameWon, clicksMade, bombsLeft) => {
    const gameStatsRef = ref(database, 'gameStats/' + Date.now());
  
    const gameData = {
      time: timeSpent,
      won: gameWon,
      clicks: clicksMade,
      bombsRemaining: bombsLeft,
      timestamp: Date.now(), 
    };
  
    set(gameStatsRef, gameData).then(() => {
      console.log('Game stats saved successfully!');
    }).catch((error) => {
      console.error('Failed to save game stats', error);
    });
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
    <div>
      <div className="game-info">
        <span>Clicks: {clicks}</span>
        <span>Bombs Remaining: {num_of_bombs - flags + 1}</span>
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
  );
  
};

export default MineSweeper;