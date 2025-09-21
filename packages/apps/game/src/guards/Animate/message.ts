type Type = 'damage' | 'missed' | 'critical' | 'heal' | 'poison' | 'rise-damage';

export function messageAnimation(el: HTMLElement, message: string, type: Type) {
    return new Promise((resolve) => {
        const div = document.createElement('div');

        div.setAttribute('class', type);
        div.textContent = message;

        el.appendChild(div);

        const onEnd = (event: AnimationEvent) => {
            if (event.target !== div) return;

            div.removeEventListener('animationend', onEnd);
            el.removeChild(div);
            resolve('');
        };

        el.addEventListener('animationend', onEnd);
    });
}