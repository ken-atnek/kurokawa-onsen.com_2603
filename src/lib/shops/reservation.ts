import type {
  ShopReservationBasic,
  ShopReservationDay,
  ShopReservationStatus,
} from '@/types/shop';

export type ReservationDisplayStatus = ShopReservationStatus | 'closed';

export const RESERVATION_WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function formatMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}-${String(month).padStart(2, '0')}`;
}

export function createGuestOptions(
  guestRange: ShopReservationBasic['guestRange']
) {
  const min = Math.max(1, guestRange.min);
  const max = Math.max(min, guestRange.max);

  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

export function getReservationStatus(
  day: ShopReservationDay | undefined,
  guests: number,
  today: Date,
  acceptancePeriod: ShopReservationBasic['acceptancePeriod']
): ReservationDisplayStatus {
  if (!day) return 'closed';

  if (isClosedDate(day.date, today, acceptancePeriod)) return 'closed';

  return day.guests[String(guests)] ?? 'closed';
}

export function getReservationStatusLabel(status: ReservationDisplayStatus) {
  if (status === 'open') return 'ご予約可';
  if (status === 'limited') return '一部満席';
  if (status === 'holiday') return '休業日';
  return '満席';
}

export function isReservableStatus(status: ReservationDisplayStatus) {
  return status === 'open' || status === 'limited';
}

export function isClosedDate(
  date: string,
  today: Date,
  acceptancePeriod: ShopReservationBasic['acceptancePeriod']
) {
  const targetDate = new Date(`${date}T00:00:00`);
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const startDate = addDays(todayStart, acceptancePeriod.endDaysBefore);
  const endDate =
    acceptancePeriod.startDaysBefore === null
      ? null
      : addDays(todayStart, acceptancePeriod.startDaysBefore);

  if (targetDate.getTime() < startDate.getTime()) return true;
  if (endDate && targetDate.getTime() > endDate.getTime()) return true;

  return false;
}

export function getWeekdayIndex(date: string) {
  return new Date(`${date}T00:00:00`).getDay();
}

export function getWeekendType(weekdayIndex: number) {
  if (weekdayIndex === 0) return 'sun';
  if (weekdayIndex === 6) return 'sat';
  return undefined;
}
