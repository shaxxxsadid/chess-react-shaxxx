import React, { FC } from 'react';
import { Figure } from '../../models/Entities/Figure';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
    return (
        <div className='lostFigure'>
            <h3 className='lostTitle'>{title}</h3>
            <div className='figureTable'>
                {figures.map(figures =>
                    <div className='Figure' key={figures.id}>
                        <div className='titleFigure'>{figures.name}</div> {figures.logo && <img width={40} height={40} src={figures.logo} alt='' />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LostFigures;