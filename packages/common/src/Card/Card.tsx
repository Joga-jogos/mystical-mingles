import type { HTMLAttributes } from 'react';

import Stack from '@mystical-mingles/ui/components/Stack';
import SwordIcon from '@mystical-mingles/ui/custom-icons/Sword';
import ShieldIcon from '@mystical-mingles/ui/custom-icons/Shield';
import BowIcon from '@mystical-mingles/ui/custom-icons/Bow';
import Typography from '@mystical-mingles/ui/components/Typography';

import type Card from '@mystical-mingles/engine/card';
import type { Species } from '@mystical-mingles/engine/species';
import type { ActiveParts } from '@mystical-mingles/engine/parts';

import { getEffectIcon } from '../getEffectIcon';

import useCard from './useCard';

import './Card.scss';

interface DeckCardProps extends HTMLAttributes<HTMLElement> {
    size?: number;
    card: Card<Species, ActiveParts>;
}

export default function CardUI({ card, size = 1, ...props }: DeckCardProps) {
  const TEXT_COLOR = '#ffffdd';

  const { background } = useCard(card.species);

  const Icon = getEffectIcon(card.effect.name);

  return (
    <div
      className="card"
      style={{ background, transform: `scale(${size})` }}
      {...props}
    >
      <Stack
        gap={8}
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
        style={{ height: '100%' }}
      >
        <Stack justifyContent="flex-end">
          <div className="card__name">
            <Typography>{card.name}</Typography>
          </div>
        </Stack>
        <div className="card__image">
          <img src={card.assets.image.card} alt="" />
        </div>
        <div className="card__description">
          <Typography>
            {card.description}
          </Typography>
        </div>
        <Stack
          gap={0}
          className="card__cost"
          style={{ background }}
        >
          <Stack
            gap={0}
            className="card__cost__second"
          >
            <Typography variant="h6">
              {card.cost}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          className="card__stats"
          justifyContent="space-between"
          alignItems="center"
          gap={0}
        >
          <Stack
            gap={4}
            alignItems="center"
            justifyContent="center"
            className="card__stats__square"
          >
            {
              card.type === 'ranged'
                ? <BowIcon />
                : <SwordIcon />
            }
            <Typography>{card.attack}</Typography>
          </Stack>
          <div className="card__stats__circle">
            <Icon fill={TEXT_COLOR} />
          </div>
          <Stack
            gap={4}
            alignItems="center"
            justifyContent="center"
            className="card__stats__square"
          >
            <ShieldIcon />
            <Typography>{card.shield}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
}