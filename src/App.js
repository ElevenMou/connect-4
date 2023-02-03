import React from 'react';
import logo from './logo.svg';
import './App.css';
import GameBoard from './Components/GameBoard';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} className="app-logo" alt="logo" />
        <h1 className="app-title">connect 4</h1>
      </header>
      <main className="app-main">
        <GameBoard />
      </main>
    </div>
  );
}

export default App;
