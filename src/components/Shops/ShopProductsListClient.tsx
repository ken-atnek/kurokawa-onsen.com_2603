/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 一覧ページ（クライアント）
 * URL: src/components/Shops/ShopProductsListClient.tsx
 * Referenced in: src/app/shops/products/page.tsx
 * Created: 2026-05-04
 * Last updated: 2026-05-04
 * ======================================= */
'use client';

import { useEffect, useState } from 'react';
import type { ShopDetail, ShopOnlineProduct } from '@/types/shop';
import ShopProductsListView from '@/components/Shops/ShopProductsListView';

type Props = {
  id: string;
};

export default function ShopProductsListClient({ id }: Props) {
  const [detail, setDetail] = useState<ShopDetail | null>(null);
  const [items, setItems] = useState<ShopOnlineProduct[]>([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`/db/shops/products/${id}/index.json`, { cache: 'no-store' }).then(
        (res) => (res.ok ? res.json() : [])
      ),
    ])
      .then(([detailData, itemsData]) => {
        if (cancelled) return;

        setDetail(detailData);
        setItems(Array.isArray(itemsData) ? itemsData : []);
      })
      .catch(() => {
        if (cancelled) return;
        setDetail(null);
        setItems([]);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!detail || items.length === 0) return null;

  return <ShopProductsListView shopSlug={id} detail={detail} items={items} />;
}
