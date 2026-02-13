/* =======================================
 * Shop status helper
 * URL: src/lib/status.ts
 * ======================================= */

import type { ShopStatusKey, ShopTimeRange } from '@/types/shop';

export type ShopStatusVariant = 'open' | 'closed' | 'other';

export type ShopStatusView = {
  key: ShopStatusKey;
  label: string;
  variant: ShopStatusVariant;
};

/**
 * 優先順位
 * 1) apiKey（将来）
 * 2) closedWeekdays（定休日）
 * 3) timeRanges（営業時間）
 * 4) fallbackKey（最終保険）
 */
export function getShopStatusView(args: {
  fallbackKey: ShopStatusKey;
  apiKey?: ShopStatusKey;
  closedWeekdays?: number[]; // 0=Sun ... 6=Sat
  timeRanges?: ShopTimeRange[];
}): ShopStatusView {
  const { apiKey, closedWeekdays, timeRanges, fallbackKey } = args;

  // 1) API優先
  if (apiKey) {
    return keyToView(apiKey);
  }

  // 2) 曜日判定
  if (Array.isArray(closedWeekdays) && closedWeekdays.length > 0) {
    const today = new Date().getDay(); // 0=Sun..6=Sat
    if (closedWeekdays.includes(today)) {
      return keyToView('closed');
    }
  }

  // 3) 時間判定
  if (Array.isArray(timeRanges) && timeRanges.length > 0) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();

    const isOpenNow = timeRanges.some((range) => {
      const openMin = parseHmToMin(range.open);
      const closeMin = parseHmToMin(range.close);

      if (openMin === null || closeMin === null) return false;

      // 通常ケース（例: 11:30-14:30）
      if (openMin <= closeMin) {
        return nowMin >= openMin && nowMin <= closeMin;
      }

      // 日跨ぎ（例: 18:00-01:00）
      return nowMin >= openMin || nowMin <= closeMin;
    });

    return isOpenNow ? keyToView('open') : keyToView('closed');
  }

  // 4) fallback
  return keyToView(fallbackKey);
}

function parseHmToMin(hm: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(hm);
  if (!m) return null;

  const h = Number(m[1]);
  const min = Number(m[2]);

  if (!Number.isFinite(h) || !Number.isFinite(min)) return null;
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;

  return h * 60 + min;
}

function keyToView(key: ShopStatusKey): ShopStatusView {
  switch (key) {
    case 'open':
      return { key, label: '営業中', variant: 'open' };
    case 'closed':
      return { key, label: '営業時間外', variant: 'closed' };
    default:
      return { key, label: '確認中', variant: 'other' };
  }
}
