import { wait } from '@mystical-mingles/toolkit/promise';

export async function goTo(el: HTMLElement, target: HTMLElement, isEnemy: boolean) {
    const modificador = isEnemy ? 70 : -70;

    const elRect = el.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    // diferença entre centro do alvo e centro do elemento
    const dx = targetRect.left + targetRect.width / 2 - (elRect.left + elRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (elRect.top + elRect.height / 2);

    // aplicar a transição
    el.style.transform = `translate(${dx + modificador}px, ${dy}px)`;
    el.style.zIndex = '100';

    return wait(() => { }, 300);
}

export async function goBack(el: HTMLElement) {
    el.style.transform = 'translate(0px, 0px)';
    el.style.zIndex = '100';

    return wait(() => { }, 300);
}