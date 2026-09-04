/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(INFO + MAP)
 * URL: src/components/Shops/ShopInfo.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

import type {
  ShopInfo,
  ShopHourRow,
  ShopReservationBasic,
} from '@/types/shop';
import clsx from 'clsx';
import styles from '@/styles/PageShopDetails.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import Image from 'next/image';
import ShopReservationCalendar from '@/components/Shops/ShopReservationCalendar';

type Props = {
  shopId: string;
  info: ShopInfo;
  category: string;
  hasReservation: boolean;
  reservationBasic: ShopReservationBasic | null;
};

export default function ShopInfo({
  shopId,
  info,
  category,
  hasReservation,
  reservationBasic,
}: Props) {
  const safeMapUrl = info.mapUrl?.replace(/^http:/, 'https:');
  const isFoodShop = category === 'food';

  return (
    <section className={styles.containerInfo}>
      <article
        className={clsx(
          styles.boxInfoContent,
          hasReservation ? styles.isReservationShop : styles.isDefaultShop
        )}
      >
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
            src={safeMapUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          />
          {info.mapLinkUrl ? (
            <ExternalLink href={info.mapLinkUrl}>GoogleMap</ExternalLink>
          ) : null}
        </div>
        {hasReservation && reservationBasic ? (
          <ShopReservationCalendar
            shopId={shopId}
            reservationBasic={reservationBasic}
          />
        ) : null}
      </article>
      {isFoodShop ? (
        <ExternalLink
          href="https://www.kurokawaonsen.or.jp/"
          className={styles.linkStayPlan}
        >
          <Image
            src="/images/common/link-stay-plan.webp"
            alt="素泊まりプラン"
            width={600}
            height={80}
          />
        </ExternalLink>
      ) : null}
    </section>
  );
}

function renderHourRow(row: ShopHourRow) {
  // timeRanges 形式
  if ('timeRanges' in row) {
    const filtered = row.timeRanges.filter((t) => t.open || t.close || t.note);

    if (filtered.length === 0) return null;

    return (
      <div>
        {filtered.map((t, i) => (
          <div key={i}>
            {t.open || t.close ? (
              <span>
                {t.open}～{t.close}
              </span>
            ) : null}
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
