/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ
 * URL: src/app/shops/[id]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-19
 * ======================================= */

import type { ShopDetail, ShopOnlineProduct } from '@/types/shop';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

import ShopHeader from '@/components/Shops/ShopHeader';
import ShopHero from '@/components/Shops/ShopHero';
import ShopPickup from '@/components/Shops/ShopPickup';
import ShopInfo from '@/components/Shops/ShopInfo';
import ShopRecommendedProducts from '@/components/Shops/ShopRecommendedProducts';
import ShopOnlineProducts from '@/components/Shops/ShopOnlineProducts';
import { getHoursRow } from '@/lib/shops/getHoursRow';

/* =======================================
 * generateStaticParams（同期）
 * ======================================= */
export function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/db/shops/shopsIndex.json');

  if (!fs.existsSync(filePath)) {
    return [];
  }

  const file = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(file);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((item: { id?: unknown }) => item.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
    .map((id) => ({ id }));
}

/* =======================================
 * Page
 * ======================================= */
export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const filePath = path.join(
    process.cwd(),
    `public/db/shops/details/${id}.json`
  );

  if (!fs.existsSync(filePath)) return notFound();

  const file = fs.readFileSync(filePath, 'utf-8');
  const detail: ShopDetail = JSON.parse(file);

  // オンライン商品一覧（店舗ごと）
  const productsIndexPath = path.join(
    process.cwd(),
    `public/db/shops/products/${id}/index.json`
  );

  let onlineProducts: ShopOnlineProduct[] = [];
  if (fs.existsSync(productsIndexPath)) {
    const productsFile = fs.readFileSync(productsIndexPath, 'utf-8');
    onlineProducts = JSON.parse(productsFile);
  }

  const hasOnline =
    onlineProducts.length > 0 ||
    (detail.onlineProductsCount ?? 0) > 0 ||
    Boolean(detail.onlineShopUrl);

  const hoursRow = getHoursRow(detail.info.hours);
  const timeRanges = hoursRow?.timeRanges ?? [];

  return (
    <>
      <ShopHeader
        name={detail.name}
        leadCopy={detail.leadCopy}
        tel={detail.info.tel}
        fax={detail.info.fax}
        web={detail.info.web}
        mail={detail.info.mail}
        category={detail.category}
        shopSlug={id}
        hasOnlineList={hasOnline}
        statusFallbackKey={detail.statusFallbackKey}
        closedWeekdays={detail.info.closedWeekdays}
        timeRanges={timeRanges}
      />

      <ShopHero src={detail.heroImage} alt={detail.name.join(' ')} />
      <ShopPickup items={detail.pickupItems} />
      <ShopInfo info={detail.info} />

      <ShopRecommendedProducts
        items={detail.recommendedProducts}
        isLastSection={!hasOnline}
      />

      <ShopOnlineProducts items={onlineProducts} shopSlug={id} />
    </>
  );
}
