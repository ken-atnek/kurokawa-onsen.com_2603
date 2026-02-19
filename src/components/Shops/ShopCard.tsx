/* =======================================
 * 黒川温泉観光協会 店舗カード
 * URL:src/components/Shops/ShopCard.tsx
 * Created: 2026-02-14
 * Last updated: 2026-02-14
 * ======================================= */

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import type { ShopWithStatus } from '@/types/shop';
import styles from './ShopCard.module.scss';
type Props = {
  shop: ShopWithStatus;
};

export default function ShopCard({ shop }: Props) {
  return (
    <li className={styles.boxShopCard}>
      <Link href={`/shops/${shop.id}/`}>
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
      {shop.leadCopy?.[0] && <p>{shop.leadCopy[0]}</p>}
      <div className={styles.itemTel}>
        <span>{shop.tel}</span>
      </div>
    </li>
  );
}
