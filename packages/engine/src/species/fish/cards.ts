import Card from '../../card';

export const HORN_CARDS: Card<'fish', 'horn'>[] = [
    new Card({
        cost: 1,
        attack: 90,
        shield: 70,
        part: 'horn',
        species: 'fish',
        name: 'fish horn 1',
        description: 'Fish Shark',
        type: 'melee',

        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://t3.ftcdn.net/jpg/10/00/83/88/360_F_1000838829_opU8XWhuS4MX52zSEWJEORma7lNhFZw5.jpg',
                hitbox: ''
            }
        }

    }),
    new Card({
        cost: 1,
        attack: 90,
        shield: 70,
        part: 'horn',
        species: 'fish',
        name: 'fish horn 2',
        description: 'Fish Shark',
        type: 'melee',
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://www.thoughtco.com/thmb/PHXqLrrhvo1wVZGne0ddMCef9E0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/close-up-of-orange-starfish-on-sand-489010151-59847f7f22fa3a0010518acc.jpg',
                hitbox: ''
            }
        }
        /* eslint-enable */
    })
];

export const TAIL_CARDS: Card<'fish', 'tail'>[] = [
    new Card({
        cost: 1,
        attack: 100,
        shield: 40,
        part: 'tail',
        species: 'fish',
        name: 'fish tails 1',
        description: 'Fish Gold',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://staticg.sportskeeda.com/editor/2025/03/e2727-17422267991189-1920.jpg?w=640',
                hitbox: ''
            }
        }
    }),
    new Card({
        cost: 1,
        attack: 100,
        shield: 40,
        part: 'tail',
        species: 'fish',
        name: 'fish tails 2',
        description: 'Fish Gold',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://aquaforest.eu/wp-content/uploads/2025/06/blazenek-scaled.jpg',
                hitbox: ''
            }
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
        name: 'fish mounths 1',
        description: 'Fish Eat',
        type: 'melee',
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://img.7segundos.com.br/Kbh4MVejdf78LrB4UHDVr5r6KnM=/1110x650/s3.7segundos.com.br/uploads/imagens/depositphotos-10757161-stock-photo-freshwater-catfish.jpg',
                hitbox: ''
            }
        }
        /* eslint-enable */
    }),
    new Card({
        cost: 1,
        attack: 125,
        shield: 15,
        part: 'mouth',
        species: 'fish',
        name: 'fish mounths 2',
        description: 'Fish Eat',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://marsemfim.com.br/wp-content/uploads/2014/12/peixe-diabo-negro.jpg',
                hitbox: ''
            }
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
        name: 'fish back 1',
        description: 'Deal 150% damage when attacking an idle target Deal 150% damage',
        type: 'melee',
        /* eslint-disable */
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/0ba0/live/8acc5b60-bbb4-11ee-8685-316409d66f25.jpg.webp',
                hitbox: ''
            }
        }
        /* eslint-enable */
    }),
    new Card({
        cost: 1,
        attack: 130,
        shield: 10,
        part: 'back',
        species: 'fish',
        name: 'fish back 2',
        description: 'Deal 150% damage when attacking an idle target',
        type: 'melee',
        assets: {
            audio: { start: '', finish: '' },
            image: {
                card: 'https://pbs.twimg.com/media/CPCDgOOUEAAJm2z.jpg:large',
                hitbox: ''
            }
        }
    })
];