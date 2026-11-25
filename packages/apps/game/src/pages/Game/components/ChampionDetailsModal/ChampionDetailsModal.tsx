import { useMemo } from 'react';

import Stack from '@mystical-mingles/ui/components/Stack';
import FireIcon from '@mystical-mingles/ui/custom-icons/Fire';
import HeartIcon from '@mystical-mingles/ui/custom-icons/Heart';
import FastIcon from '@mystical-mingles/ui/custom-icons/Fast';
import Typography from '@mystical-mingles/ui/components/Typography';
import { Modal } from '@mystical-mingles/ui/components/Modal';
import { Grid, GridItem } from '@mystical-mingles/ui/components/Grid';
import type { HelperModalProps } from '@mystical-mingles/ui/components/Modal';

import { cards } from '@mystical-mingles/engine/species';
import { activeParts } from '@mystical-mingles/engine/parts';
import type Card from '@mystical-mingles/engine/card';
import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { Stats, ActiveParts } from '@mystical-mingles/engine/parts';

import CardUI from '@mystical-mingles/common/Card';
import MingleUI from '@mystical-mingles/common/Mingle';

import ChampionStats from './components/ChampionStats';

import './ChampionDetailsModal.scss';

export default function ChampionDetailsModal({
    isOpen,
    champion,
    onToggleModal,
}: HelperModalProps<{
    champion: Champion<Species>
}>) {
    const MAP_COLORS: { [X in keyof Stats]: string } = {
        life: '#34C375',
        fury: '#C33C38',
        speed: '#F6AD05',
    };

    const championCards = useMemo(() => activeParts.reduce<{
        [A in ActiveParts]: Card<Species, ActiveParts>;
    }>((acc, part) => {
        const card = champion.cards[part];

        acc[part] = cards[card.species][part].find(card => {
            return card.name === champion.cards[part].name;
        }) as Card<Species, ActiveParts>;

        return acc;
    }, {} as { [A in ActiveParts]: Card<Species, ActiveParts> }), [champion]);

    return (
        <Modal
            open={isOpen}
            onClose={onToggleModal}
            className="champion-details-modal"
            style={{
                width: 'fit-content'
            }}
        >
            <Grid gap={24}>
                <GridItem xl={12} placeItems="center">
                    <Stack justifyContent="center" flexDirection="column" alignItems="center">
                        <Typography>
                            {champion.id}
                        </Typography>
                        <Typography variant="h5">
                            {champion.name}
                        </Typography>
                    </Stack>
                </GridItem>
                <GridItem xl={6} placeItems="center">
                    <MingleUI
                        options={champion.options.mingle}
                        size={160}
                    />
                </GridItem>
                <GridItem xl={6} alignSelf="center">
                    <Stack>
                        <ChampionStats
                            color={MAP_COLORS.fury}
                            value={champion.stats.fury}
                            Icon={FireIcon}
                        />
                        <ChampionStats
                            color={MAP_COLORS.life}
                            value={champion.stats.life}
                            Icon={HeartIcon}
                        />
                        <ChampionStats
                            color={MAP_COLORS.speed}
                            value={champion.stats.speed}
                            Icon={FastIcon}
                        />
                    </Stack>
                </GridItem>
                <GridItem xl={12}>
                    <Stack>
                        <CardUI card={championCards.back} />
                        <CardUI card={championCards.horn} />
                        <CardUI card={championCards.mouth} />
                        <CardUI card={championCards.tail} />
                    </Stack>
                </GridItem>
            </Grid>
        </Modal>
    );
}