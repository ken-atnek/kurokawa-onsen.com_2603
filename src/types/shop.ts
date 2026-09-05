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

export type ShopReservationMenu = {
  id: string;
  name: string;
  price: number;
  taxIncluded?: boolean;
  image: string;
  description: string;
  enabled: boolean;
};

export type ShopReservationMenus = {
  shopId: string;
  updatedAt?: string;
  allowSeatOnly?: boolean;
  menus: ShopReservationMenu[];
};

export type ShopReservationBasic = {
  shopId: string;
  reservationEnabled: boolean;
  menuSelectionType: 0 | 1 | 2;
  acceptancePeriod: {
    startDaysBefore: number | null;
    endDaysBefore: number;
  };
  guestRange: {
    min: number;
    max: number;
  };
  regularHolidays: number[];
  updatedAt?: string;
};

export type ShopReservationStatus =
  | 'open'
  | 'limited'
  | 'full'
  | 'holiday';

export type ShopReservationGuestStatuses = Record<string, ShopReservationStatus>;

export type ShopReservationDay = {
  date: string;
  guests: ShopReservationGuestStatuses;
  reason?: string;
};

export type ShopReservationMonth = {
  shopId: string;
  year: number;
  month: number;
  updatedAt?: string;
  days: ShopReservationDay[];
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

export type ProductStandardOption = {
  id: number;
  label: string;
};

export type ProductStandardItem = {
  variantId?: number;
  ecClassId?: number | null;
  classCategoryId1?: number | null;
  classCategoryId2?: number | null;
  price?: number;
  stock?: number;
  stockUnlimited?: boolean;
};

export type ProductStandard = {
  className?: {
    label1?: string | null;
    label2?: string | null;
  };
  classCategory?: {
    options1?: ProductStandardOption[];
    options2?: ProductStandardOption[];
  };
  items?: ProductStandardItem[];
};

export type ShopProductDetail = {
  id: string;
  /** EC-CUBE の商品ID（product_id） */
  ecId?: number;
  /** EC-CUBE の規格ID（product_class_id）。規格なし商品で使用 */
  ecClassId?: number | null;
  shopId: string;
  title: string;
  price: number;
  stock?: number;
  stockUnlimited?: boolean;
  standard?: [] | ProductStandard;
  images: string[];
  comment: string[];
  ecUrl: string;
};
