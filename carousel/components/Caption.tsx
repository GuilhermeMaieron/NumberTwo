'use client';
import { ReactNode, useContext, useState } from 'react';
import scss from '../carousel.module.scss';
import { CarouselContext } from '../context';
export const carouselItemDisplayName = 'CarouselItem';

type CaptionProps = {
    children?: ReactNode;
};

export const captionDisplayName = 'itemCaptionDN';

export const Caption = ({ children }: CaptionProps) => {
    const [hoverBg, setHoverBg] = useState(false);
    const ctx = useContext(CarouselContext);

    return (
        <>
            <div
                className={`${scss.caption_div} ${ctx.nextIndex != undefined ? '' : scss.show_caption}`}
            >
                <div
                    className={`${scss.caption_children_div}`}
                    onMouseEnter={() => {
                        setHoverBg(true);
                    }}
                    onMouseLeave={() => {
                        setHoverBg(false);
                    }}
                >
                    {children}
                </div>
            </div>

            <div
                className={`${scss.caption_bg} ${ctx.nextIndex != undefined ? scss.zero_op : ''} ${hoverBg ? scss.hover : ''}`}
            />
        </>
    );
};

Caption.displayName = captionDisplayName;
