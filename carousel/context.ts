import { createContext } from 'react';
import { CarouselAnimType } from './utils';

export type CarouselContextType = {
    currentIndex: number;
    nextIndex?: number;
    animationProgress?: number;
    animationType: CarouselAnimType;
    animationDuration: number;
    itemCount: number;
    skipProgress?: number;
    id: string;
};

export const carouselCtxDefault: CarouselContextType = {
    currentIndex: 0,
    nextIndex: undefined,
    animationProgress: undefined,
    animationType: 'slide',
    animationDuration: 1000,
    itemCount: 0,
    skipProgress: 0,
    id: '',
};

export const CarouselContext =
    createContext<CarouselContextType>(carouselCtxDefault);
