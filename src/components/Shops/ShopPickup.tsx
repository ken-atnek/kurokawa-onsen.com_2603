/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ(PICKUP)
 * URL: src/components/Shops/ShopPickup.tsx
 * Referenced in: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
 * ======================================= */

'use client';

import { useMemo, useState } from 'react';

import type { ShopPickupItem } from '@/types/shop';
import styles from '@/styles/PageShopDetails.module.scss';
import Image from 'next/image';

type Props = {
  items: ShopPickupItem[];
};

export default function ShopPickup({ items }: Props) {
  const safeItems = useMemo(
    () =>
      Array.isArray(items)
        ? items
            .filter((item) => item.image && item.image.length > 0)
            .slice(0, 3)
        : [],
    [items]
  );

  // SCSSの fadeOut(0.25s) と合わせる
  const FADE_MS = 250;

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  if (!safeItems.length) return null;

  // 念のため範囲外対策（items差し替え時など）
  const currentIndex = activeIndex > safeItems.length - 1 ? 0 : activeIndex;

  const activeItem = safeItems[currentIndex];

  const handleSelect = (nextIndex: number) => {
    if (nextIndex === currentIndex) return;

    setPrevIndex(currentIndex);
    setActiveIndex(nextIndex);

    window.setTimeout(() => {
      setPrevIndex(null);
    }, FADE_MS);
  };

  return (
    <section className={styles.containerPickup}>
      <article>
        <div className={styles.boxPickupMain}>
          <figure className={styles.itemPickupFigure}>
            <div className={styles.boxImageStack}>
              {prevIndex !== null && safeItems[prevIndex] ? (
                <Image
                  src={safeItems[prevIndex].image}
                  alt={safeItems[prevIndex].title}
                  width={861}
                  height={560}
                  className={styles.imagePrev}
                />
              ) : null}

              <Image
                src={activeItem.image}
                alt={activeItem.title}
                width={861}
                height={560}
                className={styles.imageActive}
              />
            </div>

            <figcaption className={styles.itemPickupCaption}>
              {activeItem.title}
            </figcaption>
          </figure>
        </div>

        <ul className={styles.listPickupThumbs}>
          {safeItems.map((item, i) => {
            const isActive = i === currentIndex;

            return (
              <li key={item.id} className={styles.itemPickupThumb}>
                <button
                  type="button"
                  onClick={() => handleSelect(i)}
                  aria-current={isActive ? 'true' : undefined}
                  className={styles.btnPickupThumb}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className={styles.imgPickupThumb}
                    width={185}
                    height={120}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
