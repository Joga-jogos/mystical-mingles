import { getOpacityColor } from '@mystical-mingles/ui/theme';
import Stack from '@mystical-mingles/ui/components/Stack';
import Typography from '@mystical-mingles/ui/components/Typography';
import type { CustomIconProps } from '@mystical-mingles/ui/custom-icons';

interface ChampionStatsProps {
    color: string;
    value: number;
    Icon: React.FC<CustomIconProps>;
}

export default function ChampionStats({ color, value, Icon }: ChampionStatsProps) {

  return (
    <Stack gap={8} alignItems="center"
    >
      <div
        className="stats__button"
        style={{
          background: getOpacityColor(color, .2),
        }}
      >
        <Icon
          size={24}
          style={{ color }}
        />
      </div>
      <Typography variant="h6">
        {value}
      </Typography>
    </Stack>
  );
}