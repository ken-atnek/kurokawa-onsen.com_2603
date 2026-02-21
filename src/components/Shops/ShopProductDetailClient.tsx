/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ（クライアント）
 * URL: src/components/Shops/ShopProductDetailClient.tsx
 * Created: 2026-02-21
 * ======================================= */
'use client';

import type { ShopDetail, ShopProductDetail } from '@/types/shop';
import { useEffect, useState } from 'react';
import ShopProductDetailView from '@/components/Shops/ShopProductDetailView';

type Props = {
  id: string;
  productId: string;
};

export default function ShopProductDetailClient({ id, productId }: Props) {
  const [shopDetail, setShopDetail] = useState<ShopDetail | null>(null);
  const [product, setProduct] = useState<ShopProductDetail | null>(null);

  useEffect(() => {
    let canceled = false;

    Promise.all([
      fetch(`/db/shops/details/${id}.json`, { cache: 'no-store' }).then((res) =>
        res.ok ? res.json() : null
      ),
      fetch(`/db/shops/products/${id}/${productId}.json`, {
        cache: 'no-store',
      }).then((res) => (res.ok ? res.json() : null)),
    ])
      .then(([detailData, productData]) => {
        if (canceled) return;

        setShopDetail(detailData);
        setProduct(productData);
      })
      .catch(() => {
        if (canceled) return;
        setShopDetail(null);
        setProduct(null);
      });

    return () => {
      canceled = true;
    };
  }, [id, productId]);

  if (!shopDetail || !product) return null;

  return (
    <ShopProductDetailView
      shopName={shopDetail.name}
      category={shopDetail.category}
      shopSlug={id}
      product={product}
    />
  );
}
