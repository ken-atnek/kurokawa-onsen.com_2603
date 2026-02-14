/* =======================================
 * 黒川温泉観光協会 店舗一覧ページ(view)
 * URL:src/components/Shops/ShopsList.tsx
 * Referenced in: : src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */
'use client';

import styles from '@/styles/PageShops.module.scss';
import type { ShopWithStatus } from '@/types/shop';
import ShopCard from '@/components/Shops/ShopCard';

type Props = {
  grouped: Record<string, ShopWithStatus[]>;
};

export default function ShopsList({ grouped }: Props) {
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
      {Object.entries(grouped).map(([category, shops]) => (
        <article key={category} id={category}>
          <div className={styles.boxH2}>
            <i className={styles.itemLeft}></i>
            <h2>{categoryLabels[category] ?? category}</h2>
            <i className={styles.itemRight}></i>
          </div>
          <p className={styles.notice}>※50音順で掲載しております</p>
          <ul>
            {shops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
