/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（おすすめメニュー）
 * URL: src/components/Shops/ShopRecommendedMenus.tsx
 * Referenced in: src/components/Shops/ShopDetailClient.tsx
 * Created: 2026-09-04
 * ======================================= */

import Image from 'next/image';
import clsx from 'clsx';
import type { ShopReservationMenu } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';

type Props = {
  items: ShopReservationMenu[];
  isLastSection?: boolean;
};

export default function ShopRecommendedMenus({ items, isLastSection }: Props) {
  const enabledItems = items.filter((item) => item.enabled);

  if (enabledItems.length === 0) return null;

  return (
    <section
      className={clsx(
        styles.containerRecommended,
        isLastSection && styles.isLastSection
      )}
    >
      <article>
        <div className={styles.boxH2}>
          <i className={styles.itemLeft}></i>
          <h2>お食事メニュー</h2>
          <i className={styles.itemRight}></i>
        </div>
        <ul className={styles.listRecommended}>
          {enabledItems.map((item) => (
            <li key={item.id}>
              <div className={styles.itemImage}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={520}
                  height={340}
                />
              </div>
              <h3>{item.name}</h3>
              <div className={styles.itemPrice}>
                {item.price.toLocaleString()}
                <span>円{item.taxIncluded ? '（税込）' : ''}</span>
              </div>
              <p className={styles.itemRecommendedDescription}>
                {renderMultiline(item.description)}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

function renderMultiline(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
}
