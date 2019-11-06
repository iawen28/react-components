import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

function TicTacToe(props) {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [winner, declareWinner] = useState(undefined);
  const [player, changePlayer] = useState(0);
  const [positions, setPos] = useState([[], []]);
  const playerClass = ['x-char', 'o-char'];
  const players = ['X', 'O'];
  const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

  const handleClick = (i, player) => {
    let b1 = [...board];
    if (winner || b1[i] !== '') {
      return;
    }
    b1[i] = playerClass[player];
    setBoard(b1);
    let p1 = [...positions];
    p1[player].push(i);
    setPos(p1);
    findWinner(b1, p1[player]).then((msg) => {
      if (msg !== 'Game over') {
        player === 0 ? changePlayer(1) : changePlayer(0);
      } else {
        setTimeout(clearBoard, 2000);
      }
    });
  }

  const findWinner = async (board, xo) => {
    for (let i=0; i<winningCombos.length; i++) {
      for (let j=0; j<3; j++) {
        if (!xo.includes(winningCombos[i][j])) {
          break;
        } else if (j === 2) {
          declareWinner(players[player] + ' won!');
          return "Game over";
        }
      }
    }
    if (board.indexOf('') === -1) {
      declareWinner('It\'s a tie!');
      return "Game over";
    }
  }

  const clearBoard = () => {
    changePlayer(0);
    setBoard(['', '', '', '', '', '', '', '', '']);
    setPos([[],[]]);
    declareWinner(undefined);
  }

  return (
    <div className="ttt-container" style={{
      width: props.gamesize || '100%', 
      backgroundColor: props.bgcolor || 'black', 
      color: props.gamecolor || 'white' 
    }}>
      {!props.heading || <h1>{props.heading}</h1> }
      <h2>{winner || players[player] + "'s turn"}</h2>
      <div className="board">
        {
          board.map((item, i) => {
            return <div style={{backgroundColor: props.gamecolor || 'white'}} 
              className={board[i] + " tile"} 
              key={i} 
              onClick={(e) => {
                handleClick(i, player);
              }}
            >
              <span style={{backgroundColor: props.bgcolor || 'black'}}/>
            </div>;  
          })
        }
      </div>
    </div>
  );
}

export default TicTacToe;
