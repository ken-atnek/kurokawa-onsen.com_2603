/* =======================================
 * 黒川温泉観光協会 店舗一覧ページ(view)
 * URL:src/components/Shops/ShopsList.tsx
 * Referenced in: : src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-10-01
 * ======================================= */
'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '@/styles/PageShops.module.scss';
import type { ShopMealPeriod, ShopWithStatus } from '@/types/shop';
import ShopCard from '@/components/Shops/ShopCard';

type Props = {
  grouped: Record<string, ShopWithStatus[]>;
};

const mealPeriodOptions: { value: ShopMealPeriod; label: string }[] = [
  { value: 'morning', label: 'モーニング' },
  { value: 'lunch', label: 'ランチ' },
  { value: 'dinner', label: 'ディナー' },
];

export default function ShopsList({ grouped }: Props) {
  const [selectedMealPeriods, setSelectedMealPeriods] = useState<
    ShopMealPeriod[]
  >([]);

  const categoryLabels: Record<string, string> = {
    food: 'お食事処一覧',
    souvenir: 'おみやげ処一覧',
    other: '他業種店一覧',
  };
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    const header = document.querySelector('header');
    const headerHeight = header ? header.clientHeight : 0;

    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 20; // 少し余白

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  const handleMealPeriodChange = (
    mealPeriod: ShopMealPeriod,
    checked: boolean
  ) => {
    setSelectedMealPeriods((current) =>
      checked
        ? [...current, mealPeriod]
        : current.filter((item) => item !== mealPeriod)
    );
  };

  return (
    <section className={styles.containerShops}>
      <nav>
        <a href="#food" onClick={(e) => handleAnchorClick(e, 'food')}>
          お食事処一覧
        </a>
        <a href="#souvenir" onClick={(e) => handleAnchorClick(e, 'souvenir')}>
          おみやげ処一覧
        </a>
        <a href="#other" onClick={(e) => handleAnchorClick(e, 'other')}>
          他業種店一覧
        </a>
      </nav>
      {Object.entries(grouped).map(([category, shops]) => {
        const visibleShops =
          category === 'food' && selectedMealPeriods.length > 0
            ? shops.filter((shop) =>
                selectedMealPeriods.every((mealPeriod) =>
                  shop.mealPeriods?.includes(mealPeriod)
                )
              )
            : shops;

        return (
          <article key={category} id={category}>
            <div className={styles.boxH2}>
              <i className={styles.itemLeft}></i>
              <h2>{categoryLabels[category] ?? category}</h2>
              <i className={styles.itemRight}></i>
            </div>
            {/* <p className={styles.notice}>※50音順で掲載しております</p> */}
            {category === 'food' ? (
              <div
                className={styles.boxMealFilter}
                role="group"
                aria-label="提供時間帯で絞り込み"
              >
                <div className={styles.filterTitle}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                    <circle cx="8" cy="6" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="18" r="2" />
                  </svg>
                  <span>絞り込み</span>
                </div>
                <div className={styles.filterOptions}>
                  {mealPeriodOptions.map((option) => (
                    <label key={option.value} className={styles.filterOption}>
                      <input
                        type="checkbox"
                        checked={selectedMealPeriods.includes(option.value)}
                        onChange={(event) =>
                          handleMealPeriodChange(
                            option.value,
                            event.target.checked
                          )
                        }
                      />
                      <span
                        className={styles.itemCheckbox}
                        aria-hidden="true"
                      ></span>
                      <span
                        className={clsx(
                          styles.filterLabel,
                          styles[`filterLabel-${option.value}`]
                        )}
                      >
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.btnFilterReset}
                  onClick={() => setSelectedMealPeriods([])}
                  disabled={selectedMealPeriods.length === 0}
                >
                  リセット
                </button>
              </div>
            ) : null}
            <ul>
              {visibleShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
