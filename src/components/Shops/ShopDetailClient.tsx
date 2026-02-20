/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（クライアント）
 * URL: src/components/Shops/ShopDetailClient.tsx
 * Created: 2026-02-19
 * Last updated: 2026-02-19
 * ======================================= */
'use client';
import type { ShopOnlineProduct } from '@/types/shop';
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
  const [onlineItems, setOnlineItems] = useState<ShopOnlineProduct[]>([]);
  useEffect(() => {
    fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' })
      .then((res) => res.json())
      .then(setDetail);
  }, [id]);

  useEffect(() => {
    const count = detail?.onlineProductsCount ?? 0;

    if (count <= 0) {
      setOnlineItems([]);
      return;
    }

    fetch(`/db/shops/products/${id}/index.json`, { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOnlineItems(data);
        } else {
          setOnlineItems([]);
        }
      })
      .catch(() => setOnlineItems([]));
  }, [id, detail?.onlineProductsCount]);

  if (!detail) return null;

  const hoursRow = getHoursRow(detail.info.hours);
  const timeRanges = hoursRow?.timeRanges ?? [];
  const onlineProductsCount = detail.onlineProductsCount ?? 0;
  const hasOnlineProducts = onlineProductsCount > 0;
  console.log('=== ShopDetail Debug ===');
  console.log('id:', id);
  console.log('detail.id:', detail.id);
  console.log('onlineProductsCount:', onlineProductsCount);
  console.log('typeof:', typeof onlineProductsCount);
  console.log('hasOnlineProducts:', (onlineProductsCount ?? 0) > 0);

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
        hasOnlineList={hasOnlineProducts}
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
          items={onlineItems}
          shopSlug={id}
          onlineProductsCount={onlineProductsCount}
        />
      ) : null}
    </>
  );
}
