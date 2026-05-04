/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(HEADER)
 * URL: src/components/Shops/ShopHeader.tsx
 * Referenced in: src/components/Shops/ShopDetailClient.tsx, src/components/Shops/ShopProductsListView.tsx
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
  mapLinkUrl?: string;
  mail?: string;
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
  mapLinkUrl,
  mail,
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
            <div className={styles.itemMap}>
              <dt>MAP</dt>
              <dd>
                {mapLinkUrl ? (
                  <ExternalLink href={mapLinkUrl}>
                    <span>GoogleMap</span>
                  </ExternalLink>
                ) : null}
              </dd>
            </div>
            <div>
              <dt>TEL</dt>
              <dd>
                <ExternalLink
                  href={`tel:${tel.replace(/-/g, '')}`}
                  className={styles.linkTel}
                >
                  <span>{tel}</span>
                </ExternalLink>
              </dd>
            </div>
            {fax ? (
              <div className={styles.itemFax}>
                <dt>FAX</dt>
                <dd>
                  <span>{fax}</span>
                </dd>
              </div>
            ) : null}
            {mail ? (
              <div>
                <dt>MAIL</dt>
                <dd>
                  <ExternalLink
                    href={`mailto:${mail}`}
                    className={styles.linkMail}
                  >
                    <i>{mail}</i>
                  </ExternalLink>
                </dd>
              </div>
            ) : null}
            {web ? (
              <div>
                <dt>WEB</dt>
                <dd>
                  <ExternalLink href={web} className={styles.itemWeb}>
                    <i>{web}</i>
                  </ExternalLink>
                </dd>
              </div>
            ) : null}
          </dl>
          {hasOnlineList ? (
            <Link
              href={`/shops/products?id=${shopSlug}`}
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
