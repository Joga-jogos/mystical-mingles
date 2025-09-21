import Card from '../../card';

export const HORN_CARDS: Card<'bird', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 150,
        shield: 30,
        part: 'horn',
        species: 'bird',
        name: 'Bird Topknot',
        description: 'Bird Feather',
        type: 'ranged',
        effect: { name: 'faster_backdoor', value: 0 },
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const TAIL_CARDS: Card<'bird', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 120,
        shield: 30,
        part: 'tail',
        species: 'bird',
        name: 'Bird Feather',
        description: 'Bird Feather',
        type: 'ranged',
        effect: { name: 'faster_backdoor', value: 0 },
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const MOUTH_CARDS: Card<'bird', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 100,
        shield: 30,
        part: 'mouth',
        species: 'bird',
        name: 'Bird Beak',
        description: 'Bird Beak',
        type: 'ranged',
        effect: { name: 'faster_backdoor', value: 0 },
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];

export const BACK_CARDS: Card<'bird', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 110,
        shield: 30,
        part: 'back',
        species: 'bird',
        name: 'Bird Wing',
        description: 'Bird Wing',
        type: 'ranged',
        effect: { name: 'faster_backdoor', value: 0 },
        assets: {
            audio: { start: '', finish: '' },
            image: { card: '', hitbox: '' }
        }
    })
];