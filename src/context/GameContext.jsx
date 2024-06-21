import { createContext, useState } from "react";

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [turn, setTurn] = useState('x');
  const [winner, setWinner] = useState(null);

  const turnNext = (choice) => {
    if (choice) {
      setTurn(choice);
    }
    else {
      setTurn(turn === 'o' ? 'x' : 'o');
    }
  };

  const winnerFound = (mark) => {
    setWinner(mark);
  }

  return (
    <GameContext.Provider value={{ turn, turnNext, winner, winnerFound }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };
