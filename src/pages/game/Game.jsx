import React, { useContext, useState } from 'react'
import './Game.css';
import { TurnContext } from '../../context/TurnContext';
import { x, o, board3, playArea } from '../../assets/assets';

const gameInitState = ['', '', '', '', '', '', '', '', ''];

const Game = () => {
    const { turn, turnNext } = useContext(TurnContext);
    const [board, setBoard] = useState(gameInitState);

    const drawGrid = (board) => {
        return (
            board.map((cell, idx) => (
                <div key={idx} className={`op-map__cell ${cell !== '' ? 'disable' : ''}`} onClick={cell === '' ? () => putMark(idx) : null}>
                    {cell === '' ? null : <img src={cell === 'x' ? x : o} alt={'mark'} />}
                </div>
            ))
        )
    }

    const putMark = (index) => {
        setBoard(prev => {
            const newBoard = [...prev];
            newBoard[index] = turn;
            return newBoard;
        })

        turnNext(turn === 'x' ? 'o' : 'x');
    }

    console.log(board, turn);
    return (
        <div className='op-game'>
            <div className='op-game__turn'>
                <div className='op-turn__option'>
                    <img src={turn === 'x' ? x : o} alt={'turn'} />
                </div>
            </div>
            <div className='op-game__board'>
                <div className='op-board__base'>
                    <img src={board3} alt={'board3'} />
                </div>
                <div className='op-board__play'>
                    <div className='op-play__image'>
                        <img src={playArea} alt={'playArea'} />
                    </div>
                    <div className='op-play__map'>
                        {drawGrid(board)}
                    </div>
                </div>
            </div>
            <div className='op-game__logo'></div>
        </div>
    )
}

export default Game
