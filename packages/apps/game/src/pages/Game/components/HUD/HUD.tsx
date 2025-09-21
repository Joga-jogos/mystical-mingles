import { PropsWithChildren } from 'react';

import Stack from '@mystical-mingles/ui/components/Stack';

import type Card from '@mystical-mingles/engine/card';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import { useMatchmaking } from '@mystical-mingles/common/Matchmaking';

import Deck from '../Deck';
import useGameControl from '../../useGameControl';

import HandCardsByChampion from './components/HandCardsByChampion';

export default function HUD({ children }: PropsWithChildren) {
    const { game, me } = useGameControl();

    const { endTurn } = useMatchmaking();

    if (!me) { return; }
    if (!game) { return; }

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
        <Stack flexDirection="column" justifyContent="space-between" style={{ height: '100vh' }}>
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
                                <HandCardsByChampion champion={champion} onRemoveFromHand={removeFromHand} />
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
                        energy: {me.team.energies}/10
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
                                            cards={me.team.deck[champion.id]}
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