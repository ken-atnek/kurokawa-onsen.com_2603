import type { ShopStatusView } from '@/lib/status';

export type ShopWithStatus = ShopIndexItem & {
  status: ShopStatusView;
};

export type ShopIndexItem = {
  id: string;
  slug: string;
  category: string;
  name: string[];
  thumb: string;
  tel: string;
  statusFallbackKey: ShopStatusKey;
  leadCopy: string[];
};

/* =======================================
 * 詳細ページ
 * ======================================= */

export type ShopStatusKey = 'open' | 'closed' | 'other';

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
  fax?: string;
  web?: string;
  mail?: string;
  mapUrl: string;
  mapLinkUrl?: string;
  address: {
    postalCode: string;
    full: string;
  };
  closedWeekdays?: number[];
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
  image: string;
  price: number;
};

export type ShopDetail = {
  id: string;
  slug: string;
  category: string;
  name: string[];
  statusFallbackKey: ShopStatusKey;
  heroImage: string;
  leadCopy: string[];
  pickupItems: ShopPickupItem[];
  info: ShopInfo;
  recommendedProducts: ShopRecommendedProduct[];
  onlineShopUrl?: string;
  onlineProductsCount?: number;
};
/* =======================================
 * オンライン商品：詳細
 * ======================================= */

export type ShopProductDetail = {
  id: string;
  /** EC-CUBE の商品ID（product_id） */
  ecId?: number;
  /** EC-CUBE の規格ID（product_class_id）。未指定ならEC側でデフォルト規格を解決 */
  ecClassId?: number;
  shopId: string;
  title: string;
  price: number;
  stock?: number;
  images: string[];
  comment: string[];
  ecUrl: string;
};
