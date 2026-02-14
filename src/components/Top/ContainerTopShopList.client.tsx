/* =======================================
 * 黒川温泉観光協会 加盟店一覧（TOP用ピックアップ / Client）
 * URL:src/components/Top/ContainerTopShopList.client.tsx
 * Referenced in: ContainerTopShopList.server.tsx
 * Created: 2026-02-14
 * Last updated: 2026-02-14
 * ======================================= */

'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import styles from '@/styles/PageTop.module.scss';
import type { ShopWithStatus } from '@/types/shop';
import ShopCard from '@/components/Shops/ShopCard';

type Props = {
  shops: ShopWithStatus[];
  pickupCount?: number;
};

// 乱数生成（seed固定で毎回同じ順序を作る）
function mulberry32(seed: number) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle<T>(list: T[], seed: number): T[] {
  const a = [...list];
  const rand = mulberry32(seed);
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ContainerTopShopListClient({
  shops,
  pickupCount = 3,
}: Props) {
  // マウント時に1回だけ固定seedを作る（これで「リロードするまでランダム固定」になる）
  const [seed] = useState(() => {
    // Date.now でもOK。よりばらけさせたいなら Math.random も混ぜてOK
    return Date.now() % 2147483647;
  });

  const eligible = useMemo(() => {
    return shops.filter(
      (s) =>
        (s.category === 'food' || s.category === 'souvenir') &&
        s.status.variant === 'open'
    );
  }, [shops]);

  const picked = useMemo(() => {
    if (eligible.length === 0) return [];
    return seededShuffle(eligible, seed).slice(0, pickupCount);
  }, [eligible, seed, pickupCount]);

  if (picked.length === 0) return null;

  return (
    <section
      aria-labelledby="top-shop-list-title"
      className={styles.containerTopShopList}
    >
      <h2 id="top-shop-list-title">加盟店</h2>

      <ul>
        {picked.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </ul>

      <Link href="/shops/" className={styles.linkList}>
        加盟店一覧を見る
      </Link>
    </section>
  );
}
