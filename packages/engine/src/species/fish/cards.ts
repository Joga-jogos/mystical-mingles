import Card from '../../card';

export const HORN_CARDS: Card<'fish', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 90,
        shield: 70,
        part: 'horn',
        species: 'fish',
        name: 'Fish Shark',
        description: 'Fish Shark',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const TAIL_CARDS: Card<'fish', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 100,
        shield: 40,
        part: 'tail',
        species: 'fish',
        name: 'Fish Gold',
        description: 'Fish Gold',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const MOUTH_CARDS: Card<'fish', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 125,
        shield: 15,
        part: 'mouth',
        species: 'fish',
        name: 'Fish Eat',
        description: 'Fish Eat',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const BACK_CARDS: Card<'fish', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 130,
        shield: 10,
        part: 'back',
        species: 'fish',
        name: 'Fish Fin',
        description: 'Fish Fin',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];