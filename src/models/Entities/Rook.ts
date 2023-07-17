import { Cell } from "../Cell";
import { Colors } from "../ColorModels";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../ui/assets/black_figures/Chess_Rook_black.svg';
import whiteLogo from '../../ui/assets/white_figures/Chess_Rook_white.svg';

export class Rook extends Figure {

    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;
        if (this.cell.isEmptyVertical(target))
            return true;
        if (this.cell.isEmptyHorizontal(target))
            return true;
        return false
    }

    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}