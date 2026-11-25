import { uuid } from '@mystical-mingles/toolkit/uuid';
import { getRandom } from '@mystical-mingles/toolkit/array';

import Card from '../card';
import type Champion from '../champion';
import type { Species } from '../species';
import type { ActiveParts } from '../parts';

import type { Deck } from './interface';

export default class DeckManager {
  private _deck: Deck;
  private _hand: Deck;
  private _death: Deck;
  private _inPlay: Deck;

  constructor(private champions: Champion<Species>[], data: { death: Deck; deck: Deck, hand: Deck, inPlay: Deck }) {
    const { deck, hand, death, inPlay } = data;

    this.deck = deck || this.initDeck(champions);
    this.hand = hand || this.initHand(champions);
    this.death = death || this.initHand(champions);
    this.inPlay = inPlay || this.initHand(champions);
  }

  get deck() { return this._deck; }
  private set deck(deck: Deck) { this._deck = deck; }

  get hand() { return this._hand; }
  private set hand(hand: Deck) { this._hand = hand; }

  get death() { return this._death; }
  private set death(death: Deck) { this._death = death; }

  get inPlay() { return this._inPlay; }
  private set inPlay(inPlay: Deck) { this._inPlay = inPlay; }

  get totalDeckDeath() {
    return this.champions.reduce((acc, champion) => {
      acc = acc + this.death[champion.id].length;

      return acc;
    }, 0);
  }

  private initHand(champions: Champion<Species>[]): Deck {
    return {
      [champions[0].id]: [],
      [champions[1].id]: [],
      [champions[2].id]: []
    };
  }

  private initDeck(champions: Champion<Species>[]): Deck {
    return champions.reduce<Deck>((acc, champion) => {
      acc[champion.id] = Object.values(champion.cards).flatMap(arr => arr);

      return acc;
    }, {});
  }

  private getValidCard(deck: Deck, currentDeck: Deck): {
        pickedChampionId: string;
        pickedCard: Card<Species, ActiveParts>;
    } {
    const pickedChampionId = getRandom(Object.keys(deck));
    const championDeck = currentDeck[pickedChampionId];

    // se campeão cheio, tenta outro
    if (championDeck.length >= 8) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [pickedChampionId]: _, ...withoutCurrent } = deck;

      if (Object.keys(withoutCurrent).length === 0) {
        throw new Error('Todos os campeões estão cheios');
      };

      return this.getValidCard(withoutCurrent, currentDeck);
    }

    const pickedCard = new Card({
      ...getRandom(deck[pickedChampionId]).options,
      id: uuid()
    });

    const existingCount = championDeck.filter(c => c.name === pickedCard.name).length;

    // não pode ter mais de 2 iguais
    if (existingCount >= 2) {
      return this.getValidCard(deck, currentDeck);
    }

    return { pickedChampionId, pickedCard };
  }

  public setHand(hand: Deck) { this.hand = hand; }
  public setDeck(deck: Deck) { this.deck = deck; }
  public setDeath(death: Deck) { this.death = death; }
  public setInPlay(inPlay: Deck) { this.inPlay = inPlay; }

  public resetInPlay() { this.inPlay = this.initHand(this.champions); }

  public moveCardToInPlay(champion: Champion<Species>, card: Card<Species, ActiveParts>) {
    this.inPlay[champion.id].push(card);

    this.hand[champion.id] = this.hand[champion.id].filter(c => c.id !== card.id);
  }

  public discardInPlay(champion: Champion<Species>): number {
    const enegies = this.inPlay[champion.id]
      .reduce((acc, card) => {
        card.id = uuid();

        this.hand[champion.id].push(card);

        acc += card.cost;

        return acc;
      }, 0);

    this.inPlay[champion.id] = [];

    return enegies;
  }

  public buyCards(count: number) {
    const newHand = { ...this.hand };
    const newDeck = { ...this.deck };

    for (let i = 0; i < count; i++) {
      const { pickedChampionId, pickedCard } = this.getValidCard(newDeck, newHand);

      // Adiciona a carta à mão
      newHand[pickedChampionId] = [...newHand[pickedChampionId], pickedCard];

      // Remove a carta do deck
      const updatedChampionCards = newDeck[pickedChampionId].filter(
        card => card !== pickedCard
      );

      newDeck[pickedChampionId] = updatedChampionCards;
    }

    this.hand = newHand;
    this.deck = newDeck;
  }
}