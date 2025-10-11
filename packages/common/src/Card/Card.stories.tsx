import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@mystical-mingles/ui/components/Stack';
import Typography from '@mystical-mingles/ui/components/Typography';

import { species, cards } from '@mystical-mingles/engine/species';
import { activeParts } from '@mystical-mingles/engine/parts';

import Card from './Card';

const meta: Meta<typeof Card> = {
    title: 'Card',
    component: Card,
};

export const Default: StoryObj<typeof Card> = {
    render: () => {
        return (
            <Stack flexDirection="column">
                {
                    species.map(specie => (
                        <Stack key={specie} flexDirection="column">
                            <Typography variant="h5">{specie}</Typography>
                            <Stack>
                                {
                                    activeParts.map(part => {
                                        return [0, 1].flatMap(p => (
                                            <Card
                                                key={p}
                                                card={cards[specie][part][p]}
                                            />
                                        ));
                                    })
                                }
                            </Stack>
                        </Stack>
                    ))
                }
            </Stack>
        );
    }
};

export default meta;