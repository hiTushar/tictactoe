import { createContext, useState } from "react";

const TurnContext = createContext();

const TurnProvider = ({ children }) => {
  const [turn, setTurn] = useState(null);

  const turnNext = (choice) => {
    if(choice) {
        setTurn(choice);
    }
    else {
        setTurn(turn === 'o' ? 'x' : 'o');
    }
  };

  return (
    <TurnContext.Provider value={{ turn, turnNext }}>
      {children}
    </TurnContext.Provider>
  );
};

export { TurnContext, TurnProvider };
