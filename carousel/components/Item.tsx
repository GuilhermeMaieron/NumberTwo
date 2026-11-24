'use client';
import {
    CSSProperties,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import scss from '../carousel.module.scss';
import { CarouselContext } from '../context';
import { getAnimation } from './ItemAnimations';

export const carouselItemDisplayName = 'CarouselItem';

type CarouselItemProps = {
    children?: ReactNode;
    index?: number;
};

export const Item = ({ children, index }: CarouselItemProps) => {
    if (index == undefined) return <></>;
    const ctx = useContext(CarouselContext);
    const [style, setStyle] = useState<CSSProperties | undefined>(
        getAnimation(ctx.animationType, index, ctx.currentIndex, ctx.nextIndex)
            .begin,
    );

    useEffect(() => {
        if (ctx.nextIndex != undefined) {
            setStyle(
                getAnimation(
                    ctx.animationType,
                    index,
                    ctx.currentIndex,
                    ctx.nextIndex,
                ).begin,
            );

            setTimeout(() => {
                setStyle(
                    getAnimation(
                        ctx.animationType,
                        index,
                        ctx.currentIndex,
                        ctx.nextIndex,
                    ).end,
                );
            }, 100);
        } else {
            setStyle(undefined);
        }
    }, [ctx.nextIndex]);

    return (
        <div
            className={`${scss.item_div} ${ctx.currentIndex == index ? scss.z_grandinho : ''} ${ctx.nextIndex == index ? scss.z_grandao : ''}`}
            style={{
                ...style,
                transition: `all ${ctx.animationDuration / 1000}s ease-in-out`,
            }}
        >
            {children}
        </div>
    );
};

Item.displayName = carouselItemDisplayName;
