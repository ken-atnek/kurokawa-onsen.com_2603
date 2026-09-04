/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（クライアント）
 * URL: src/components/Shops/ShopDetailClient.tsx
 * Referenced in: src/app/shops/[id]/page.tsx, src/app/shops/detail/page.tsx
 * Created: 2026-02-19
 * Last updated: 2026-02-19
 * ======================================= */
'use client';
import ShopHeader from '@/components/Shops/ShopHeader';
import ShopHero from '@/components/Shops/ShopHero';
import ShopPickup from '@/components/Shops/ShopPickup';
import ShopInfo from '@/components/Shops/ShopInfo';
import ShopRecommendedProducts from '@/components/Shops/ShopRecommendedProducts';
import ShopRecommendedMenus from '@/components/Shops/ShopRecommendedMenus';
import ShopOnlineProducts from '@/components/Shops/ShopOnlineProducts';
import { getHoursRow } from '@/lib/shops/getHoursRow';
import ShopLinkList from '@/components/Shops/ShopLinkList';
import { useShopDetailData } from '@/hooks/shops/useShopDetailData';

type Props = {
  id: string;
};

export default function ShopDetailClient({ id }: Props) {
  const { detail, onlineItems, menuItems, reservationBasic } =
    useShopDetailData(id);

  if (!detail) return null;

  const hoursRow = getHoursRow(detail.info.hours);
  const timeRanges = hoursRow?.timeRanges ?? [];
  const onlineProductsCount = detail.onlineProductsCount ?? 0;
  const hasOnlineProducts = onlineProductsCount > 0;
  const hasRecommendedProducts = detail.recommendedProducts.length > 0;
  const hasRecommendedMenus = menuItems.some((item) => item.enabled);
  const hasReservation = reservationBasic?.reservationEnabled === true;

  return (
    <>
      <ShopHeader
        name={detail.name}
        leadCopy={detail.leadCopy}
        tel={detail.info.tel}
        web={detail.info.web}
        mail={detail.info.mail}
        mapLinkUrl={detail.info.mapLinkUrl}
        category={detail.category}
        shopSlug={id}
        statusFallbackKey={detail.statusFallbackKey}
        closedWeekdays={detail.info.closedWeekdays}
        timeRanges={timeRanges}
        hasOnlineList={hasOnlineProducts}
      />

      <ShopHero src={detail.heroImage} alt={detail.name.join(' ')} />
      <ShopPickup items={detail.pickupItems} />
      <ShopInfo
        shopId={id}
        info={detail.info}
        category={detail.category}
        hasReservation={hasReservation}
        reservationBasic={reservationBasic}
      />

      <ShopRecommendedMenus
        items={menuItems}
        isLastSection={!hasRecommendedProducts && !hasOnlineProducts}
      />

      <ShopRecommendedProducts
        items={detail.recommendedProducts}
        isLastSection={!hasRecommendedMenus && !hasOnlineProducts}
      />

      {hasOnlineProducts ? (
        <ShopOnlineProducts
          items={onlineItems}
          shopSlug={id}
          onlineProductsCount={onlineProductsCount}
        />
      ) : null}
      <ShopLinkList />
    </>
  );
}
