import Zoom from '@mystical-mingles/ui/animations/Zoom';
import Stack from '@mystical-mingles/ui/components/Stack';
import Shield from '@mystical-mingles/ui/custom-icons/Shield';
import Typography from '@mystical-mingles/ui/components/Typography';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';
import type { Effect } from '@mystical-mingles/engine/effect';

import { useSpecies } from '@mystical-mingles/common/Species';

import ChampionEffect from '../ChampionEffect';

import './ChampionHUD.scss';
interface ChampionHUDProps {
    champion: Champion<Species>;
}

export default function ChampionHUD({ champion }: ChampionHUDProps) {
    const { color, Icon } = useSpecies(champion.species);

    return (
        <div className="hud">
            <Stack justifyContent="center" alignItems="center">
                {
                    Object.entries(champion.buffs).map(([effect, value]) => (
                        <ChampionEffect
                            key={effect}
                            value={value}
                            effect={effect as Effect}
                        />
                    ))
                }
            </Stack>
            <Stack gap={4} flexDirection="row" alignItems="center">
                <Zoom enter={Boolean(champion.shield)} delay={0} className="hud__shield">
                    <Shield className="hud__shield__icon" size={30} color="info.main" />
                    <Typography className="hud__shield__value">
                        {champion.shield}
                    </Typography>
                </Zoom>
                <Stack gap={6} alignItems="center" className="hud__life">
                    <div className="hud__life__species" style={{ backgroundColor: color }}>
                        <Icon color="background.default" />
                    </div>
                    <Typography variant="body2" style={{ fontWeight: 600 }}>{champion.life}</Typography>
                    <div className="hud__life-bar">
                        <div className="hud__life-bar__blood" style={{
                            width: `${(champion.life / (champion.totalLife)) * 100}%`,
                            backgroundColor: champion.life > champion.totalLife / 2 ? '#31c957' : '#f73434'
                        }} />
                    </div>
                </Stack>
            </Stack>
        </div>
    );
}