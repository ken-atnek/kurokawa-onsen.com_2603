/* =======================================
 * 黒川温泉観光協会 飲食店予約フォーム
 * URL: src/app/shops/reserve/page.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ShopReservationFormClient from '@/components/Shops/ShopReservationFormClient';

function ShopReservationFormInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') ?? '';
  const date = searchParams.get('date') ?? '';
  const guests = Number(searchParams.get('guests') ?? 0);

  if (!id || !date || guests <= 0) return null;

  return <ShopReservationFormClient id={id} date={date} guests={guests} />;
}

export default function ShopReservationFormPage() {
  return (
    <Suspense fallback={null}>
      <ShopReservationFormInner />
    </Suspense>
  );
}
