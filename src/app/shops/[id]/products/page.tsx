/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ
 * URL:src/app/shops/[id]/products/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-19
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
    .map((shop) => shop?.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
    .map((id) => ({ id }));
}

/* =======================================
 * Page
 * ======================================= */
export default async function ShopProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const detailPath = path.join(
    process.cwd(),
    `public/db/shops/details/${id}.json`
  );

  if (!fs.existsSync(detailPath)) return notFound();

  const detail: ShopDetail = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));

  const productsIndexPath = path.join(
    process.cwd(),
    `public/db/shops/products/${id}/index.json`
  );

  if (!fs.existsSync(productsIndexPath)) return notFound();

  const items: ShopOnlineProduct[] = JSON.parse(
    fs.readFileSync(productsIndexPath, 'utf-8')
  );

  if (!Array.isArray(items)) return notFound();

  // ※ props名が shopSlug のままでも、とりあえず id を渡せばリンク先は安定する
  return <ShopProductsListView shopSlug={id} detail={detail} items={items} />;
}
