/* =======================================
 * 黒川温泉観光協会 加盟店一覧（TOP用ピックアップ / Server）
 * URL:src/components/Top/ContainerTopShopList.server.tsx
 * Referenced in: /app/page.tsx
 * Created: 2026-02-14
 * Last updated: 2026-02-14
 * ======================================= */

import ContainerTopShopListClient from '@/components/Top/ContainerTopShopList.client';

import { buildShopsWithStatus } from '@/lib/shops/buildShopsWithStatus';
import { getShopStatusView } from '@/lib/status';
import { getHoursRow } from '@/lib/shops/getHoursRow';

import type { ShopDetail, ShopWithStatus } from '@/types/shop';

export default async function ContainerTopShopListServer() {
  const shops = await buildShopsWithStatus<ShopDetail>({
    createStatus: (detail) => {
      const hoursRow = getHoursRow(detail.info.hours);
      const timeRanges = hoursRow?.timeRanges ?? [];

      return getShopStatusView({
        fallbackKey: detail.statusFallbackKey,
        closedWeekdays: detail.info.closedWeekdays,
        timeRanges,
      });
    },
  });

  return <ContainerTopShopListClient shops={shops as ShopWithStatus[]} />;
}
