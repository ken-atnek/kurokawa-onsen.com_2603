/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(HEADER)
 * URL:src/components/Shops/ShopHeader.tsx
 * Referenced in: : src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */
import clsx from 'clsx';

import type { ShopDetail } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import Link from 'next/link';
type Props = {
  name: ShopDetail['name'];
  leadCopy: ShopDetail['leadCopy'];
  tel: string;
  web?: string;
  category: ShopDetail['category'];
  shopSlug: string;
  hasOnlineList?: boolean;
};

export default function ShopHeader({
  name,
  leadCopy,
  tel,
  web,
  category,
  shopSlug,
  hasOnlineList,
}: Props) {
  return (
    <section
      className={clsx(styles.containerHeader, styles[`category-${category}`])}
    >
      <article>
        <div className={styles.itemCategory}></div>
        <div className={styles.boxContents}>
          <h2>{name}</h2>
          {leadCopy.map((line, i) => (
            <p key={i} className={styles.leadCopy}>
              {line}
            </p>
          ))}
          <dl className={styles.wrapShopInfo}>
            <div>
              <dt>TEL</dt>
              <dd>
                <ExternalLink href={`tel:${tel.replace(/-/g, '')}`}>
                  {tel}
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt>WEB</dt>
              <dd>
                <ExternalLink href={web}>{web}</ExternalLink>
              </dd>
            </div>
          </dl>
          {hasOnlineList ? (
            <Link
              href={`/shops/${shopSlug}/products/`}
              className={styles.btnOnlineList}
            >
              オンライン商品一覧
            </Link>
          ) : null}
        </div>
      </article>
    </section>
  );
}
