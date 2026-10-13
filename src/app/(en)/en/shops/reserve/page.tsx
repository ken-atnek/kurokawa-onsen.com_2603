/* =======================================
 * Kurokawa Onsen Restaurant Reservation Form
 * URL: src/app/(en)/en/shops/reserve/page.tsx
 * Created: 2026-10-13
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

  return (
    <ShopReservationFormClient
      id={id}
      date={date}
      guests={guests}
      locale="en"
    />
  );
}

export default function ShopReservationFormPage() {
  return (
    <Suspense fallback={null}>
      <ShopReservationFormInner />
    </Suspense>
  );
}
