/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ
 * URL:src/app/shops/[slug]/products/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */

import type { ShopDetail, ShopOnlineProduct } from '@/types/shop';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ShopProductsListView from '@/components/Shops/ShopProductsListView';

/* =======================================
 * generateStaticParams（同期）
 * output: 'export' 対応
 * ======================================= */
export function generateStaticParams() {
  const shopsIndexPath = path.join(
    process.cwd(),
    'public/db/shops/shopsIndex.json'
  );

  if (!fs.existsSync(shopsIndexPath)) return [];

  const shops = JSON.parse(fs.readFileSync(shopsIndexPath, 'utf-8'));

  if (!Array.isArray(shops)) return [];

  return shops
    .map((shop) => shop?.slug)
    .filter((slug): slug is string => typeof slug === 'string')
    .map((slug) => ({ slug }));
}

export default function ShopProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return ShopProductsPageInner({ params });
}

async function ShopProductsPageInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const shopId = getIdFromSlug(slug);
  const detailPath = path.join(
    process.cwd(),
    `public/db/shops/details/${shopId}.json`
  );

  if (!fs.existsSync(detailPath)) return notFound();

  const detail: ShopDetail = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));
  const productsIndexPath = path.join(
    process.cwd(),
    `public/db/shops/products/${shopId}/index.json`
  );

  if (!fs.existsSync(productsIndexPath)) return notFound();

  const items: ShopOnlineProduct[] = JSON.parse(
    fs.readFileSync(productsIndexPath, 'utf-8')
  );

  if (!Array.isArray(items)) return notFound();

  return <ShopProductsListView shopSlug={slug} detail={detail} items={items} />;
}

/* =======================================
 * slug → id変換
 * ======================================= */
function getIdFromSlug(slug: string) {
  const shopsIndexPath = path.join(
    process.cwd(),
    'public/db/shops/shopsIndex.json'
  );

  if (!fs.existsSync(shopsIndexPath)) return slug;

  const shops = JSON.parse(fs.readFileSync(shopsIndexPath, 'utf-8'));

  if (!Array.isArray(shops)) return slug;

  const found = shops.find(
    (shop: { id?: string; slug?: string }) => shop?.slug === slug
  );

  return typeof found?.id === 'string' ? found.id : slug;
}
