/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（クエリID方式）
 * URL: src/app/shops/detail/page.tsx
 * Created: 2026-02-19
 * Last updated: 2026-02-19
 * ======================================= */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopDetailClient from '@/components/Shops/ShopDetailClient';

function ShopDetailInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';

  if (!id) return null;

  return <ShopDetailClient id={id} />;
}

export default function ShopDetailPage() {
  return (
    <Suspense fallback={null}>
      <ShopDetailInner />
    </Suspense>
  );
}
