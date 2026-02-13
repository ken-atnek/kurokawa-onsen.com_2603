/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ(view)
 * URL:src/components/Shops/ShopProductsListView.tsx
 * Referenced in: : src/app/shops/[slug]/products/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */
'use client';

import type { ShopDetail, ShopOnlineProduct } from '@/types/shop';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from '@/styles/PageShopDetails.module.scss';
import ShopHeader from '@/components/Shops/ShopHeader';
type Props = {
  shopSlug: string;
  detail: ShopDetail;
  items: ShopOnlineProduct[];
};

export default function ShopProductsListView({
  shopSlug,
  detail,
  items,
}: Props) {
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
        shopSlug={shopSlug}
        hasOnlineList={false}
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
                    src={item.image}
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
                  href={`/shops/${shopSlug}/products/${item.id}/`}
                  className={styles.buyUrl}
                >
                  購入する
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/shops/${shopSlug}/`} className={styles.linkShopDetails}>
            店舗詳細ページに戻る
          </Link>
        </article>
      </section>
    </>
  );
}
