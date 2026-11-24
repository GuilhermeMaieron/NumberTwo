'use client';
import { useContext } from 'react';
import scss from '../carousel.module.scss';
import { CarouselContext } from '../context';
import { carouselNext, carouselPrevious } from '../utils';
export const carouselItemDisplayName = 'CarouselItem';

type ButtonsProps = {
    noLoop?: boolean;
};

export const Buttons = ({ noLoop }: ButtonsProps) => {
    const ctx = useContext(CarouselContext);

    return (
        <>
            {noLoop && ctx.currentIndex == 0 ? (
                ''
            ) : (
                <button
                    className={`${scss.ctrl_prev_btn} ${scss.ctrl_btn}`}
                    onClick={() => {
                        carouselPrevious(ctx.id);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                    </svg>
                </button>
            )}

            {noLoop && ctx.currentIndex == ctx.itemCount - 1 ? (
                ''
            ) : (
                <button
                    className={`${scss.ctrl_next_btn} ${scss.ctrl_btn}`}
                    onClick={() => {
                        carouselNext(ctx.id);
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                    >
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </button>
            )}
        </>
    );
};
