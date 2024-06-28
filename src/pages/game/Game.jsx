import React, { useContext, useEffect, useRef, useState } from 'react'
import './Game.css';
import { GameContext } from '../../context/GameContext';
import { x, o, board3, board4, playArea, border, button } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import lunchTime from '../../assets/audio/lunchTime.mp3';
import woodHit from '../../assets/audio/woodHit.mp3';

const gameInitState = [null, null, null, null, null, null, null, null, null];
// const ROW_LENGTH = 3;
// let turnPt = {
//     'x': -1,
//     'o': 1
// }

const Game = () => {
    const { turn, turnNext, winner, winnerFound } = useContext(GameContext);
    const [board, setBoard] = useState(gameInitState);
    const turnCount = useRef(0);
    const navigate = useNavigate();
    let lunchTimeSound = useRef(new Audio(lunchTime));
    let woodHitSound = useRef(new Audio(woodHit));
    let xoRef = useRef(null);
    let winSequenceRef = useRef([null, null, null, null, null, null, null, null]);

    useEffect(() => {
        lunchTimeSound.current.play();
        lunchTimeSound.current.loop = true;
    }, [])

    useEffect(() => {
        if (turnCount.current > 0) {
            checkWinner(board);
        }
    }, [board])

    const drawGrid = (board) => {
        return (
            board.map((cell, idx) => (
                <div key={idx} className={`op-map__cell ${cell !== null ? 'disable' : ''}`} onClick={cell === null ? () => putMark(idx) : null}>
                    {cell === null ? null : <img src={cell === 'x' ? x : o} alt={'mark'} ref={xoRef} />}
                </div>
            ))
        )
    }

    const putMark = (index) => {
        turnCount.current++;
        woodHitSound.current.play();
        setBoard(prev => {
            const newBoard = [...prev];
            newBoard[index] = turn;
            return newBoard;
        })
    }

    const checkWinner = (newBoard) => {
        // let rowMatch = 0, colMatch = 0, diag1Match = 0, diag2Match = 0;
        // for(let i = 0; i < ROW_LENGTH ; i++) {
        //     if(board[i] === '') continue;
        //     diag1Match += turnPt[board[(ROW_LENGTH + 1) * i]];
        //     diag2Match += turnPt[board[(ROW_LENGTH - 1) * (i + 1)]];

        //     rowMatch = 0;
        //     colMatch = 0;
        //     for(let j = 0; j < ROW_LENGTH; j++) {
        //         rowMatch += turnPt[board[i * ROW_LENGTH + j]];
        //         colMatch += turnPt[board[j * ROW_LENGTH + i]];
        //     }

        //     if(rowMatch === ROW_LENGTH || colMatch === ROW_LENGTH || diag1Match === ROW_LENGTH || diag2Match === ROW_LENGTH) {
        //         setWinner('x');
        //     }
        //     else if(rowMatch === -ROW_LENGTH || colMatch === -ROW_LENGTH || diag1Match === -ROW_LENGTH || diag2Match === -ROW_LENGTH) {
        //         setWinner('o');
        //     }
        // }
        let Row1 = newBoard[0] && newBoard[0] === newBoard[1] && newBoard[1] === newBoard[2];
        let Row2 = newBoard[3] && newBoard[3] === newBoard[4] && newBoard[4] === newBoard[5];
        let Row3 = newBoard[6] && newBoard[6] === newBoard[7] && newBoard[7] === newBoard[8];
        let Col1 = newBoard[0] && newBoard[0] === newBoard[3] && newBoard[3] === newBoard[6];
        let Col2 = newBoard[1] && newBoard[1] === newBoard[4] && newBoard[4] === newBoard[7];
        let Col3 = newBoard[2] && newBoard[2] === newBoard[5] && newBoard[5] === newBoard[8];
        let Diag1 = newBoard[0] && newBoard[0] === newBoard[4] && newBoard[4] === newBoard[8];
        let Diag2 = newBoard[2] && newBoard[2] === newBoard[4] && newBoard[4] === newBoard[6];
        winSequenceRef.current = [Row1, Row2, Row3, Col1, Col2, Col3, Diag1, Diag2];

        if (Row1 || Row2 || Row3 || Col1 || Col2 || Col3 || Diag1 || Diag2) {
            setTimeout(() => {
                winnerFound(turn);
            }, 1000)
            lunchTimeSound.current.pause();
            stopBoardAnimation();
            strikeThrough(winSequenceRef.current);

        }
        else if (turnCount.current === 9) {
            winnerFound('draw');
            lunchTimeSound.current.pause();
            stopBoardAnimation();
        }
        else {
            turnNext(turn === 'x' ? 'o' : 'x');
        }
    }

    const resetGame = () => {
        setBoard(gameInitState);
        turnCount.current = 0;  
        turnNext('x');
        winnerFound(null);
        navigate('/');
    }

    const stopBoardAnimation = () => {
        let board = document.getElementsByClassName('op-board__play')[0];
        board.style.animationPlayState = 'paused';
        board.style.transform = 'translate(-50%, -50%)';

        let allCells = Array.from(document.getElementsByClassName('op-map__cell'));
        for(let i = 0; i < allCells.length; i++) {
            if(allCells[i].classList.contains('disable')) {
                allCells[i].querySelector('img').style.animationPlayState = 'paused';
            }
        }

        let turnIndicator = document.getElementsByClassName('op-turn__option')[0];
        turnIndicator.style.animationPlayState = 'paused';
    }   

    const strikeThrough = (sequence) => {
        
    }

    return (
        <div className='op-game'>
            {
                winner && (
                    <div className='op-game__winner'>
                        <div className='op-winner__board'>
                            <div className='op-board__img'>
                                <img src={board4} alt='board4' />
                                <img src={border} alt='border' />
                            </div>
                            <div className={`op-body__icon ${winner === 'draw' ? 'hide' : ''}`}>
                                <img src={winner === 'x' ? x : o} alt={'winner'} />
                            </div>
                            <div className='op-body__text'>
                                {
                                    winner !== 'draw' ? (
                                        <>
                                            is the<br /> winner
                                        </>
                                    )  : (
                                        <>
                                            It's a Draw!!
                                        </>
                                    )

                                }
                            </div>
                            <div className='op-body__button' onClick={resetGame}>
                                <img src={button} alt={'button'} />
                            </div>

                        </div>
                    </div>
                )
            }
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
