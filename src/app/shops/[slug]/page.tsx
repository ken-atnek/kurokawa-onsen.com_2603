/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ
 * URL: src/app/shops/[slug]/page.tsx
 * Created: 2026-02-12
 * Last updated: 2026-02-12
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
/* =======================================
 * generateStaticParams（同期）
 * ======================================= */
export function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public/db/shops/shopsIndex.json');

  const file = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(file);

  return Array.isArray(data) ? data.map((item) => ({ slug: item.slug })) : [];
}

/* =======================================
 * Page
 * ======================================= */
export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = getIdFromSlug(slug);

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

  return (
    <>
      <ShopHeader
        name={detail.name}
        leadCopy={detail.leadCopy}
        tel={detail.info.tel}
        web={detail.info.web}
        category={detail.category}
        shopSlug={slug}
        hasOnlineList={hasOnline}
      />
      <ShopHero src={detail.heroImage} alt={detail.name} />
      <ShopPickup items={detail.pickupItems} />
      <ShopInfo info={detail.info} />
      <ShopRecommendedProducts
        items={detail.recommendedProducts}
        isLastSection={!hasOnline}
      />
      <ShopOnlineProducts items={onlineProducts} shopSlug={slug} />
    </>
  );
}

/* =======================================
 * slug → id変換
 * （本来は shopsIndex から引く）
 * ======================================= */
function getIdFromSlug(slug: string) {
  if (slug === 'warokuya') return '001';
  return slug;
}
