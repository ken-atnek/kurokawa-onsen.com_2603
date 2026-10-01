/* =======================================
 * 黒川温泉観光協会 飲食店提供時間帯ラベル
 * URL: /src/components/Shops/ShopMealPeriodTags.tsx
 * Referenced in: /src/components/Shops/ShopHeader.tsx, /src/components/Shops/ShopCard.tsx
 * Created: 2026-10-01
 * Last updated: 2026-10-01
 * ======================================= */

import clsx from 'clsx';
import type { ShopMealPeriod } from '@/types/shop';
import styles from './ShopMealPeriodTags.module.scss';

type Props = {
  mealPeriods?: ShopMealPeriod[];
};

const mealPeriodLabels: Record<ShopMealPeriod, string> = {
  morning: 'モーニング',
  lunch: 'ランチ',
  dinner: 'ディナー',
};

const mealPeriodOrder: ShopMealPeriod[] = ['morning', 'lunch', 'dinner'];

export default function ShopMealPeriodTags({ mealPeriods = [] }: Props) {
  const visiblePeriods = mealPeriodOrder.filter((period) =>
    mealPeriods.includes(period)
  );

  if (visiblePeriods.length === 0) return null;

  return (
    <ul className={styles.list} aria-label="提供時間帯">
      {visiblePeriods.map((period) => (
        <li
          key={period}
          className={clsx(styles.item, styles[`item-${period}`])}
        >
          {mealPeriodLabels[period]}
        </li>
      ))}
    </ul>
  );
}
