import { getRandom } from '@mystical-mingles/toolkit/array';

let COUNT = 0;

const prefixes = [
    'Aqua', 'Pyro', 'Luna', 'Terra', 'Electro',
    'Shadow', 'Solar', 'Frost', 'Mystic', 'Thunder',
    'Flora', 'Vita', 'Giga', 'Neo', 'Omega'
];

const suffixes = [
    'fang', 'tail', 'claw', 'wing', 'horn',
    'scale', 'puff', 'spark', 'whisk', 'bite',
    'leaf', 'flare', 'shadow', 'blaze', 'sparkle'
];

export function generateMingleName() {
    return `${getRandom(prefixes)}${getRandom(suffixes)}-${++COUNT}`;
}