/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ（クエリID方式）
 * URL: src/app/shops/product-detail/page.tsx
 * Referenced in: src/components/Shops/ShopOnlineProducts.tsx
 * Created: 2026-05-04
 * Last updated: 2026-05-04
 * ======================================= */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopProductDetailClient from '@/components/Shops/ShopProductDetailClient';

function ShopProductDetailInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const productId = searchParams.get('productId') ?? '';

  if (!id || !productId) return null;

  return <ShopProductDetailClient id={id} productId={productId} />;
}

export default function ShopProductDetailPage() {
  return (
    <Suspense fallback={null}>
      <ShopProductDetailInner />
    </Suspense>
  );
}
