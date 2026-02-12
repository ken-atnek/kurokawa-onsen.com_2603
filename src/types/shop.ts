/* =======================================
 * Shop Types
 * URL: src/types/shop.ts
 * ======================================= */
/* =======================================
 * 一覧
 * ======================================= */
export type ShopIndexItem = {
  id: string;
  slug: string;
  category: string;
  name: string;
  thumb: string;
  statusFallbackKey: ShopStatusKey;
};
/* =======================================
 * 詳細ページ
 * ======================================= */

export type ShopStatusKey = 'open' | 'closed' | string;

export type ShopTimeRange = {
  open: string;
  close: string;
  note?: string;
};

export type ShopHourRow =
  | {
      label: string;
      timeRanges: ShopTimeRange[];
    }
  | {
      label: string;
      value: string;
    };

export type ShopInfo = {
  hours: ShopHourRow[];
  tel: string;
  web?: string;
  mapUrl: string;
  mapLinkUrl?: string;
  address: {
    postalCode: string;
    full: string;
  };
};

export type ShopPickupItem = {
  id: string;
  title: string;
  image: string;
};

export type ShopRecommendedProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export type ShopOnlineProduct = {
  id: string;
  title: string;
  price: number;
  image: string;
  buyUrl: string;
};

export type ShopDetail = {
  id: string;
  slug: string;
  category: string;
  name: string;
  statusFallbackKey: ShopStatusKey;
  heroImage: string;
  leadCopy: string[];
  pickupItems: ShopPickupItem[];
  info: ShopInfo;
  recommendedProducts: ShopRecommendedProduct[];
  onlineShopUrl?: string;
  onlineProducts: ShopOnlineProduct[];
};
