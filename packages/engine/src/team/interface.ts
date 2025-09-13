import type Card from '../card';
import type Champion from '../champion';
import type { Species } from '../species';
import type { ActiveParts } from '../parts';

export type Deck = {
    [championId: string]: Card<Species, ActiveParts>[];
}

export interface TeamOptions {
    id?: string;
    name: string;
    energy?: number;
    deck?: Deck;
    hand?: Deck;
    death?: Deck;
    champions: Champion<Species>[];
}