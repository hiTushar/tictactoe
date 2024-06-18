import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Start from './pages/start/Start'
import Game from './pages/game/Game'
import Over from './pages/over/Over';
import { TurnProvider } from './context/TurnContext';

function App() {
  return (
    <div className='app'>
      <TurnProvider>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path='/game' element={<Game />} />
          <Route path='/over' element={<Over />} />
        </Routes>
      </TurnProvider>
    </div>
  )
}

export default App
