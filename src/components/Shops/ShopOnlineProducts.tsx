/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（オンライン商品）
 * URL: src/components/Shops/ShopOnlineProducts.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */
'use client';
import { useMemo } from 'react';
import Image from 'next/image';
import type { ShopOnlineProduct } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

type Props = {
  items: ShopOnlineProduct[];
  onlineShopUrl?: string;
};

export default function ShopOnlineProducts({ items, onlineShopUrl }: Props) {
  const displayItems = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return [];

    // シードを作成（itemsのid連結から）
    const seed = items.map((i) => i.id).join('');

    // 簡易ハッシュ関数（純粋関数）
    const hash = seed.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    // 疑似ランダムソート（Math.random不使用）
    const sorted = [...items].sort((a, b) => {
      const aScore = (a.id.charCodeAt(0) + hash) % 100;
      const bScore = (b.id.charCodeAt(0) + hash) % 100;
      return aScore - bScore;
    });

    return sorted.slice(0, 3);
  }, [items]);

  const hasItems = displayItems.length > 0;
  const hasListUrl =
    typeof onlineShopUrl === 'string' && onlineShopUrl.length > 0;

  // 商品もURLも無い店は表示しない
  if (!hasItems && !hasListUrl) return null;

  return (
    <section className={styles.containerOnline}>
      {hasItems ? (
        <article>
          <div className={styles.boxH2}>
            <i className={styles.itemLeft}></i>
            <h2>オンライン商品</h2>
            <i className={styles.itemRight}></i>
          </div>
          <ul className={styles.listOnline}>
            {displayItems.map((item) => (
              <li key={item.id}>
                <div className={styles.itemImage}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={520}
                    height={340}
                  />
                </div>
                <h3>{item.title}</h3>
                {item.price ? (
                  <div className={styles.itemPrice}>
                    <i>¥</i>
                    {item.price.toLocaleString('ja-JP')}
                    <span>（税込）</span>
                  </div>
                ) : null}
                <button type="button" className={styles.buyUrl}>
                  購入する
                </button>
              </li>
            ))}
          </ul>
        </article>
      ) : null}
      {hasListUrl ? (
        <ExternalLink href={onlineShopUrl} className={styles.btnOnlineList}>
          オンライン商品一覧を見る
        </ExternalLink>
      ) : null}
    </section>
  );
}
