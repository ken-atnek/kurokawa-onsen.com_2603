/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(INFO + MAP)
 * URL: src/components/Shops/ShopLinkList.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

import styles from '@/styles/PageShopDetails.module.scss';
import Link from 'next/link';

type Props = {
  locale?: 'ja' | 'en';
};

export default function ShopLinkList({ locale = 'ja' }: Props) {
  return (
    <section className={styles.containerLinkList}>
      <Link href={locale === 'en' ? '/en/shops/' : '/shops/'}>
        {locale === 'en' ? 'Back to Shops & Restaurants' : '加盟店一覧に戻る'}
      </Link>
    </section>
  );
}
