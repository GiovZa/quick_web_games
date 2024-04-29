import React, { useState } from "react";
import "./UltimateTicTacToe.css";

export default function UltimateTicTacToe() {
  const [turn, setTurn] = useState("X");
  const [cells, setCells] = useState(Array(81).fill(""));
  const [winner, setWinner] = useState();
  const [isDraw, setIsDraw] = useState(false);
  const [numOfWins_X, setNumOfWins_X] = useState(0);
  const [numOfWins_O, setNumOfWins_O] = useState(0);
  const [numOfDraws, setNumOfDraws] = useState(0);
  const [availableArea, setAvailableArea] = useState([0,1,2,3,4,5,6,7,8]);
  const [nextArea, setNextArea] = useState(Math.floor(Math.random()*9));




  const checkwinner = (arr, num) => {
    /*check three kinds of winning in tic tac toe*/
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [9, 10, 11],
        [12, 13, 14],
        [15, 16, 17],
        [18, 19, 20],
        [21, 22, 23],
        [24, 25, 26],
        [27, 28, 29],
        [30, 31, 32],
        [33, 34, 35],
        [36, 37, 38],
        [39, 40, 41],
        [42, 43, 44],
        [45, 46, 47],
        [48, 49, 50],
        [51, 52, 53],
        [54, 55, 56], 
        [57, 58, 59],
        [60, 61, 62],
        [63, 64, 65],
        [66, 67, 68],
        [69, 70, 71],
        [72, 73, 74],
        [75, 76, 77],
        [78, 79, 80],
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [9, 12, 15],
        [10, 13, 16],
        [11, 14, 17],
        [18, 21, 24],
        [19, 22, 25],
        [20, 23, 26],
        [27, 30, 33],
        [28, 31, 34],
        [29, 32, 35],
        [36, 39, 42],
        [37, 40, 43],
        [38, 41, 44],
        [45, 48, 51],
        [46, 49, 52],
        [47, 50, 53],
        [54, 57, 60],
        [55, 58, 61],
        [56, 59, 62],
        [63, 66, 69],
        [64, 67, 70],
        [65, 68, 71],
        [72, 75, 78],
        [73, 76, 79],
        [74, 77, 80],
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6],
        [9, 13, 17],
        [11, 13, 15],
        [18, 22, 26],
        [20, 22, 24],
        [27, 31, 35],
        [29, 31, 33],
        [36, 40, 44],
        [38, 40, 42],
        [45, 49, 53],
        [47, 49, 51],
        [54, 58, 62],
        [56, 58, 60],
        [63, 67, 71],
        [65, 67, 69],
        [72, 76, 80],
        [74, 76, 78],
      ],
    };
    
    /*Due to the delayed update of useState variable, 
    we name a copyed one to keep track of it at any time within this function */
    let area_copy = availableArea;
    let numOfWins_X_copy = numOfWins_X;
    let numOfWins_O_copy = numOfWins_O;
    let numOfDraws_copy = numOfDraws;
    for (let combo in combos) {
        let len = combos[combo].length;
        let area = Math.floor(num/9);
      combos[combo].slice(area*len/9, (area+1)*len/9).forEach((pattern) => {
        /*if 3 cells in a line are all empty, do nothing 
        (empty = empty, so we need to exclude this possibility) */
        if (
          arr[pattern[0]] === "" ||
          arr[pattern[1]] === "" ||
          arr[pattern[2]] === ""
        ) {
        } 
        /*if 3 cells in a line are equal, this person wins */
        else if (
          arr[pattern[0]] === arr[pattern[1]] &&
          arr[pattern[1]] === arr[pattern[2]]
        ) {

            setAvailableArea(availableArea.filter((a) => a !== Math.floor(pattern[0]/9)));
            area_copy = area_copy.filter((a) => a !== Math.floor(pattern[0]/9));
          if (arr[pattern[0]] === "X") {
            setNumOfWins_X(numOfWins_X + 1);
            numOfWins_X_copy = numOfWins_X_copy + 1;
          } else {
            setNumOfWins_O(numOfWins_O + 1);
            numOfWins_O_copy = numOfWins_O_copy + 1;
          }
          if (numOfWins_O_copy + numOfWins_X_copy + numOfDraws_copy === 9) {
            if (numOfWins_O_copy > numOfWins_X_copy) {
                setWinner("O");
            } else if (numOfWins_O_copy < numOfWins_X_copy) {
                setWinner("X");
            } else {
                setIsDraw(true);
            }
          }
        }
      });
    }

    /*check if this click results in a draw */
    /*if winner hasn't been chosen, but all 9 cells are full, then result is a draw */
    if (!arr.slice(num-num%9,num+9-num%9).includes("") && !winner && area_copy.includes(Math.floor(num/9))) {
        setNumOfDraws(numOfDraws + 1);
        numOfDraws_copy = numOfDraws_copy + 1;
        setAvailableArea(availableArea.filter((a) => a !== Math.floor(num/9)));
        area_copy = area_copy.filter((a) => a !== Math.floor(num/9));
        if (numOfWins_O_copy + numOfWins_X_copy + numOfDraws_copy === 9) {
          if (numOfWins_O_copy > numOfWins_X_copy) {
              setWinner("O");
          } else if (numOfWins_O_copy < numOfWins_X_copy) {
              setWinner("X");
          } else {
              setIsDraw(true);
          }
        }
      }

      setNextArea(area_copy[Math.floor(Math.random() * area_copy.length)]);
  };


  const handleClick = (num) => {
    /*if the result is out, or this cell has been chosen, do nothing when clicked */
    if (winner || cells[num] !== "" || Math.floor(num/9) !== nextArea) return;

    let arr = [...cells];
    if (turn === "X") {
      arr[num] = "X";
      setTurn("O");
    } else {
      arr[num] = "O";
      setTurn("X");
    }
    checkwinner(arr, num);
    setCells(arr);

  };

  const Cell = ({ num }) => {
    const cellValue = cells[num];
    let cellClassName = cellValue ? `cell cell-${cellValue}` : "cell";

    cellClassName = cellClassName + " " + "part" + `${Math.floor(num/9)+1}`;
    if (Math.floor(num/9) === nextArea) {
      cellClassName = cellClassName + " " + "nextAreaColor";
    }

    return (
      <td className={cellClassName} onClick={() => handleClick(num)}>
        {cellValue}
      </td>
    );
  };

  const handleReset = () => {
    setWinner();
    setIsDraw(false);
    setCells(Array(81).fill(""));
    setNumOfWins_X(0);
    setNumOfWins_O(0);
    setNumOfDraws(0);
    setAvailableArea([0,1,2,3,4,5,6,7,8]);
    setNextArea(Math.floor(Math.random()*9));
  };

  return (
    <div className="container">
      <h1>Ultimate Tic Tac Toe</h1>
      <h3>Walk in the 
        <span style={{color : "red"}}> RED </span>
         Area !!!</h3>
      <div className={`winner ${winner || isDraw ? "show" : ""}`}>
        {winner ? `Winner is: ${winner}` : isDraw ? "It's a draw" : ""}
      </div>

      <table>
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />

            <Cell num={9} />
            <Cell num={10} />
            <Cell num={11} />

            <Cell num={18} />
            <Cell num={19} />
            <Cell num={20} />
          </tr>
        
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />

            <Cell num={12} />
            <Cell num={13} />
            <Cell num={14} />

            <Cell num={21} />
            <Cell num={22} />
            <Cell num={23} />
          </tr>

          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />

            <Cell num={15} />
            <Cell num={16} />
            <Cell num={17} />

            <Cell num={24} />
            <Cell num={25} />
            <Cell num={26} />
          </tr>

          <tr>
            <Cell num={27} />
            <Cell num={28} />
            <Cell num={29} />

            <Cell num={36} />
            <Cell num={37} />
            <Cell num={38} />

            <Cell num={45} />
            <Cell num={46} />
            <Cell num={47} />
          </tr>

          <tr>
            <Cell num={30} />
            <Cell num={31} />
            <Cell num={32} />

            <Cell num={39} />
            <Cell num={40} />
            <Cell num={41} />

            <Cell num={48} />
            <Cell num={49} />
            <Cell num={50} />
          </tr>

          <tr>
            <Cell num={33} />
            <Cell num={34} />
            <Cell num={35} />

            <Cell num={42} />
            <Cell num={43} />
            <Cell num={44} />

            <Cell num={51} />
            <Cell num={52} />
            <Cell num={53} />
          </tr>


          <tr>
            <Cell num={54} />
            <Cell num={55} />
            <Cell num={56} />

            <Cell num={63} />
            <Cell num={64} />
            <Cell num={65} />

            <Cell num={72} />
            <Cell num={73} />
            <Cell num={74} />
          </tr>

          <tr>
            <Cell num={57} />
            <Cell num={58} />
            <Cell num={59} />

            <Cell num={66} />
            <Cell num={67} />
            <Cell num={68} />

            <Cell num={75} />
            <Cell num={76} />
            <Cell num={77} />
          </tr>

          <tr>
            <Cell num={60} />
            <Cell num={61} />
            <Cell num={62} />

            <Cell num={69} />
            <Cell num={70} />
            <Cell num={71} />

            <Cell num={78} />
            <Cell num={79} />
            <Cell num={80} />
          </tr>        

        </tbody>
      </table>
      <table>
        <tbody>

          <button className="reset-button">X wins : {numOfWins_X}</button>
          <button className="reset-button-space">{' '}</button>
          <button className="reset-button">O wins : {numOfWins_O}</button>
          <button className="reset-button-space">{' '}</button>
          <button className="reset-button">Draws : {numOfDraws}</button>
        </tbody>
      </table>
      <button className="reset-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
