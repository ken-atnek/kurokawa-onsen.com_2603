/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ
 * URL: src/app/shops/[id]/products/[productId]/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-19
 * ======================================= */

import type { ShopDetail, ShopProductDetail } from '@/types/shop';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ShopProductDetailView from '@/components/Shops/ShopProductDetailView';

/* =======================================
 * generateStaticParams（同期）
 * 商品詳細ページ用（output: 'export' 対応）
 * ======================================= */
export function generateStaticParams() {
  const shopsIndexPath = path.join(
    process.cwd(),
    'public/db/shops/shopsIndex.json'
  );

  if (!fs.existsSync(shopsIndexPath)) return [];

  const shops = JSON.parse(fs.readFileSync(shopsIndexPath, 'utf-8'));
  if (!Array.isArray(shops)) return [];

  const params: { id: string; productId: string }[] = [];

  for (const shop of shops) {
    const id = shop?.id;
    if (typeof id !== 'string' || id.length === 0) continue;

    const productsIndexPath = path.join(
      process.cwd(),
      `public/db/shops/products/${id}/index.json`
    );

    // 商品indexが無い店舗はスキップ（オンライン商品なし）
    if (!fs.existsSync(productsIndexPath)) continue;

    const items = JSON.parse(fs.readFileSync(productsIndexPath, 'utf-8'));
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      // ✅ index.json のキーが id / productId どちらでも対応
      const productId = item?.id ?? item?.productId;

      if (typeof productId !== 'string' || productId.length === 0) continue;

      params.push({ id, productId });
    }
  }

  return params;
}

/* =======================================
 * Page
 * ======================================= */
export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ id: string; productId: string }>;
}) {
  const { id, productId } = await params;

  // 店舗詳細（店名を出す用）
  const shopDetailPath = path.join(
    process.cwd(),
    `public/db/shops/details/${id}.json`
  );
  if (!fs.existsSync(shopDetailPath)) return notFound();

  const shopDetail: ShopDetail = JSON.parse(
    fs.readFileSync(shopDetailPath, 'utf-8')
  );

  // 商品詳細
  const productPath = path.join(
    process.cwd(),
    `public/db/shops/products/${id}/${productId}.json`
  );
  if (!fs.existsSync(productPath)) return notFound();

  const product: ShopProductDetail = JSON.parse(
    fs.readFileSync(productPath, 'utf-8')
  );

  return (
    <ShopProductDetailView
      shopName={shopDetail.name}
      category={shopDetail.category}
      shopSlug={id}
      product={product}
    />
  );
}
