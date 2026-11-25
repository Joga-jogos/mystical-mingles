import Stack from '@mystical-mingles/ui/components/Stack';
import Typography from '@mystical-mingles/ui/components/Typography';

import type { Effect } from '@mystical-mingles/engine/effect';

import { getEffectIcon } from '@mystical-mingles/common/getEffectIcon';

interface ChampionEffectProps {
    effect: Effect;
    value: number;
}

export default function ChampionEffect({ effect, value }: ChampionEffectProps) {
  const Icon = getEffectIcon(effect);

  return (
    <Stack justifyContent="center" alignItems="center" gap={4}>
      <Icon fill="black" size={22} />
      <Typography weight="bold">{value}</Typography>
    </Stack>
  );
}