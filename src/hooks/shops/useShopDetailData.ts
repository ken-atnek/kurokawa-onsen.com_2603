/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ データ取得
 * URL: src/hooks/shops/useShopDetailData.ts
 * Referenced in: src/components/Shops/ShopDetailClient.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import { useEffect, useState } from 'react';
import type {
  ShopDetail,
  ShopOnlineProduct,
  ShopReservationBasic,
  ShopReservationMenu,
  ShopReservationMenus,
} from '@/types/shop';

export function useShopDetailData(id: string) {
  const [detail, setDetail] = useState<ShopDetail | null>(null);
  const [onlineItems, setOnlineItems] = useState<ShopOnlineProduct[]>([]);
  const [menuItems, setMenuItems] = useState<ShopReservationMenu[]>([]);
  const [reservationBasic, setReservationBasic] =
    useState<ShopReservationBasic | null>(null);

  useEffect(() => {
    let isCancelled = false;

    setDetail(null);
    setOnlineItems([]);
    setReservationBasic(null);
    setMenuItems([]);

    fetchShopDetailData(id).then((data) => {
      if (isCancelled) return;

      setDetail(data.detail);
      setOnlineItems(data.onlineItems);
      setReservationBasic(data.reservationBasic);
      setMenuItems(data.menuItems);
    });

    return () => {
      isCancelled = true;
    };
  }, [id]);

  return {
    detail,
    onlineItems,
    menuItems,
    reservationBasic,
  };
}

async function fetchShopDetailData(id: string) {
  const detail = await fetchJson<ShopDetail>(`/db/shops/details/${id}.json`);

  if (!detail) {
    return {
      detail: null,
      onlineItems: [],
      menuItems: [],
      reservationBasic: null,
    };
  }

  const [onlineItems, reservationData] = await Promise.all([
    fetchOnlineItems(id, detail),
    fetchReservationData(id, detail),
  ]);

  return {
    detail,
    onlineItems,
    ...reservationData,
  };
}

async function fetchOnlineItems(id: string, detail: ShopDetail) {
  const count = detail.onlineProductsCount ?? 0;

  if (count <= 0) return [];

  const data = await fetchJson<ShopOnlineProduct[]>(
    `/db/shops/products/${id}/index.json`
  );

  return Array.isArray(data) ? data : [];
}

async function fetchReservationData(id: string, detail: ShopDetail) {
  if (detail.category !== 'food') {
    return {
      menuItems: [],
      reservationBasic: null,
    };
  }

  const [basicData, menusData] = await Promise.all([
    fetchJson<ShopReservationBasic>(`/db/shops/reservations/${id}/basic.json`),
    fetchJson<ShopReservationMenus>(`/db/shops/reservations/${id}/menus.json`),
  ]);

  return {
    menuItems: Array.isArray(menusData?.menus) ? menusData.menus : [],
    reservationBasic: basicData?.reservationEnabled ? basicData : null,
  };
}

function fetchJson<T>(path: string): Promise<T | null> {
  return fetch(path, { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
}
