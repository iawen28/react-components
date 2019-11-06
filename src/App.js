import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe'

function App() {
  return (
    <div className="App">
      <TicTacToe gamesize="48vw" bgcolor="#3A6162" gamecolor="#A1C3AF" heading="Tic Tac Toe" />
    </div>
  );
}

export default App;