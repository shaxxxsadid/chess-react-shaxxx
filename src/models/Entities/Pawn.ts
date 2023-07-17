import { Cell } from "../Cell";
import { Colors } from "../ColorModels";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../ui/assets/black_figures/Chess_pawn_black.svg';
import whiteLogo from '../../ui/assets/white_figures/Chess_pawn_white.svg';

export class Pawn extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN;
    }
    canMove(target: Cell): boolean {
        const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1
        const firstStepDirection = this.cell.figure?.color === Colors.BLACK ? 2 : -2
        if (!super.canMove(target)) {
            return false;
        }

        if ((target.y === this.cell.y + direction || this.isFirstStep
            && (target.y === this.cell.y + firstStepDirection))
            && target.x === this.cell.x
            && this.cell.board.getCells(target.x, target.y).isEmpty()) {
            return true;
        }

        if (target.y === this.cell.y + direction
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)) {
            return true;
        }

        return false;
    }



    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}