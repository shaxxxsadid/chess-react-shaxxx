import { Cell } from "../Cell";
import { Colors } from "../ColorModels";
import logo from "../../ui/assets/black_figures/Chess_Queen_black.svg";

export enum FigureNames {
    KING = 'Король',
    QUEEN = 'Королева',
    BISHOP = 'Слон',
    PAWN = 'Пешка',
    ROOK = 'Ладья',
    KNIGHT = 'Конь',
    FIGURE = 'Фигура',

}

export class Figure {
    color: Colors;
    name: FigureNames;
    cell: Cell;
    logo: typeof logo | null;
    targetsIsUnderattack: any[];
    id: number;
    isKingUderattack: boolean;
    сheckmate: number;
    castling: boolean;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE
        this.id = Math.random()
        this.targetsIsUnderattack = []
        this.isKingUderattack = false
        this.сheckmate = 0
        this.castling = false
    }

    canMove(target: Cell): boolean {

        if (this.isKingUderattack && this.cell.figure?.name !== FigureNames.KING) {
            return false
        }

        if (target.figure?.color === this.color)
            return false


        return true;
    }

    moveFigure(target: Cell) { }
}