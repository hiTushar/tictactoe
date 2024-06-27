import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import './Start.css';
import { notch, x, o, board1, board2 } from '../../assets/assets';
import { GameContext } from '../../context/GameContext';
import woodHit from '../../assets/audio/woodHit.mp3';

const Start = () => {
  const { turnNext } = useContext(GameContext);
  const navigate = useNavigate();
  const woodHitSound = new Audio(woodHit);

  const startGame = (choice) => {
    turnNext(choice);
    woodHitSound.play();
    navigate('/game');
  }

  return (
    <div className='mn-start'>
        <div className='mn-start__board1'>
            <img src={board1} alt='board1' />
        </div>
        <div className='mn-start__board2'>
            <img src={board2} alt='board2'/>
        </div>
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
                    <div className='mn-select__opt x' onClick={() => startGame('x')}>
                        <img src={x} alt='x' />
                    </div>
                    <div className='mn-select__opt y' onClick={() => startGame('o')}>
                        <img src={o} alt='o' />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Start