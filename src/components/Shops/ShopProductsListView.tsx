/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ(view)
 * URL: src/components/Shops/ShopProductsListView.tsx
 * Referenced in: src/components/Shops/ShopProductsListClient.tsx
 * Created: 2026-02-13
 * Last updated: 2026-05-04
 * ======================================= */
'use client';

import type { ShopDetail, ShopOnlineProduct } from '@/types/shop';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from '@/styles/PageShopDetails.module.scss';
import ShopHeader from '@/components/Shops/ShopHeader';

type Props = {
  shopSlug: string; // ※ 呼び出し側互換のため名前は残す（中身は id を渡す運用）
  detail: ShopDetail;
  items: ShopOnlineProduct[];
};

export default function ShopProductsListView({
  shopSlug,
  detail,
  items,
}: Props) {
  // ✅ 中では id として扱う（slug混乱防止）
  const shopId = shopSlug;

  const formatYen = useMemo(() => {
    return (value: number) => new Intl.NumberFormat('ja-JP').format(value);
  }, []);

  if (!items.length) return null;

  return (
    <>
      <ShopHeader
        name={detail.name}
        leadCopy={detail.leadCopy}
        tel={detail.info.tel}
        web={detail.info.web}
        category={detail.category}
        shopSlug={shopId}
        hasOnlineList={false}
        statusFallbackKey={detail.statusFallbackKey}
      />

      <section className={styles.containerProductList}>
        <article>
          <div className={styles.boxH2}>
            <i className={styles.itemLeft}></i>
            <h2>オンライン商品</h2>
            <i className={styles.itemRight}></i>
          </div>

          <ul className={styles.listOnline}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
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

                <p className={styles.itemPrice}>
                  <i>¥</i>
                  {formatYen(item.price)} <span>（税込）</span>
                </p>

                <Link
                  href={`/shops/product-detail?id=${shopId}&productId=${item.id}`}
                  className={styles.buyUrl}
                >
                  購入する
                </Link>
              </li>
            ))}
          </ul>

          <Link href={`/shops/${shopId}/`} className={styles.linkShopDetails}>
            店舗詳細ページに戻る
          </Link>
        </article>
      </section>
    </>
  );
}
