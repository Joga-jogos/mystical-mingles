import type { Meta, StoryObj } from '@storybook/react';

import Stack from '@mystical-mingles/ui/components/Stack';
import Typography from '@mystical-mingles/ui/components/Typography';
import { Grid, GridItem } from '@mystical-mingles/ui/components/Grid';

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
            <Grid key={specie}>
              <GridItem xl={12}>
                <Typography variant="h5" style={{ textTransform: 'capitalize' }}>
                  {specie}
                </Typography>
                <hr />
              </GridItem>
              {
                activeParts.map(part => {
                  return [0, 1].flatMap(p => (
                    <GridItem xl={3} key={p}>
                      <Card card={cards[specie][part][p]} />
                    </GridItem>
                  ));
                })
              }
            </Grid>
          ))
        }
      </Stack>
    );
  }
};

export default meta;