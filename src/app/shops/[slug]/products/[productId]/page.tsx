/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ
 * URL:src/app/shops/[slug]/products/[productId]/page.tsx
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */

import type { ShopDetail, ShopProductDetail } from '@/types/shop';
import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import ShopProductDetailView from '@/components/Shops/ShopProductDetailView';

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

  const params: { slug: string; productId: string }[] = [];

  for (const shop of shops) {
    const slug = shop?.slug;
    if (typeof slug !== 'string') continue;

    const shopId = typeof shop?.id === 'string' ? shop.id : getIdFromSlug(slug);

    const productsIndexPath = path.join(
      process.cwd(),
      `public/db/shops/products/${shopId}/index.json`
    );

    if (!fs.existsSync(productsIndexPath)) continue;

    const items = JSON.parse(fs.readFileSync(productsIndexPath, 'utf-8'));
    if (!Array.isArray(items)) continue;

    for (const item of items) {
      const productId = item?.id;
      if (typeof productId !== 'string') continue;

      params.push({ slug, productId });
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
  params: Promise<{ slug: string; productId: string }>;
}) {
  const { slug, productId } = await params;

  const shopId = getIdFromSlug(slug);

  // 店舗詳細（店名を出す用）
  const shopDetailPath = path.join(
    process.cwd(),
    `public/db/shops/details/${shopId}.json`
  );
  if (!fs.existsSync(shopDetailPath)) return notFound();

  const shopDetail: ShopDetail = JSON.parse(
    fs.readFileSync(shopDetailPath, 'utf-8')
  );

  // 商品詳細
  const productPath = path.join(
    process.cwd(),
    `public/db/shops/products/${shopId}/${productId}.json`
  );
  if (!fs.existsSync(productPath)) return notFound();

  const product: ShopProductDetail = JSON.parse(
    fs.readFileSync(productPath, 'utf-8')
  );

  return (
    <ShopProductDetailView
      shopName={shopDetail.name}
      category={shopDetail.category}
      shopSlug={slug}
      product={product}
    />
  );
}

/* =======================================
 * slug → id変換（仮）
 * ======================================= */
function getIdFromSlug(slug: string) {
  if (slug === 'warokuya') return '001';
  return slug;
}
