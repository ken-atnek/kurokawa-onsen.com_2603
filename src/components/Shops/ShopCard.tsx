/* =======================================
 * 黒川温泉観光協会 店舗カード
 * URL:src/components/Shops/ShopCard.tsx
 * Created: 2026-02-14
 * Last updated: 2026-10-02
 * ======================================= */

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type { ShopHourRow, ShopWithStatus } from '@/types/shop';
import styles from './ShopCard.module.scss';
import ShopMealPeriodTags from '@/components/Shops/ShopMealPeriodTags';
type Props = {
  shop: ShopWithStatus;
};

export default function ShopCard({ shop }: Props) {
  const hasListInfo = shop.listInfoRows !== undefined;

  return (
    <li
      className={clsx(
        styles.boxShopCard,
        hasListInfo && styles['has-list-info']
      )}
    >
      <Link href={`/shops/detail?id=${shop.id}`}>
        <Image
          src={shop.thumb}
          alt={shop.name.join(' ')}
          width={330}
          height={223}
        />
        <svg className={styles.maskBorder} viewBox="0 0 330 223">
          <path
            d="M165 0L0 23.008V223.883H1V23.8276L165 1.02946L329 23.8176V223.883H330V23.008L165 0Z"
            fill="none"
            stroke="#000"
            strokeWidth="1"
          />
        </svg>
        <div
          data-status={shop.status.variant}
          className={clsx(
            styles.itemStatus,
            styles[`status-${shop.status.variant}`]
          )}
        >
          {shop.status.label}
        </div>
      </Link>
      <div className={styles.innerContents}>
        <div className={styles.wrapName}>
          <div
            className={clsx(
              styles.itemCategory,
              styles[`category-${shop.category}`]
            )}
          ></div>
          <h3>
            {shop.name.map((line, i) => (
              <span key={i}>
                {line}
                {i !== shop.name.length - 1 && <br />}
              </span>
            ))}
          </h3>
        </div>
        <div className={styles.boxDetails}>
          {shop.leadCopy?.[0] && <p>{shop.leadCopy[0]}</p>}
          {shop.category === 'food' && shop.mealPeriods?.length ? (
            <div className={styles.itemMealPeriods}>
              <ShopMealPeriodTags mealPeriods={shop.mealPeriods} />
            </div>
          ) : null}
        </div>
        {hasListInfo ? (
          <dl className={styles['list-shop-info']}>
            {shop.listInfoRows?.map((row) => (
              <ShopInfoRow key={row.label} row={row} />
            ))}
          </dl>
        ) : null}
        <div className={styles.itemTel}>
          {shop.tel && <span>{shop.tel}</span>}
        </div>
      </div>
    </li>
  );
}

function ShopInfoRow({ row }: { row: ShopHourRow }) {
  if ('timeRanges' in row) {
    const timeRanges = row.timeRanges.filter(
      (timeRange) => timeRange.open || timeRange.close || timeRange.note
    );

    if (timeRanges.length === 0) return null;

    return (
      <div>
        <dt>{row.label}</dt>
        <dd>
          {timeRanges.map((timeRange, index) => (
            <span key={index}>
              {timeRange.open || timeRange.close ? (
                <span>
                  {timeRange.open}～{timeRange.close}
                </span>
              ) : null}
              {timeRange.note ? <small>{timeRange.note}</small> : null}
            </span>
          ))}
        </dd>
      </div>
    );
  }

  if (!row.value.trim()) return null;

  return (
    <div>
      <dt>{row.label}</dt>
      <dd>
        {row.value.split(/\r?\n/).map((line, index) => (
          <span key={index}>{line}</span>
        ))}
      </dd>
    </div>
  );
}
