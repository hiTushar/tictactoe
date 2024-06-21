import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Start from './pages/start/Start'
import Game from './pages/game/Game'
import Over from './pages/over/Over';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <div className='app'>
      <GameProvider>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/game' element={<Game />} />
          <Route path='/over' element={<Over />} />
        </Routes>
      </GameProvider>
    </div>
  )
}

export default App
