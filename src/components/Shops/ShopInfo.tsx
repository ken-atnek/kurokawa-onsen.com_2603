/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(INFO + MAP)
 * URL: src/components/Shops/ShopInfo.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

import type { ShopInfo, ShopHourRow } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

type Props = {
  info: ShopInfo;
};

export default function ShopInfo({ info }: Props) {
  return (
    <section className={styles.containerInfo}>
      <article>
        <dl className={styles.listInfo}>
          {info.hours.map((row, i) => (
            <div key={i}>
              <dt className={styles.itemInfoTitle}>{row.label}</dt>
              <dd className={styles.itemInfoBody}>{renderHourRow(row)}</dd>
            </div>
          ))}

          <div>
            <dt className={styles.itemInfoTitle}>住所</dt>
            <dd className={styles.itemInfoBody}>
              <div>〒{info.address.postalCode}</div>
              <div>{info.address.full}</div>
            </dd>
          </div>
        </dl>
        <div className={styles.boxMap}>
          <iframe
            src={info.mapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          />
          {info.mapLinkUrl ? (
            <ExternalLink href={info.mapLinkUrl}>GoogleMap</ExternalLink>
          ) : null}
        </div>
      </article>
    </section>
  );
}

function renderHourRow(row: ShopHourRow) {
  // timeRanges 形式
  if ('timeRanges' in row) {
    return (
      <div>
        {row.timeRanges.map((t, i) => (
          <div key={i}>
            <span>
              {t.open}～{t.close}
            </span>
            {t.note ? <span>（{t.note}）</span> : null}
          </div>
        ))}
      </div>
    );
  }

  // value 形式
  return <div>{renderMultiline(row.value)}</div>;
}

function renderMultiline(text: string) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
}
