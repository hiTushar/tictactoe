import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Start.css';
import { notch, x, o } from '../../assets/assets';
import { GameContext } from '../../context/GameContext';

const Start = () => {
  const { turnNext } = useContext(GameContext);
  const navigate = useNavigate();

  const startGame = (choice) => {
    turnNext(choice);
    navigate('/game');
  }

  return (
    <div className='mn-start'>
        <div className='mn-start__board1'></div>
        <div className='mn-start__board2'></div>
        <div className='mn-start__text'>
            <div className='mn-start__title'>tic tac toe</div>
            <div className='mn-start__desc'>2 players</div>
        </div>
        <div className='mn-start__action'>
            <div className='mn-action__text'>pick your lucky charm</div>
            <div className='mn-action__button'>
                <div className='mn-button__notch'>
                    <img src={notch} alt='notch' />
                </div>
                <div className='mn-button__select'>
                    <div className='mn-select__opt' onClick={() => startGame('x')}>
                        <img src={x} alt='x' />
                    </div>
                    <div className='mn-select__opt' onClick={() => startGame('o')}>
                        <img src={o} alt='o' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Start