import type { MatchmakingAction } from '@mystical-mingles/services/matchmaking';

import { messageAnimation } from './message';

function takesDamageAnimation(el: HTMLElement) {
    return new Promise(resolve => {
        const elMingle = el.querySelector<HTMLDivElement>('div[data-entity="mingle"]');

        if (!elMingle) { return Promise.resolve(); }

        const onEnd = () => {
            elMingle.removeEventListener('animationend', onEnd);
            elMingle.classList.remove('take-damage'); // remove a classe
            resolve('');
        };

        // garante que a animação reinicie
        elMingle.classList.remove('take-damage');
        void elMingle.offsetWidth; // força reflow
        elMingle.classList.add('take-damage');

        elMingle.addEventListener('animationend', onEnd);
    });
}

function damageAnimation(el: HTMLElement) {
    return new Promise(resolve => {
        const elMingle = el.querySelector<HTMLDivElement>('div[data-entity="mingle"]');

        if (!elMingle) { return Promise.resolve(); }

        const onEnd = () => {
            elMingle.removeEventListener('animationend', onEnd);
            elMingle.classList.remove('apply-damage'); // remove a classe
            resolve('');
        };

        // garante que a animação reinicie
        elMingle.classList.remove('apply-damage');
        void elMingle.offsetWidth; // força reflow
        elMingle.classList.add('apply-damage');

        elMingle.addEventListener('animationend', onEnd);
    });
}

export async function attack(
    el: HTMLElement,
    target: HTMLElement,
    action: MatchmakingAction,
    cb: () => void
) {
    damageAnimation(el);
    takesDamageAnimation(target);
    cb();

    if (action.critical) {
        await messageAnimation(target, `CRITICAL ${action.damage}`, 'critical');
    }

    if (!action.critical) {
        await messageAnimation(target, String(action.damage), 'damage');
    }

}