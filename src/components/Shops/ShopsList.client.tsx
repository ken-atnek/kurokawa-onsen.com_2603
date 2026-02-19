/* =======================================
 * 黒川温泉観光協会 加盟店一覧ページ(クライアント)
 * URL:src/components/Shops/ShopsList.client.tsx
 * Created: 2026-02-14
 * Last updated: 2026-02-19
 * ======================================= */

'use client';

import { useEffect, useMemo, useState } from 'react';

import ShopsList from '@/components/Shops/ShopsList';
import { getShopStatusView } from '@/lib/status';
import { getHoursRow } from '@/lib/shops/getHoursRow';

import type { ShopDetail, ShopIndexItem, ShopWithStatus } from '@/types/shop';
import type { ShopStatusView } from '@/lib/status';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return (await res.json()) as T;
}

export default function ShopsListClient() {
  const [grouped, setGrouped] = useState<Record<
    string,
    ShopWithStatus[]
  > | null>(null);

  const defaultStatus: ShopStatusView = {
    key: 'other',
    label: '確認中',
    variant: 'other',
  };
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const shops = await fetchJson<ShopIndexItem[]>(
          '/db/shops/shopsIndex.json'
        );

        // details を全部読む（まとめJSONなし方針なのでここは全件fetch）
        const detailsList = await Promise.all(
          shops.map(async (shop) => {
            try {
              const detail = await fetchJson<ShopDetail>(
                `/db/shops/details/${shop.id}.json`
              );

              const hoursRow = getHoursRow(detail.info.hours);
              const timeRanges = hoursRow?.timeRanges ?? [];

              const status = getShopStatusView({
                fallbackKey: detail.statusFallbackKey,
                closedWeekdays: detail.info.closedWeekdays,
                timeRanges,
              });

              return { ...shop, status } as ShopWithStatus;
            } catch {
              // details無い場合も落とさない（従来の挙動維持）
              return { ...shop, status: defaultStatus } as ShopWithStatus;
            }
          })
        );

        const nextGrouped = detailsList.reduce<
          Record<string, ShopWithStatus[]>
        >((acc, s) => {
          const key = s.category;
          if (!acc[key]) acc[key] = [];
          acc[key].push(s);
          return acc;
        }, {});

        if (!cancelled) setGrouped(nextGrouped);
      } catch {
        if (!cancelled) setGrouped({});
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (grouped === null) return <p>読み込み中...</p>;

  return <ShopsList grouped={grouped} />;
}
