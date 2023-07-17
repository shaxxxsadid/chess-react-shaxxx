import { Cell } from "./Cell"
import { Colors } from "./ColorModels";
import { Bishop } from "./Entities/Bishop";
import { Figure } from "./Entities/Figure";
import { King } from "./Entities/King";
import { Knight } from "./Entities/Knight";
import { Pawn } from "./Entities/Pawn";
import { Queen } from "./Entities/Queen";
import { Rook } from "./Entities/Rook";
import { Player } from "./Player";

export class Board {
  cells: Cell[][] = []
  lostBlackFigure: Figure[] = [];
  lostWhiteFigure: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = []
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)) // Черные ячейки
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)) // белые
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostBlackFigure = this.lostBlackFigure;
    newBoard.lostWhiteFigure = this.lostWhiteFigure;
    return newBoard;
  }

  public highLightCell(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.availble = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  public KingUderattack(isAttack: boolean, currentPlayer: Player | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        if (target.figure && (target.figure.color !== currentPlayer?.color)) isAttack ?
          target.figure.isKingUderattack = true
          : target.figure.isKingUderattack = false
      }
    }
  }

  public getCells(x: number, y: number) {
    return this.cells[y][x]
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.BLACK, this.getCells(i, 1))
      new Pawn(Colors.WHITE, this.getCells(i, 6))
    }
  }

  public pawnPromotion (color: Colors, cell: Cell) {
    return new Queen(color, this.getCells(cell.x, cell.y))
  }

  private addKings() {
    new King(Colors.BLACK, this.getCells(4, 0))
    new King(Colors.WHITE, this.getCells(4, 7))
  }

  private addQueens() {
    new Queen(Colors.BLACK, this.getCells(3, 0))
    new Queen(Colors.WHITE, this.getCells(3, 7))
  }

  private addBishops() {
    new Bishop(Colors.BLACK, this.getCells(2, 0))
    new Bishop(Colors.BLACK, this.getCells(5, 0))
    new Bishop(Colors.WHITE, this.getCells(2, 7))
    new Bishop(Colors.WHITE, this.getCells(5, 7))
  }

  private addKnights() {
    new Knight(Colors.BLACK, this.getCells(1, 0))
    new Knight(Colors.BLACK, this.getCells(6, 0))
    new Knight(Colors.WHITE, this.getCells(1, 7))
    new Knight(Colors.WHITE, this.getCells(6, 7))
  }

  private addRooks() {
    new Rook(Colors.BLACK, this.getCells(0, 0))
    new Rook(Colors.BLACK, this.getCells(7, 0))
    new Rook(Colors.WHITE, this.getCells(0, 7))
    new Rook(Colors.WHITE, this.getCells(7, 7))
  }

  public addFigures() {
    this.addPawns()
    this.addKnights()
    this.addKings()
    this.addBishops()
    this.addQueens()
    this.addRooks()
  }
}
