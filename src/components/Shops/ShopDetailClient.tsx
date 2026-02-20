/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（クライアント）
 * URL: src/components/Shops/ShopDetailClient.tsx
 * Created: 2026-02-19
 * Last updated: 2026-02-19
 * ======================================= */
'use client';

import { useEffect, useState } from 'react';
import type { ShopDetail } from '@/types/shop';
import ShopHeader from '@/components/Shops/ShopHeader';
import ShopHero from '@/components/Shops/ShopHero';
import ShopPickup from '@/components/Shops/ShopPickup';
import ShopInfo from '@/components/Shops/ShopInfo';
import ShopRecommendedProducts from '@/components/Shops/ShopRecommendedProducts';
import ShopOnlineProducts from '@/components/Shops/ShopOnlineProducts';
import { getHoursRow } from '@/lib/shops/getHoursRow';

type Props = {
  id: string;
};

export default function ShopDetailClient({ id }: Props) {
  const [detail, setDetail] = useState<ShopDetail | null>(null);

  useEffect(() => {
    fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' })
      .then((res) => res.json())
      .then(setDetail);
  }, [id]);

  if (!detail) return null;
  const hoursRow = getHoursRow(detail.info.hours);
  const timeRanges = hoursRow?.timeRanges ?? [];
  const hasOnlineProducts = (detail.onlineProductsCount ?? 0) > 0;
  return (
    <>
      <ShopHeader
        name={detail.name}
        leadCopy={detail.leadCopy}
        tel={detail.info.tel}
        web={detail.info.web}
        mail={detail.info.mail}
        category={detail.category}
        shopSlug={id}
        statusFallbackKey={detail.statusFallbackKey}
        closedWeekdays={detail.info.closedWeekdays}
        timeRanges={timeRanges}
      />

      <ShopHero src={detail.heroImage} alt={detail.name.join(' ')} />
      <ShopPickup items={detail.pickupItems} />
      <ShopInfo info={detail.info} />

      <ShopRecommendedProducts
        items={detail.recommendedProducts}
        isLastSection={!hasOnlineProducts}
      />

      {hasOnlineProducts ? (
        <ShopOnlineProducts
          items={[]}
          shopSlug={id}
          onlineProductsCount={detail.onlineProductsCount}
        />
      ) : null}
    </>
  );
}
