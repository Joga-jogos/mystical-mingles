import Card from '../../card';

export const HORN_CARDS: Card<'reptile', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 150,
        shield: 30,
        part: 'horn',
        species: 'reptile',
        name: 'reptile horn 1',
        description: 'Aplique ataque+ a este Mingle ao atacar alvos Planta ou Réptil',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://www.zenhabitats.com/cdn/shop/articles/toxins_poison_for_reptiles_345x300_crop_center.png?v=1711155491',
                hitbox: ''
            }
        }
        /* eslint-enable */
    }),
    new Card({
        cost: 1,
        attack: 60,
        shield: 60,
        part: 'horn',
        species: 'reptile',
        name: 'reptile horn 2',
        description: 'Cure este Mingle com o dano causado por esta carta.',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/cf/79/e7/oslo-reptile-park.jpg?w=1200&h=-1&s=1',
                hitbox: ''
            }
        }
        /* eslint-enable */
    })
];

export const TAIL_CARDS: Card<'reptile', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 120,
        shield: 30,
        part: 'tail',
        species: 'reptile',
        name: 'reptile tails 1',
        description: 'Causa 120% de dano se este Mingle atacar primeiro.',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://www.mylearningonline.com.au/wp-content/uploads/Course-reptile-zoology-feature-1.jpg',
                hitbox: ''
            }
        }
    }),
    new Card({
        cost: 0,
        attack: 120,
        shield: 30,
        part: 'tail',
        species: 'reptile',
        name: 'reptile tails 2',
        description: 'Aplique ataque+ nesse mingle',
        type: 'idle',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://media.istockphoto.com/id/1094540956/photo/yellow-blue-lizard-panther-chameleon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=Yob_Nay7pEXmmBz2T04Bj5BRmh8y5QF_C7Tr3WSFA10=',
                hitbox: ''
            }
        }
        /* eslint-enable */
    })
];

export const MOUTH_CARDS: Card<'reptile', 'mouth'>[] = [
    new Card({
        cost: 1,
        attack: 100,
        shield: 30,
        part: 'mouth',
        species: 'reptile',
        name: 'reptile mounths 1',
        description: 'Reptile Beak',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://img.freepik.com/free-photo/white-line-gecko-head-closeup_488145-599.jpg?semt=ais_hybrid&w=740&q=80',
                hitbox: ''
            }
        }
        /* eslint-enable */
    }),
    new Card({
        cost: 1,
        attack: 100,
        shield: 30,
        part: 'mouth',
        species: 'reptile',
        name: 'reptile mounths 2',
        description: 'Reptile Beak',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://st3.depositphotos.com/29384342/34113/i/450/depositphotos_341139914-stock-photo-toad-reptile-frog-amphibian-animal.jpg',
                hitbox: ''
            }
        }
        /* eslint-enable */
    })
];

export const BACK_CARDS: Card<'reptile', 'back'>[] = [
    new Card({
        cost: 1,
        attack: 110,
        shield: 30,
        part: 'back',
        species: 'reptile',
        name: 'reptile back 1',
        description: 'Backdoor no mingle com menor vitalidade',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://super.abril.com.br/wp-content/uploads/2018/07/564a2fba82bee1099f0098adthinkstockphotos-55844868.jpeg',
                hitbox: ''
            }
        }
        /* eslint-enable */
    }),
    new Card({
        cost: 1,
        attack: 110,
        shield: 30,
        part: 'back',
        species: 'reptile',
        name: 'reptile back 2',
        description: 'Cure este mingle em 120 HP.',
        type: 'ranged',
        effect: { name: 'raise_damage', value: 1, target: 'self', type: 'buff' },
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://yt3.googleusercontent.com/5ViIA9nIGeN3LuSuKsxfi-EsJCNEQLfROp5BOLaMBDm7KETPSLsU3P6mybRmUQQaG5_xyNrsKw=s900-c-k-c0x00ffffff-no-rj',
                hitbox: ''
            }
        }
        /* eslint-enable */
    })
];