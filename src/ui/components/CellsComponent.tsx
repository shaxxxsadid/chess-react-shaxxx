import { FC, useEffect, useState } from "react";
import { Cell } from "../../models/Cell";
import { FigureNames } from "../../models/Entities/Figure";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}
const CellsComponent: FC<CellProps> = ({ cell, selected, click }) => {

    return (
        <div
            onClick={() => {
                click(cell)
            }}
            className={['cell', cell.color, selected ? 'selected' : '', cell.availble && cell.figure && cell.figure?.name !== FigureNames.KING ? 'enemy' : '', cell.figure?.name === FigureNames.KING && cell.figure.isKingUderattack && cell.figure ? "king" : " "].join(' ')}
        >
            {cell.availble && !cell.figure ? <div className="available"></div> : ""}
            {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
        </div>
    );
};

export default CellsComponent;