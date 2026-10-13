/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（クライアント）
 * URL: src/components/Shops/ShopDetailClient.tsx
 * Referenced in: src/app/shops/[id]/page.tsx, src/app/shops/detail/page.tsx
 * Created: 2026-02-19
 * Last updated: 2026-10-01
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
  locale?: 'ja' | 'en';
};

export default function ShopDetailClient({ id, locale = 'ja' }: Props) {
  const { detail, onlineItems, menuItems, reservationBasic } =
    useShopDetailData(id);

  if (!detail) return null;

  const isEnglish = locale === 'en';
  const name = isEnglish ? (detail.name_en ?? []) : detail.name;
  const leadCopy = isEnglish ? (detail.leadCopy_en ?? []) : detail.leadCopy;
  const pickupItems = isEnglish
    ? (detail.pickupItems_en ?? [])
    : detail.pickupItems;
  const recommendedProducts = isEnglish
    ? (detail.recommendedProducts_en ?? [])
    : detail.recommendedProducts;
  const hours = isEnglish ? (detail.info.hours_en ?? []) : detail.info.hours;

  const hoursRow = getHoursRow(hours);
  const timeRanges = hoursRow?.timeRanges ?? [];
  const onlineProductsCount = detail.onlineProductsCount ?? 0;
  const hasOnlineProducts = !isEnglish && onlineProductsCount > 0;
  const hasRecommendedProducts = recommendedProducts.length > 0;
  const hasRecommendedMenus =
    !isEnglish && menuItems.some((item) => item.enabled);
  const hasReservation =
    !isEnglish && reservationBasic?.reservationEnabled === true;

  return (
    <>
      <ShopHeader
        locale={locale}
        name={name}
        leadCopy={leadCopy}
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
        mealPeriods={detail.mealPeriods}
      />

      <ShopHero src={detail.heroImage} alt={name.join(' ')} />
      <ShopPickup items={pickupItems} />
      <ShopInfo
        locale={locale}
        shopId={id}
        info={detail.info}
        category={detail.category}
        hasReservation={hasReservation}
        reservationBasic={reservationBasic}
      />

      {!isEnglish ? (
        <ShopRecommendedMenus
          items={menuItems}
          isLastSection={!hasRecommendedProducts && !hasOnlineProducts}
        />
      ) : null}

      <ShopRecommendedProducts
        items={recommendedProducts}
        isLastSection={!hasRecommendedMenus && !hasOnlineProducts}
        locale={locale}
      />

      {hasOnlineProducts ? (
        <ShopOnlineProducts
          items={onlineItems}
          shopSlug={id}
          onlineProductsCount={onlineProductsCount}
        />
      ) : null}
      <ShopLinkList locale={locale} />
    </>
  );
}
