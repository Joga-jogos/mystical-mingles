import { PropsWithChildren, useMemo } from 'react';

import Stack from '@mystical-mingles/ui/components/Stack';
import Fade from '@mystical-mingles/ui/animations/Fade';
import Slide from '@mystical-mingles/ui/animations/Slide';

import type Card from '@mystical-mingles/engine/card';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import useAnimate from '@/providers/AnimateProvider/useAnimate';

import Deck from '../Deck';
import CardComponent from '../Card';
import useGameControl from '../../useGameControl';

import InPlayCardsByChampion from './components/InPlayCardsByChampion';

import './HUD.scss';

export default function HUD({ children }: PropsWithChildren) {
    const { game, me, enemy } = useGameControl();
    const { actor } = useAnimate();
    const { endTurn } = useMatchmaking();

    if (!me) { return; }
    if (!enemy) { return; }
    if (!game) { return; }

    const playedCards = useMemo<Card<Species, ActiveParts>[]>(() => {
        if (!actor) { return []; }

        const ref = me.team.champions.some(c => c.id === actor?.id)
            ? me.team
            : enemy.team;

        return ref.deckManager.inPlay[actor.id];
    }, [actor]);

    const handleChooseCard = (card: Card<Species, ActiveParts>, champion: Champion<Species>) => {
        me.team.playCard(card, champion);

        game.update({
            players: [game.players[0], game.players[1]]
        });
    };

    const removeFromHand = (champion: Champion<Species>) => {
        me.team.resetHand(champion);

        game.update({
            players: [game.players[0], game.players[1]]
        });
    };

    const handleEndTurn = () => {
        if (!endTurn) { return; }

        endTurn(me);
    };

    return (
        <Stack className="HUD" flexDirection="column" justifyContent="space-between" style={{ height: '100vh' }}>
            {
                Boolean(actor) && (
                    <Fade enter={Boolean(actor)} delay={150} className="HUD__hand-cards-container">
                        <Stack
                            alignItems="center"
                            flexDirection="row"
                            justifyContent="center"
                            className="HUD__hand-cards"
                        >
                            {
                                playedCards.map((card, index) => (
                                    <Slide enter key={card.id} delay={(index + 1) * 150} direction="top">
                                        <CardComponent key={card.id} card={card} />
                                    </Slide>
                                ))
                            }
                        </Stack>
                    </Fade>
                )
            }
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <div style={{ width: 200 }}>Round: {game.round}</div>

                <Stack flexDirection="row" justifyContent="center">
                    {
                        game.turnOrder.map((champion, index) => (
                            <Stack
                                flexDirection="column"
                                alignItems="center"
                                key={champion.name}
                                gap={5}
                                style={{
                                    color: me.team.champions.some(c => c.id === champion.id)
                                        ? 'var(--info)'
                                        : 'var(--error)'
                                }}
                            >

                                <div>{index + 1}</div>
                                <div>{champion.name}</div>
                                <InPlayCardsByChampion champion={champion} onRemoveFromHand={removeFromHand} />
                            </Stack>
                        ))
                    }
                </Stack>
            </Stack>

            {children}

            <Stack flexDirection="column" alignItems="flex-end">
                <div>
                    <button onClick={handleEndTurn}>Próximo turno</button>
                </div>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <div style={{ width: 200 }}>
                        energy: {me.team.energyManager.energies}/10
                    </div>
                    <Stack flexDirection="row" alignItems="center" justifyContent="space-between">
                        {
                            game.turnOrder
                                .filter(champion => me.team.champions.some(c => champion.id === c.id))
                                .filter(a => a.isAlive)
                                .map((champion) => (
                                    <Stack key={champion.id} flexDirection="column">
                                        <Deck
                                            champion={champion}
                                            order={game.turnOrder.findIndex(c => c.id === champion.id) + 1}
                                            cards={me.team.deckManager.hand[champion.id]}
                                            onChoose={(card) => handleChooseCard(card, champion)}
                                        />
                                    </Stack>
                                ))
                        }
                    </Stack>
                    <div style={{ width: 200 }}>
                        DEATH DECK
                    </div>
                </Stack>
            </Stack>
        </Stack>
    );
}