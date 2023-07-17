import { Cell } from "../Cell";
import { Colors } from "../ColorModels";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../ui/assets/black_figures/Chess_bishop_black.svg';
import whiteLogo from '../../ui/assets/white_figures/Chess_bishop_white.svg';

export class Bishop extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false;
        }
        if(this.cell.isEmptyDiagonal(target))
          return true;
        return false;
    }
}