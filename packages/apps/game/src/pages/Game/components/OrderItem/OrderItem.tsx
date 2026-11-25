import { joinClass } from '@mystical-mingles/ui/utils';
import Typography from '@mystical-mingles/ui/components/Typography';

import type Champion from '@mystical-mingles/engine/champion';
import type { Species } from '@mystical-mingles/engine/species';

import MingleUI from '@mystical-mingles/common/Mingle';

import './OrderItem.scss';

interface OrderItemProps {
    champion: Champion<Species>
    order: number;
    isEnemy: boolean;
}

export default function OrderItem({ champion, order, isEnemy }: OrderItemProps) {
  const classes = joinClass([
    'order-item',
    isEnemy && 'order-item--enemy'
  ]);

  const classesOrder = joinClass([
    'order-text',
    isEnemy && 'order-text--enemy'
  ]);

  return (
    <div className={classes}>
      <div className="mingle">
        <MingleUI options={champion} size={120} />
      </div>
      <Typography
        variant="h3"
        family="zuera"
        color="background.default"
        className={classesOrder}
      >
        {order}
      </Typography>
    </div>
  );
}