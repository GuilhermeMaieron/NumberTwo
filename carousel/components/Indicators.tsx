'use client';
export const carouselItemDisplayName = 'CarouselItem';
import { useContext } from 'react';
import scss from '../carousel.module.scss';
import { CarouselContext } from '../context';
import { carouselJumpToStep } from '../utils';

type IndicatorsProps = {
    data?: unknown;
};

export const Indicators = ({}: IndicatorsProps) => {
    const ctx = useContext(CarouselContext);

    return (
        <div className={`${scss.indicators_div}`}>
            {Array(ctx.itemCount)
                .fill(0)
                .map((i: number, index: number) => {
                    return (
                        <button
                            key={`${index}_botao1ndic4t0r_${i}`}
                            onClick={() => {
                                carouselJumpToStep(ctx.id, index);
                            }}
                            className={`${scss.indicator_btn} ${ctx.currentIndex == index ? scss.selected : ''}`}
                        ></button>
                    );
                })}
        </div>
    );
};
