/* =======================================
 * 黒川温泉観光協会 店舗一覧ページ(view)
 * URL:src/components/Shops/ShopsList.tsx
 * Referenced in: : src/app/shops/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */
'use client';

import Link from 'next/link';
import styles from '@/styles/PageShops.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import type { ShopWithStatus } from '@/types/shop';
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
              <li key={shop.id}>
                <Link href={`/shops/${shop.slug}/`}>
                  <Image
                    src={shop.thumb}
                    alt={shop.name.join(' ')}
                    width={330}
                    height={223}
                  />
                  <svg className={styles.maskBorder} viewBox="0 0 330 223">
                    <path
                      d="M165 0L0 23.008V223.883H1V23.8276L165 1.02946L329 23.8176V223.883H330V23.008L165 0Z"
                      fill="none"
                      stroke="#000"
                      strokeWidth="1"
                    />
                  </svg>
                  <div
                    data-status={shop.status.variant}
                    className={clsx(
                      styles.itemStatus,
                      styles[`status-${shop.status.variant}`]
                    )}
                  >
                    {shop.status.label}
                  </div>
                </Link>
                <div className={styles.wrapName}>
                  <div
                    className={clsx(
                      styles.itemCategory,
                      styles[`category-${shop.category}`]
                    )}
                  ></div>
                  <h3>
                    {shop.name.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i !== shop.name.length - 1 && <br />}
                      </span>
                    ))}
                  </h3>
                </div>
                {shop.leadCopy?.[0] && <p>{shop.leadCopy[0]}</p>}
                <div className={styles.itemTel}>
                  <span>{shop.tel}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
