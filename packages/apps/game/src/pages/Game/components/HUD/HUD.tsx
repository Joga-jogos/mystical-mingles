import { PropsWithChildren, useMemo } from 'react';

import Fade from '@mystical-mingles/ui/animations/Fade';
import Slide from '@mystical-mingles/ui/animations/Slide';
import BoltIcon from '@mystical-mingles/ui/custom-icons/Bolt';
import Stack from '@mystical-mingles/ui/components/Stack';
import Button from '@mystical-mingles/ui/components/Button';
import Typography from '@mystical-mingles/ui/components/Typography';

import type Card from '@mystical-mingles/engine/card';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import useAnimate from '@/providers/AnimateProvider/useAnimate';

import Deck from '../Deck';
import OrderItem from '../OrderItem';
import useGameControl from '../../useGameControl';

import InPlayCardsByChampion from './components/InPlayCardsByChampion';

import './HUD.scss';

export default function HUD({ children }: PropsWithChildren) {
    const { actor } = useAnimate();
    const { endTurn } = useMatchmaking();
    const { game, me, enemy, round, hasAlreadyPlayed } = useGameControl();

    const playedCards = useMemo<Card<Species, ActiveParts>[]>(() => {
        if (!actor) { return []; }
        if (!me) { return []; }
        if (!enemy) { return []; }

        const ref = me.team.champions.some(c => c.id === actor?.id)
            ? me.team
            : enemy.team;

        return ref.deckManager.inPlay[actor.id];
    }, [actor]);

    const handleChooseCard = (card: Card<Species, ActiveParts>, champion: Champion<Species>) => {
        if (!me) { return []; }
        if (!game) { return []; }

        me.team.playCard(card, champion);

        game.update({
            players: [game.players[0], game.players[1]]
        });
    };

    const removeFromHand = (champion: Champion<Species>) => {
        if (!me) { return []; }
        if (!game) { return []; }

        me.team.resetHand(champion);

        game.update({
            players: [game.players[0], game.players[1]]
        });
    };

    const handleEndTurn = () => {
        if (!endTurn) { return; }
        if (!me) { return; }
        if (!round) { return; }

        endTurn(me, round.id);
    };

    if (!game || !me) { return <></>; }

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
                                        <button key={card.id}>
                                            {card.name}
                                        </button>
                                    </Slide>
                                ))
                            }
                        </Stack>
                    </Fade>
                )
            }
            <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                <Typography family="zuera" variant="h5" style={{ whiteSpace: 'nowrap' }}>
                    Round: {game.round}
                </Typography>

                <Stack flexDirection="row" justifyContent="center" style={{ marginLeft: -90 }}>
                    {
                        game.turnOrder
                            .filter(c => c.isAlive)
                            .map((champion, index) => (
                                <div key={champion.id}>
                                    <OrderItem
                                        order={index + 1}
                                        champion={champion}
                                        isEnemy={!me.team.champions.some(c => c.id === champion.id)}
                                    />
                                    <InPlayCardsByChampion
                                        champion={champion}
                                        onRemoveFromHand={removeFromHand}
                                    />
                                </div>
                            ))
                    }
                </Stack>
            </Stack>

            {children}

            <Stack gap={0} flexDirection="column" alignItems="flex-end">
                <Button disabled={hasAlreadyPlayed} onClick={handleEndTurn}>
                    Próximo turno
                </Button>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Stack gap={4} style={{ width: 200 }} alignItems="center">
                        <BoltIcon size={22} />
                        <Typography variant="h5" family="zuera">
                            {me.team.energyManager.energies}/10
                        </Typography>
                    </Stack>
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
                        {me.team.deckManager.totalDeckDeath}
                    </div>
                </Stack>
            </Stack>
        </Stack>
    );
}