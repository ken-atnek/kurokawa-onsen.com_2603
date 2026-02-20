/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(INFO + MAP)
 * URL: src/components/Shops/ShopLinkList.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

import styles from '@/styles/PageShopDetails.module.scss';
import Link from 'next/link';

export default function ShopLinkList() {
  return (
    <section className={styles.containerLinkList}>
      <Link href={'/shops/'}>加盟店一覧に戻る</Link>
    </section>
  );
}
