/* =======================================
 * 黒川温泉観光協会 加盟店一覧（TOP用ピックアップ / Client）
 * URL:src/components/Top/ContainerTopShopList.client.tsx
 * ======================================= */

'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import styles from '@/styles/PageTop.module.scss';
import ShopCard from '@/components/Shops/ShopCard';

import { getShopStatusView } from '@/lib/status';
import { getHoursRow } from '@/lib/shops/getHoursRow';

import type { ShopDetail, ShopWithStatus } from '@/types/shop';

type ShopIndexBase = {
  id: string;
  slug: string;
  category: string;
  name: string[];
  thumb: string;
  tel: string;
  leadCopy: string[];
};

type Props = {
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

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return (await res.json()) as T;
}

export default function ContainerTopShopListClient({ pickupCount = 3 }: Props) {
  const [picked, setPicked] = useState<ShopWithStatus[] | null>(null);

  // TOPの表示対象カテゴリ（必要に応じて変更OK）
  const allowedCategories = useMemo(() => new Set(['food', 'souvenir']), []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // 1) index を取得（本番は out/ 直下の /db を拾う）
        const indexList = await fetchJson<ShopIndexBase[]>(
          '/db/shops/shopsIndex.json'
        );

        // 2) まずカテゴリで絞る（detailsを全部取らないため）
        const candidates = indexList.filter((s) =>
          allowedCategories.has(s.category)
        );

        if (candidates.length === 0) {
          if (!cancelled) setPicked([]);
          return;
        }

        // 3) ランダム（クライアントのみで実行＝Hydration安全）
        const seed = Date.now() % 2147483647;
        const selected = seededShuffle(candidates, seed).slice(0, pickupCount);

        // 4) 選んだ分だけ details を取得
        const details = await Promise.all(
          selected.map(async (idx) => {
            const detail = await fetchJson<ShopDetail>(
              `/db/shops/details/${idx.id}.json`
            );

            const hoursRow = getHoursRow(detail.info.hours);
            const timeRanges = hoursRow?.timeRanges ?? [];

            const status = getShopStatusView({
              fallbackKey: detail.statusFallbackKey,
              closedWeekdays: detail.info.closedWeekdays,
              timeRanges,
            });

            return {
              ...idx,
              status,
            } as ShopWithStatus;
          })
        );

        // 5) openだけに絞る（今の client 側の条件踏襲）
        const openOnly = details.filter((s) => s.status.variant === 'open');

        if (!cancelled) setPicked(openOnly);
      } catch {
        if (!cancelled) setPicked([]);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [pickupCount, allowedCategories]);

  if (picked === null) return null; // ローディング表示したければここで

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
