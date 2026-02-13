/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(HEADER)
 * URL:src/components/Shops/ShopHeader.tsx
 * Referenced in: : src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */
'use client';
import clsx from 'clsx';
import { getShopStatusView } from '@/lib/status';
import type { ShopDetail, ShopTimeRange } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import Link from 'next/link';
type Props = {
  name: ShopDetail['name'];
  leadCopy: ShopDetail['leadCopy'];
  tel: string;
  fax?: string;
  web?: string;
  category: ShopDetail['category'];
  shopSlug: string;
  hasOnlineList?: boolean;
  statusFallbackKey: ShopDetail['statusFallbackKey'];
  closedWeekdays?: ShopDetail['info']['closedWeekdays'];
  timeRanges?: ShopTimeRange[];
};

export default function ShopHeader({
  name,
  leadCopy,
  tel,
  fax,
  web,
  category,
  shopSlug,
  hasOnlineList,
  statusFallbackKey,
  closedWeekdays,
  timeRanges,
}: Props) {
  const status = getShopStatusView({
    fallbackKey: statusFallbackKey,
    closedWeekdays,
    timeRanges,
  });
  return (
    <section
      className={clsx(styles.containerHeader, styles[`category-${category}`])}
    >
      <article>
        <div className={styles.itemCategory}></div>
        <div className={styles.boxContents}>
          <div
            className={clsx(
              styles.itemStatus,
              styles[`status-${status.variant}`]
            )}
          >
            {status.label}
          </div>
          <h2>
            {name.map((line, i) => (
              <span key={i}>
                {line}
                {i !== name.length - 1 && <br />}
              </span>
            ))}
          </h2>
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
            {fax ? (
              <div>
                <dt>FAX</dt>
                <dd>
                  <span>{fax}</span>
                </dd>
              </div>
            ) : null}
            {web ? (
              <div>
                <dt>WEB</dt>
                <dd>
                  <ExternalLink href={web}>{web}</ExternalLink>
                </dd>
              </div>
            ) : null}
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
