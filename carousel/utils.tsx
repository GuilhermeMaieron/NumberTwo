import { ReactElement } from 'react';
import { carouselItemDisplayName } from './components/Item';

export function checkMaxIndex(children: ReactElement[]) {
    let kidCount = 0;

    children.map((child: ReactElement) => {
        const kid = child as kidType;
        if (kid.type?.displayName == carouselItemDisplayName) {
            kidCount += 1;
        }
    });
    return kidCount;
}

export type CarouselAnimType = 'slide' | 'fade';

type typexd = {
    displayName?: string;
};

export type kidType = {
    type?: typexd;
};

export type CarouselItemProps = {
    index?: number;
};

export const carouselNextButtonID = 'n3xtt//__c4rosel';

export const carouselPreviousButtonID = 'pr3vv//__c4rosel';

export const carouselJumpButtonID = 'j0mpp//__c4rosel';

export const carouselDataDivId = 'D4T4_d1V_haha_xD';

export function carouselNext(id: string) {
    const btn = document.getElementById(
        `${carouselNextButtonID}${id}`,
    ) as HTMLButtonElement;

    btn.click();
}

export function carouselPrevious(id: string) {
    const btn = document.getElementById(
        `${carouselPreviousButtonID}${id}`,
    ) as HTMLButtonElement;

    btn.click();
}

export function carouselJumpToStep(id: string, step: number) {
    const btn = document.getElementById(
        `${carouselJumpButtonID}${id}`,
    ) as HTMLButtonElement;

    const newDiv = document.createElement('div');
    newDiv.setAttribute('step', JSON.stringify(step));
    newDiv.id = carouselDataDivId;
    document.body.appendChild(newDiv);

    btn.click();
}
