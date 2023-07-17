import React, { FC, useState, useEffect } from 'react';
import { Board } from '../../models/Board';
import CellsComponent from './CellsComponent';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';
import { Colors } from '../../models/ColorModels';
import { FigureNames } from '../../models/Entities/Figure';

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    switchPlayer: () => void
    restart: (click: boolean) => void
    setIsRestard: React.Dispatch<React.SetStateAction<boolean>>
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, switchPlayer, restart, setIsRestard }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)
    const [isAttacked, setIsAttacked] = useState<boolean>(false)
    const [isCheckmate, setIsCheckmate] = useState<boolean>(false)
    useEffect(() => {
        highLightCell()
    }, [selectedCell])
    useEffect(() => {

    }, [currentPlayer])

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            board.KingUderattack(false, currentPlayer)
            selectedCell.moveFigure(cell);
            switchPlayer()
            setSelectedCell(null);
            if (selectedCell.figure?.name === FigureNames.KING) selectedCell.figure.isKingUderattack = false
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
        if (cell.figure) {
            cell.figure.targetsIsUnderattack = cell.whichCellsIsUnderAttack(cell, cell.figure.name)
            console.log(cell.figure.targetsIsUnderattack)
            console.log(selectedCell?.isKingSurrender(selectedCell, cell.figure.targetsIsUnderattack))

        }
        const kingSurrender = cell.figure ? selectedCell?.isKingSurrender(selectedCell, cell.figure.targetsIsUnderattack) : ""
        if (cell.figure?.targetsIsUnderattack?.includes(cell.getKingCell(cell)) && cell.figure.name !== FigureNames.KING && kingSurrender?.length === 0 && cell.figure.color === currentPlayer?.color) {
            setIsCheckmate(true)
            return;
        }
        if (cell.figure?.targetsIsUnderattack?.includes( cell.getKingCell(cell)) && cell.figure.name !== FigureNames.KING && cell.figure.color === currentPlayer?.color) {
            setIsAttacked(true)
            board.KingUderattack(true, currentPlayer)
            setInterval(() => setIsAttacked(false), 2000)
        }

    }

    function highLightCell() {
        board.highLightCell(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div className='boardBox'>
            <h3 className='playerTurn'>Ход игрока: {currentPlayer?.color === Colors.WHITE ? "Белый игрок" : "Черный игрок"}</h3>
            <div className='board'>
                {board.cells.map((row, index) =>
                    < React.Fragment key={index} >
                        {
                            row.map(cell =>
                                <CellsComponent
                                    click={click}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            )
                        }
                    </React.Fragment>
                )
                }
                <div className={["box", isAttacked ? "visible" : ""].join(" ")}>
                    <div className="Check">
                        {`Игроку ${currentPlayer?.color} поставлен Шах`}
                    </div>
                </div>
                <div className={["box", "lostGame", isCheckmate ? "visible" : ""].join(" ")}>
                    <div className="Checkmate">
                        {`Игроку ${currentPlayer?.color} поставлен Шах и Мат`}
                    </div>
                    <div
                        className='LostButton'
                        onClick={
                            () => {
                                setIsCheckmate(false)
                                restart(true)
                                setIsRestard(true)
                            }
                        }>
                        Новая игра
                    </div>
                </div>
            </div >
        </div>
    );
};

export default BoardComponent;