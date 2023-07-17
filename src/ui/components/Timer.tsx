import React, { FC, useState, useRef, useEffect } from 'react';
import { Player } from '../../models/Player';
import { Colors } from '../../models/ColorModels';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
    isRestarted: boolean;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart, isRestarted }) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
        if (isRestarted) handleRestart()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev > 0 ? prev - 1 : 0)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev > 0 ? prev - 1 : 0)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()
    }

    return (
        <div className='Timer'>
            <div className="container">
                <h2>Черные - {blackTime}</h2>
                <div className='TimerButton' onClick={handleRestart}>
                        Restart game
                </div>
                <h2>Белые - {whiteTime}</h2>
            </div>
            <div className={['box Timerbox',
                ((currentPlayer?.color === Colors.WHITE && whiteTime === 0)
                    || (currentPlayer?.color === Colors.BLACK && blackTime === 0)) ? "visible" : ""].join(" ")}>
                <div className="Check Timerbox">{`Игрок ${currentPlayer?.color} проиграл по истечению времени`}</div>
                <div className='LostButton' onClick={handleRestart}>
                    Restart game
                </div>
            </div>

        </div>
    );
};



export default Timer;