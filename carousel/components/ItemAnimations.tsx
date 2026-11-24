import { CSSProperties } from 'react';
import { CarouselAnimType } from '../utils';

export function getAnimation(
    animName: CarouselAnimType,
    index: number,
    currentIndex?: number,
    nextIndex?: number,
) {
    if (index == 1) console.log(index, currentIndex, nextIndex);

    if (
        animName == 'slide' &&
        currentIndex != undefined &&
        nextIndex != undefined
    ) {
        if (
            ((currentIndex > nextIndex + 1 && nextIndex == 0) ||
                currentIndex < nextIndex) &&
            (currentIndex != 0 || nextIndex == 1)
        ) {
            if (nextIndex == index) return nextSlideAnimationFromRight;
            return slideAnimationFromRight;
        }
        if (nextIndex == index) return nextSlideAnimationFromLeft;
        return slideAnimationFromLeft;
    }

    if (animName == 'fade') {
        if (nextIndex == index) return nextFadeAnimation;
        return fadeAnimation;
    }

    return slideAnimationFromRight;
}

const slideAnimationFromRight = {
    begin: { left: '0%' } as CSSProperties,
    end: { left: '-100%' } as CSSProperties,
};

const nextSlideAnimationFromRight = {
    begin: { left: '100%' } as CSSProperties,
    end: { left: '0%' } as CSSProperties,
};

const slideAnimationFromLeft = {
    begin: { right: '0%' } as CSSProperties,
    end: { right: '-100%' } as CSSProperties,
};

const nextSlideAnimationFromLeft = {
    begin: { right: '100%' } as CSSProperties,
    end: { right: '0%' } as CSSProperties,
};

const fadeAnimation = {
    begin: { opacity: '100%' } as CSSProperties,
    end: { opacity: '0%' } as CSSProperties,
};

const nextFadeAnimation = {
    begin: { opacity: '0%' } as CSSProperties,
    end: { opacity: '100%' } as CSSProperties,
};
