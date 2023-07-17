import { Board } from "./Board";
import { Colors } from "./ColorModels";
import { Figure, FigureNames } from "./Entities/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    availble: boolean; // Доступна ли ячейка
    id: number;
    kingAttack: boolean;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.availble = false;
        this.id = Math.random()
        this.kingAttack = false;
    }

    getKingCell(target: Cell){
        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if ((cell.figure?.name === FigureNames.KING) && target.figure?.color !== cell.figure?.color)
                    return cell;
            }
        }
    }

    isKingSurrender(target: Cell, attackedTargets: Cell[]) {
        const arrAliveKing: Cell[] = []
        const Kingcell = this.getKingCell(target)
        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (Kingcell?.figure?.canMove(cell) && !attackedTargets.includes(cell)) {
                    arrAliveKing.push(cell)
                }
            }
        }
        return arrAliveKing
    }


    whichCellsIsUnderAttack(target: Cell, kingAlarm: FigureNames): Cell[] {
        const arr: Cell[] = [];

        for (let i = 0; i < this.board.cells.length; i++) {
            const row = this.board.cells[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                const direction = cell.figure?.color === Colors.BLACK ? 1 : -1
                const isKingAlarm = kingAlarm === FigureNames.KING ?
                    target.figure?.color !== cell.figure?.color && cell.figure
                    : target.figure?.color === cell.figure?.color && cell.figure

                if (isKingAlarm) {
                    switch (cell.figure?.name) {
                        case FigureNames.PAWN:
                            const attackCell: Cell = (cell.y > 0 && cell.y < 7) ? this.board.getCells(cell.x + direction, cell.y + direction) : this.board.getCells(cell.x, cell.y)
                            const attackCell1: Cell = (cell.y > 0 && cell.y < 7) ? this.board.getCells(cell.x - direction, cell.y + direction) : this.board.getCells(cell.x, cell.y)
                            if (!arr.includes(attackCell) && attackCell && (!cell.figure.canMove(target))) arr.push(attackCell)
                            if (!arr.includes(attackCell1) && attackCell1 && (!cell.figure.canMove(target))) arr.push(attackCell1)
                            break;
                        case FigureNames.QUEEN:
                            const queenAttack: Cell[] = figureAttack(cell, this.board.cells)
                            queenAttack.forEach(item => {
                                if (!arr.includes(item)) arr.push(item)
                            })
                            break;
                        case FigureNames.BISHOP:
                            const bishopAttack: Cell[] = figureAttack(cell, this.board.cells)
                            bishopAttack.forEach(item => {
                                if (!arr.includes(item)) arr.push(item)
                            })
                            break;
                        case FigureNames.KNIGHT:
                            const knightAttack: Cell[] = figureAttack(cell, this.board.cells)
                            knightAttack.forEach(item => {
                                if (!arr.includes(item)) arr.push(item)
                            })
                            break;
                        case FigureNames.ROOK:
                            const rookAttack: Cell[] = figureAttack(cell, this.board.cells)
                            rookAttack.forEach(item => {
                                if (!arr.includes(item)) arr.push(item)
                            })
                            break;
                    }
                }
            }
        }

        function figureAttack(cell: Cell, targets: Cell[][]): Cell[] {
            const isArrPush = (param: boolean, target: Cell) => {
                if (cell?.figure?.canMove(target)
                    && param
                    && (!arr.includes(target)))
                    arr.push(target)
            }
            const arr: Cell[] = [];
            for (let i = 0; i < targets.length; i++) {
                const row = targets[i];
                for (let j = 0; j < row.length; j++) {
                    const target = row[j];
                    const dx = Math.abs(cell.x - target.x);
                    const dy = Math.abs(cell.y - target.y);
                    switch (cell.figure?.name) {
                        case FigureNames.QUEEN:
                            isArrPush((cell.isEmptyVertical(target) || cell.isEmptyDiagonal(target) || cell.isEmptyHorizontal(target)), target)
                            break;
                        case FigureNames.BISHOP:
                            isArrPush(cell.isEmptyDiagonal(target), target)
                            break;
                        case FigureNames.ROOK:
                            isArrPush((cell.isEmptyVertical(target) || cell.isEmptyHorizontal(target)), target)
                            break;
                        case FigureNames.KNIGHT:
                            isArrPush((dx === 1 && dy === 2) || (dx === 2 && dy === 1), target)
                            break;
                    }
                }
            }
            return arr
        }
        return arr;
    }

    isEmpty(): boolean {
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure && (target.figure?.name !== FigureNames.KING)) {
            return this.figure?.color !== target.figure.color
        }
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);
        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCells(this.x, y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);
        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCells(x, this.y).isEmpty()) {
                return false
            }
        }
        return true;
    }

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absY !== absX)
            return false;

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCells(this.x + dx * i, this.y + dy * i).isEmpty())
                return false;
        }
        return true;
    }

    castling(isFirstStep: boolean, target: Cell): boolean {
        if (target.figure?.name === FigureNames.ROOK && (isFirstStep && this.isEmptyHorizontal(target) && !this.isEnemy(target)))
            return true
        return false
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
            ? this.board.lostBlackFigure.push(figure)
            : this.board.lostWhiteFigure.push(figure)
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target)
            if (this.figure.name === FigureNames.PAWN && ((target.y === 0 && this.figure.color === Colors.WHITE) || (target.y === 7 && this.figure.color === Colors.BLACK))) {
                console.log(this.board.pawnPromotion(this.figure.color, target))
                target.setFigure(this.board.pawnPromotion(this.figure.color, target))
                this.figure = null;
                return
            }
            if (this.figure.castling && target.figure?.name === FigureNames.ROOK) {
                const cell = target.x === 0 ? this.board.getCells(target.x + 2, target.y) : this.board.getCells(target.x - 1, target.y)
                const cellRook = target.x === 0 ? this.board.getCells(this.x - 1, this.y) : this.board.getCells(this.x + 1, this.y)
                const figure = target.figure
                cell.setFigure(this.figure);
                target.figure = null
                cellRook.setFigure(figure);
                this.figure = null
                return
            } else {
                if (target.figure) this.addLostFigure(target.figure)
                target.setFigure(this.figure);
                this.figure = null;
            }

        }
    }
}