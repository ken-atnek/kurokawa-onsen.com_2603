/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（おすすめ商品）
 * URL: src/components/Shops/ShopRecommendedProducts.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

import Image from 'next/image';
import type { ShopRecommendedProduct } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import clsx from 'clsx';

type Props = {
  items: ShopRecommendedProduct[];
  isLastSection?: boolean;
};

export default function ShopRecommendedProducts({
  items,
  isLastSection,
}: Props) {
  if (!items || items.length === 0) return null;

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
          <h2>おすすめ商品</h2>
          <i className={styles.itemRight}></i>
        </div>
        <ul className={styles.listRecommended}>
          {items.map((item) => (
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
              {item.price && (
                <div className={styles.itemPrice}>
                  {item.price}
                  <span>（税込）</span>
                </div>
              )}

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
