import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import useGameControl from '@/pages/Game/useGameControl';

import './InPlayCardsByChampion.scss';

interface InPlayCardsByChampionProps {
    champion: Champion<Species>;
    onRemoveFromHand: (champion: Champion<Species>) => void;
}

export default function InPlayCardsByChampion({ champion, onRemoveFromHand }: InPlayCardsByChampionProps) {
  const { game, me, enemy } = useGameControl();

  if (!game) { return; }
  if (!me) { return; }
  if (!enemy) { return; }

  const handleRemoveHand = () => { onRemoveFromHand(champion); };

  return (
    <div className="hand-cards">
      {
        me.team.deckManager.inPlay[champion.id] &&
                me.team.deckManager.inPlay[champion.id].map((card, index) => (
                  <button
                    key={card.id}
                    className="hand-cards__card"
                    style={{ bottom: -(70 + (40 * index)) }}
                    onClick={handleRemoveHand}
                  >
                    {card.name}
                  </button>
                ))
      }
      {
        enemy.team.deckManager.inPlay[champion.id] &&
                enemy.team.deckManager.inPlay[champion.id].map((card, index) => (
                  <button
                    key={card.id}
                    className="hand-cards__card"
                    style={{ bottom: -(70 + (40 * index)) }}
                    onClick={handleRemoveHand}
                  >
                    {card.name}
                  </button>
                ))
      }
    </div>
  );
}