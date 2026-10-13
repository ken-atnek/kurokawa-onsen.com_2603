/* =======================================
 * Kurokawa Onsen Tourism Association English Shop Detail Page
 * URL: src/app/(en)/en/shops/detail/page.tsx
 * Referenced in: /en/shops/detail?id=<id>
 * Created: 2026-10-13
 * ======================================= */

'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopDetailClient from '@/components/Shops/ShopDetailClient';

function EnglishShopDetailInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';

  if (!id) return null;

  return <ShopDetailClient id={id} locale="en" />;
}

export default function EnglishShopDetailPage() {
  return (
    <Suspense fallback={null}>
      <EnglishShopDetailInner />
    </Suspense>
  );
}
