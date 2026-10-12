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
  locale?: 'ja' | 'en';
};

const mealPeriodLabels: Record<'ja' | 'en', Record<ShopMealPeriod, string>> = {
  ja: {
    morning: 'モーニング',
    lunch: 'ランチ',
    dinner: 'ディナー',
  },
  en: {
    morning: 'Breakfast',
    lunch: 'Lunch',
    dinner: 'Dinner',
  },
};

export default function ShopsList({ grouped, locale = 'ja' }: Props) {
  const [selectedMealPeriods, setSelectedMealPeriods] = useState<
    ShopMealPeriod[]
  >([]);

  const labels = {
    ja: {
      categories: {
        food: 'お食事処一覧',
        souvenir: 'おみやげ処一覧',
        other: '他業種店一覧',
      },
      filterAria: '提供時間帯で絞り込み',
      filterTitle: '絞り込み',
      reset: 'リセット',
    },
    en: {
      categories: {
        food: 'Restaurants & Cafés',
        souvenir: 'Souvenir Shops',
        other: 'Other Shops & Services',
      },
      filterAria: 'Filter by meal time',
      filterTitle: 'Filter',
      reset: 'Reset',
    },
  };
  const copy = labels[locale];
  const mealPeriodOptions = (
    ['morning', 'lunch', 'dinner'] as ShopMealPeriod[]
  ).map((value) => ({ value, label: mealPeriodLabels[locale][value] }));
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
          {copy.categories.food}
        </a>
        <a href="#souvenir" onClick={(e) => handleAnchorClick(e, 'souvenir')}>
          {copy.categories.souvenir}
        </a>
        <a href="#other" onClick={(e) => handleAnchorClick(e, 'other')}>
          {copy.categories.other}
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
              <h2>
                {copy.categories[category as keyof typeof copy.categories] ??
                  category}
              </h2>
              <i className={styles.itemRight}></i>
            </div>
            {/* <p className={styles.notice}>※50音順で掲載しております</p> */}
            {category === 'food' ? (
              <div
                className={styles.boxMealFilter}
                role="group"
                aria-label={copy.filterAria}
              >
                <div className={styles.filterTitle}>
                  <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M3 6h18M3 12h18M3 18h18" />
                    <circle cx="8" cy="6" r="2" />
                    <circle cx="16" cy="12" r="2" />
                    <circle cx="10" cy="18" r="2" />
                  </svg>
                  <span>{copy.filterTitle}</span>
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
                  {copy.reset}
                </button>
              </div>
            ) : null}
            <ul>
              {visibleShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} locale={locale} />
              ))}
            </ul>
          </article>
        );
      })}
    </section>
  );
}
