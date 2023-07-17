import { Cell } from "../Cell";
import { Colors } from "../ColorModels";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../ui/assets/black_figures/Chess_king_black.svg';
import whiteLogo from '../../ui/assets/white_figures/Chess_king_white.svg';

export class King extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING;
    }
    canMove(target: Cell): boolean {
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const diagonal: boolean = (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) // диагональ
            && (target.y === this.cell.y + direction || target.y === this.cell.y - direction);
        const horizontal: boolean = (target.x === this.cell.x + direction || target.x === this.cell.x - direction)
            && (target.y === this.cell.y);
        const vertical: boolean = (target.x === this.cell.x)// вперед и наазд
            && (target.y === this.cell.y + direction || target.y === this.cell.y - direction);
        const isTargetMove = (param: boolean) => {
            if (param && ((this.cell.board.getCells(target.x, target.y).isEmpty() || this.cell.isEnemy(target)) && !this.targetsIsUnderattack?.includes(target))) {
                return true
            }
        }

        if (this.cell.castling(this.isFirstStep, target)) { this.castling = true; return true }
        if (!super.canMove(target)) {
            return false;
        }
        if (isTargetMove(diagonal)) return true
        if (isTargetMove(horizontal)) return true
        if (isTargetMove(vertical)) return true

        return false;
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}