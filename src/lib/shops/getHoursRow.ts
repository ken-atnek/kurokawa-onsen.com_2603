/* =======================================
 * 営業時間行取得ユーティリティ
 * URL: src/lib/shops/getHoursRow.ts
 * Created: 2026-02-16
 * ======================================= */

import type { ShopHourRow, ShopTimeRange } from '@/types/shop';

/**
 * 店舗情報から営業時間の行を取得する
 * hours配列から「営業時間」ラベルを持ち、timeRangesを含む行を検索
 * 見つからない場合はundefinedを返す
 */
export function getHoursRow(
  hours: ShopHourRow[]
): { label: string; timeRanges: ShopTimeRange[] } | undefined {
  return hours.find(
    (row): row is { label: string; timeRanges: ShopTimeRange[] } =>
      row.label === '営業時間' && 'timeRanges' in row
  );
}
