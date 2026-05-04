/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ（クエリID方式）
 * URL: src/app/shops/products/page.tsx
 * Referenced in: src/components/Shops/ShopHeader.tsx
 * Created: 2026-05-04
 * Last updated: 2026-05-04
 * ======================================= */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopProductsListClient from '@/components/Shops/ShopProductsListClient';

function ShopProductsInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';

  if (!id) return null;

  return <ShopProductsListClient id={id} />;
}

export default function ShopProductsPage() {
  return (
    <Suspense fallback={null}>
      <ShopProductsInner />
    </Suspense>
  );
}
