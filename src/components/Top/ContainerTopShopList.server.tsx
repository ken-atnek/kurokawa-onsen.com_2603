/* =======================================
 * 黒川温泉観光協会 加盟店一覧（TOP用ピックアップ / Server）
 * URL:src/components/Top/ContainerTopShopList.server.tsx
 * Referenced in: /app/page.tsx
 * ======================================= */

import ContainerTopShopListClient from '@/components/Top/ContainerTopShopList.client';

export default function ContainerTopShopListServer() {
  return <ContainerTopShopListClient pickupCount={3} />;
}
