import { wait } from '@mystical-mingles/toolkit/promise';

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

function attackAnimation(el: HTMLElement) {
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

async function throwSomething(el: HTMLElement, target: HTMLElement) {
  const div = document.createElement('div');

  div.setAttribute('class', 'bullet');
  el.appendChild(div);

  const elRect = el.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  // diferença entre centro do alvo e centro do elemento
  const dx = targetRect.left + targetRect.width / 2 - (elRect.left + elRect.width / 2);
  const dy = targetRect.top + targetRect.height / 2 - (elRect.top + elRect.height / 2);

  div.style.transform = `translate(${dx}px, ${dy}px)`;

  return wait(() => { el.removeChild(div); }, 350);
}

export async function attack(
  el: HTMLElement,
  target: HTMLElement,
  action: MatchmakingAction,
  cb: () => void
) {
  if (action.actor.buffs?.raise_damage) {
    await messageAnimation(el, 'Raise damage', 'rise-damage');
  }

  attackAnimation(el);

  const isRanged = action.type === 'ranged';

  if (isRanged) {
    await throwSomething(el, target);
  }

  takesDamageAnimation(target);
  cb();

  if (action.critical) {
    await messageAnimation(target, `CRITICAL ${action.damage}`, 'critical');
  }

  if (!action.critical) {
    await messageAnimation(target, String(action.damage), 'damage');
  }
}