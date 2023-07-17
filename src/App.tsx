import React, { useEffect, useState } from 'react';
import './App.css';
import { Board } from './models/Board';
import BoardComponent from './ui/components/BoardComponent';
import { Player } from './models/Player';
import { Colors } from './models/ColorModels';
import LostFigures from './ui/components/LostFigures';
import Timer from './ui/components/Timer';

function App() {
  const [board, setBoard] = useState(new Board)
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [isRestarted, setIsRestarted] = useState<boolean>(false)

  useEffect(() => {
    restart()
  }, [])

  function restart() {
    setIsRestarted(false)
    const newBoard = new Board();
    newBoard.initCells()
    setBoard(newBoard)
    newBoard.addFigures()
    setCurrentPlayer(whitePlayer)
  }

  function switchPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="App">
      <Timer
        isRestarted={isRestarted}
        currentPlayer={currentPlayer}
        restart={restart}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        switchPlayer={switchPlayer}
        setIsRestard={setIsRestarted}
        restart={restart}
      />
      <div className='lostTable'>
        <LostFigures
          title='Потерянные фигуры Черного игрока'
          figures={board.lostBlackFigure}
        />
        <LostFigures
          title='Потерянные фигуры Белого игрока'
          figures={board.lostWhiteFigure}
        />
      </div>
    </div>

  );
}

export default App;
