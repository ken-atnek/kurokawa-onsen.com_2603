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
import Link from 'next/link';
import type { ShopOnlineProduct } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';

type Props = {
  items: ShopOnlineProduct[];
  shopSlug: string;
  onlineProductsCount?: number;
};

export default function ShopOnlineProducts({
  items,
  shopSlug,
  onlineProductsCount,
}: Props) {
  console.log('[ShopOnlineProducts] render', {
    shopSlug,
    onlineProductsCount,
    itemsLen: items.length,
  });

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
  const hasCount =
    typeof onlineProductsCount === 'number'
      ? onlineProductsCount > 0
      : hasItems;

  // onlineProductsCount が 0 の店は表示しない
  if (!hasCount) return null;

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
                    src={
                      item.image && item.image.trim() !== ''
                        ? item.image
                        : '/images/no-image.webp'
                    }
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
                <Link
                  href={`/shops/${shopSlug}/products/${item.id}/`}
                  className={styles.buyUrl}
                >
                  購入する
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/shops/${shopSlug}/products/`}
            className={styles.btnOnlineList}
          >
            オンライン商品一覧
          </Link>
        </article>
      ) : null}
    </section>
  );
}
