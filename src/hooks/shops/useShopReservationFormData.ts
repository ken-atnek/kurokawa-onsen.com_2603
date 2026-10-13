/* =======================================
 * 黒川温泉観光協会 飲食店予約フォーム データ取得
 * URL: src/hooks/shops/useShopReservationFormData.ts
 * Referenced in: src/components/Shops/ShopReservationFormClient.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import { useEffect, useState } from 'react';
import type {
  ShopDetail,
  ShopReservationBasic,
  ShopReservationMenu,
  ShopReservationMenus,
  ShopReservationMonth,
  ShopReservationStatus,
} from '@/types/shop';

type ReservationFormData = {
  shopDetail: ShopDetail | null;
  reservationBasic: ShopReservationBasic | null;
  menuItems: ShopReservationMenu[];
  status: ShopReservationStatus | null;
};

export function useShopReservationFormData(
  id: string,
  date: string,
  guests: number,
  locale: 'ja' | 'en' = 'ja'
) {
  const [data, setData] = useState<ReservationFormData>({
    shopDetail: null,
    reservationBasic: null,
    menuItems: [],
    status: null,
  });

  useEffect(() => {
    let isCancelled = false;

    setData({
      shopDetail: null,
      reservationBasic: null,
      menuItems: [],
      status: null,
    });

    fetchReservationFormData(id, date, guests, locale).then((nextData) => {
      if (!isCancelled) setData(nextData);
    });

    return () => {
      isCancelled = true;
    };
  }, [date, guests, id, locale]);

  return data;
}

async function fetchReservationFormData(
  id: string,
  date: string,
  guests: number,
  locale: 'ja' | 'en'
): Promise<ReservationFormData> {
  const monthKey = date.slice(0, 7);
  const [shopDetail, reservationBasic, menusData, monthData] =
    await Promise.all([
      fetchJson<ShopDetail>(`/db/shops/details/${id}.json`),
      fetchJson<ShopReservationBasic>(
        `/db/shops/reservations/${id}/basic.json`
      ),
      fetchJson<ShopReservationMenus>(
        `/db/shops/reservations/${id}/menus.json`
      ),
      fetchJson<ShopReservationMonth>(
        `/db/shops/reservations/${id}/${monthKey}.json`
      ),
    ]);

  const selectedDay = monthData?.days.find((day) => day.date === date);
  const status = selectedDay?.guests[String(guests)] ?? null;

  return {
    shopDetail,
    reservationBasic:
      locale === 'en'
        ? reservationBasic?.reservationEnabled_en === true
          ? reservationBasic
          : null
        : reservationBasic?.reservationEnabled === true
          ? reservationBasic
          : null,
    menuItems: Array.isArray(
      locale === 'en' ? menusData?.menus_en : menusData?.menus
    )
      ? ((locale === 'en' ? menusData?.menus_en : menusData?.menus)?.filter(
          (item) => item.enabled
        ) ?? [])
      : [],
    status,
  };
}

function fetchJson<T>(path: string): Promise<T | null> {
  return fetch(path, { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
}
