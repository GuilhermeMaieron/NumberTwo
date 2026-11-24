'use client';
import {
    cloneElement,
    HTMLAttributes,
    ReactElement,
    ReactNode,
    useEffect,
    useId,
    useState,
} from 'react';
import scss from '../carousel.module.scss';
import {
    CarouselContext,
    CarouselContextType,
    carouselCtxDefault,
} from '../context';
import {
    CarouselAnimType,
    carouselDataDivId,
    CarouselItemProps,
    carouselJumpButtonID,
    carouselNext,
    carouselNextButtonID,
    carouselPreviousButtonID,
    checkMaxIndex,
    kidType,
} from '../utils';
import { carouselItemDisplayName } from './Item';

export type CarouselRootProps = HTMLAttributes<HTMLDivElement> & {
    children?: ReactNode;
    interval?: number;
    id?: string;
    animationType?: CarouselAnimType;
    animationDuration?: number;
};

export function Root({
    children,
    className,
    id,
    animationType,
    animationDuration,
    interval,
    ...props
}: CarouselRootProps) {
    const childsArr = [children].flat(Infinity) as ReactElement[];
    const thisId = useId();
    const [contextInfo, setContextInfo] = useState<CarouselContextType>({
        ...carouselCtxDefault,
        id: id ? id : thisId,
        itemCount: children ? checkMaxIndex(childsArr) : 0,
        animationDuration: animationDuration
            ? animationDuration
            : carouselCtxDefault.animationDuration,
        animationType: animationType
            ? animationType
            : carouselCtxDefault.animationType,
    });

    useEffect(() => {
        if (interval) {
            const timer = setInterval(() => {
                carouselNext(contextInfo.id);
            }, interval);

            return () => clearInterval(timer);
        }
    }, []);

    function nextStep() {
        if (!children || contextInfo.nextIndex != undefined) return;
        let nextIndex = 0;
        if (contextInfo.currentIndex + 1 > contextInfo.itemCount - 1) {
            nextIndex = 0;
            setContextInfo({
                ...contextInfo,
                nextIndex: nextIndex,
                animationProgress: 0,
            });
        } else {
            nextIndex = contextInfo.currentIndex + 1;
            setContextInfo({
                ...contextInfo,
                nextIndex: nextIndex,
                animationProgress: 0,
            });
        }

        setTimeout(() => {
            setContextInfo({
                ...contextInfo,
                nextIndex: undefined,
                currentIndex: nextIndex,
            });
        }, contextInfo.animationDuration + 10);
    }

    function previousStep() {
        if (!children || contextInfo.nextIndex != undefined) return;
        let nextIndex = 0;
        if (contextInfo.currentIndex - 1 < 0) {
            nextIndex = contextInfo.itemCount - 1;
            setContextInfo({
                ...contextInfo,
                nextIndex: nextIndex,
                animationProgress: 0,
            });
        } else {
            nextIndex = contextInfo.currentIndex - 1;
            setContextInfo({
                ...contextInfo,
                nextIndex: nextIndex,
                animationProgress: 0,
            });
        }

        setTimeout(() => {
            setContextInfo({
                ...contextInfo,
                nextIndex: undefined,
                currentIndex: nextIndex,
            });
        }, contextInfo.animationDuration + 10);
    }

    function jumpToStep(step: number) {
        if (
            step == contextInfo.currentIndex ||
            contextInfo.nextIndex != undefined
        )
            return;

        setContextInfo({
            ...contextInfo,
            nextIndex: step,
            animationProgress: 0,
        });

        setTimeout(() => {
            setContextInfo({
                ...contextInfo,
                nextIndex: undefined,
                currentIndex: step,
            });
        }, contextInfo.animationDuration + 10);
    }

    function jumpClick() {
        const dataDiv = document.getElementById(carouselDataDivId);
        if (!dataDiv) return;

        const step = JSON.parse(
            dataDiv.getAttribute('step') as string,
        ) as number;
        dataDiv.remove();

        jumpToStep(step);
    }

    let coisaIndex = 0;

    return (
        <CarouselContext.Provider value={contextInfo}>
            <div className={`${scss.carousel_div} ${className}`} {...props}>
                <div className={`${scss.carousel_items_div}`}>
                    {childsArr?.map((child: ReactElement, index: number) => {
                        const kid = child as kidType;
                        if (!kid) return;

                        if (kid.type?.displayName == carouselItemDisplayName) {
                            coisaIndex += 1;
                            const show =
                                contextInfo.nextIndex == coisaIndex - 1 ||
                                contextInfo.currentIndex == coisaIndex - 1;
                            if (!show) return '';
                            return cloneElement(child as ReactElement<CarouselItemProps>, {
                                index: coisaIndex - 1,
                                key: `${index}_${contextInfo.id}_it_ch1ld`,
                            });
                        }

                        return '';
                    })}
                </div>

                {childsArr?.map((child: ReactElement, index: number) => {
                    const kid = child as kidType;
                    if (!kid) return;

                    if (kid.type?.displayName == carouselItemDisplayName)
                        return '';

                    return cloneElement(child, {
                        key: `${index}_${contextInfo.id}_ab2ch1ld`,
                    });
                })}
            </div>

            <button
                onClick={nextStep}
                id={`${carouselNextButtonID}${contextInfo.id}`}
                className={scss.dummy_botao}
            />
            <button
                onClick={previousStep}
                id={`${carouselPreviousButtonID}${contextInfo.id}`}
                className={scss.dummy_botao}
            />
            <button
                onClick={jumpClick}
                id={`${carouselJumpButtonID}${contextInfo.id}`}
                className={scss.dummy_botao}
            />
        </CarouselContext.Provider>
    );
}
