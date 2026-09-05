/* =======================================
 * 黒川温泉観光協会 TOPページ 飲食店予約空席状況
 * URL: /src/components/Top/ContainerTopReservationAvailability.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-09-05
 * Last updated: 2026-09-05
 * ======================================= */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useEffect, useMemo, useState } from 'react';
import SelectBox from '@/components/common/SelectBox';
import ShopReservationNoticeLink from '@/components/Shops/ShopReservationNoticeLink';
import {
  addDays,
  formatDateKey,
  getReservationStatus,
  getReservationStatusLabel,
  getWeekendType,
  getWeekdayIndex,
  isReservableStatus,
  RESERVATION_WEEKDAYS,
  type ReservationDisplayStatus,
} from '@/lib/shops/reservation';
import type { ShopReservationBasic, ShopReservationMonth } from '@/types/shop';
import styles from '@/styles/components/TopReservationAvailability.module.scss';

type ShopIndexBase = {
  id: string;
  category: string;
  name: string[];
  thumb: string;
  tel: string;
};

type ReservationShop = ShopIndexBase & {
  reservationBasic: ShopReservationBasic;
  months: Record<string, ShopReservationMonth>;
};

const DESKTOP_DISPLAY_DAYS = 14;
const MOBILE_DISPLAY_DAYS = 7;
const MOBILE_MEDIA_QUERY = '(max-width: 767px)';
const GUEST_OPTIONS = [1, 2, 3, 4];

export default function ContainerTopReservationAvailability() {
  const today = useMemo(() => new Date(), []);
  const initialDate = useMemo(() => formatDateKey(today), [today]);
  const [inputDate, setInputDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [shops, setShops] = useState<ReservationShop[] | null>(null);
  const [displayDays, setDisplayDays] = useState(DESKTOP_DISPLAY_DAYS);
  const isPrevDisabled = selectedDate <= initialDate;
  const rangeLabel = displayDays === MOBILE_DISPLAY_DAYS ? '1週間' : '2週間';

  const dateKeys = useMemo(
    () => createDateKeys(selectedDate, displayDays),
    [displayDays, selectedDate]
  );
  const scheduleStyle = {
    '--reservation-days': dateKeys.length,
  } as CSSProperties;

  useEffect(() => {
    let isCancelled = false;

    fetchReservationShops(dateKeys).then((data) => {
      if (!isCancelled) setShops(data);
    });

    return () => {
      isCancelled = true;
    };
  }, [dateKeys]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateDisplayDays = () => {
      setDisplayDays(
        mediaQuery.matches ? MOBILE_DISPLAY_DAYS : DESKTOP_DISPLAY_DAYS
      );
    };

    updateDisplayDays();
    mediaQuery.addEventListener('change', updateDisplayDays);

    return () => {
      mediaQuery.removeEventListener('change', updateDisplayDays);
    };
  }, []);

  const moveDateRange = (amount: number) => {
    const movedDate = formatDateKey(
      addDays(new Date(`${selectedDate}T00:00:00`), amount)
    );
    const nextDate = movedDate < initialDate ? initialDate : movedDate;

    setInputDate(nextDate);
    setSelectedDate(nextDate);
  };

  const searchAvailability = () => {
    if (!inputDate) return;

    const nextDate = inputDate < initialDate ? initialDate : inputDate;

    setInputDate(nextDate);
    setSelectedDate(nextDate);
  };

  if (shops === null) return null;

  if (shops.length === 0) return null;

  return (
    <section className={styles.containerTopReservationAvailability}>
      <div className={styles.boxHead}>
        <h2>お食事処予約</h2>
        <p>予約可能なお席の空席状況をまとめて確認できます。</p>
      </div>

      <div className={styles.boxSearch}>
        <div className={styles.wrapDate}>
          <h3>予約日</h3>
          <label className={styles.itemDate}>
            <input
              type="date"
              value={inputDate}
              min={initialDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.itemGuests}>
          <h3>人数</h3>
          <SelectBox
            name="topReservationGuests"
            value={String(selectedGuests)}
            options={GUEST_OPTIONS.map((guests) => ({
              value: String(guests),
              label: `${guests}名`,
            }))}
            onChange={(value) => setSelectedGuests(Number(value))}
            position="left"
            height="5.2rem"
            listHeight="4.2rem"
            valueFontSize="1.6rem"
            labelFontSize="1.6rem"
          />
        </div>
        <button
          type="button"
          className={styles.btnSearch}
          onClick={searchAvailability}
        >
          空席を確認する
        </button>
      </div>

      <div className={styles.boxAvailability}>
        <div className={styles.boxTableHead}>
          <button
            type="button"
            onClick={() => moveDateRange(-displayDays)}
            className={styles.btnPrev}
            disabled={isPrevDisabled}
          >
            前の{rangeLabel}
          </button>
          <h3>
            予約の空席状況
            <span>({selectedGuests}名様)</span>
          </h3>
          <button
            type="button"
            onClick={() => moveDateRange(displayDays)}
            className={styles.btnNext}
          >
            次の{rangeLabel}
          </button>
        </div>

        <div className={styles.blockSchedule} style={scheduleStyle}>
          <div className={styles.boxWeek}>
            <div className={styles.gridHeadCell}></div>
            {dateKeys.map((date) => (
              <div
                key={date}
                className={styles.gridHeadCell}
                data-weekend={getWeekendType(getWeekdayIndex(date))}
              >
                <span>{formatTableDate(date)}</span>
                <small>({RESERVATION_WEEKDAYS[getWeekdayIndex(date)]})</small>
              </div>
            ))}
          </div>
          {shops.map((shop) => (
            <div className={styles.boxShop} key={shop.id}>
              <div className={styles.gridShopCell}>
                <span>{shop.name.join('')}</span>
                <Link href={`/shops/detail?id=${shop.id}`}>
                  <Image
                    src={shop.thumb}
                    alt={shop.name.join(' ')}
                    width={180}
                    height={70}
                  />
                </Link>
              </div>
              {dateKeys.map((date) => (
                <div className={styles.gridCell} key={`${shop.id}-${date}`}>
                  <AvailabilityCell
                    shop={shop}
                    date={date}
                    guests={selectedGuests}
                    today={today}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.listLegend}>
          <span data-status="open">
            <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
            ご予約可
          </span>
          <span data-status="limited">
            <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
            一部満席
          </span>
          <span data-status="full">
            <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
            満席
          </span>
          <span data-status="holiday">
            <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
            休業日
          </span>
        </div>
        <p className={styles.itemNote}>
          ※ 5名様以上のご予約は直接お電話でお問い合わせください。
        </p>
        <p className={styles.itemNote}>
          ※ △の日は、ご利用人数によって予約できない場合があります。
        </p>
      </div>
    </section>
  );
}

function AvailabilityCell({
  shop,
  date,
  guests,
  today,
}: {
  shop: ReservationShop;
  date: string;
  guests: number;
  today: Date;
}) {
  const month = shop.months[date.slice(0, 7)];
  const day = month?.days.find((item) => item.date === date);
  const status = getReservationStatus(
    day,
    guests,
    today,
    shop.reservationBasic.acceptancePeriod
  );
  const label = getReservationStatusLabel(status);

  if (isReservableStatus(status)) {
    return (
      <ShopReservationNoticeLink
        href={`/shops/reserve?id=${shop.id}&date=${date}&guests=${guests}`}
        tel={shop.tel}
        className={styles.btnStatus}
        status={status}
        ariaLabel={`${shop.name.join('')} ${date} ${guests}名 ${label} 予約する`}
      >
        <StatusIcon status={status} />
      </ShopReservationNoticeLink>
    );
  }

  return (
    <span
      className={styles.btnStatus}
      data-status={status}
      aria-label={`${shop.name.join('')} ${date} ${guests}名 ${label}`}
    >
      <StatusIcon status={status} />
    </span>
  );
}

function StatusIcon({ status }: { status: ReservationDisplayStatus }) {
  return (
    <i className={styles.statusIcon} data-status={status} aria-hidden="true">
      <span className={styles.reservationStatusIcon}></span>
    </i>
  );
}

async function fetchReservationShops(dateKeys: string[]) {
  const indexList = await fetchJson<ShopIndexBase[]>(
    '/db/shops/shopsIndex.json'
  );
  if (!indexList) return [];

  const foodShops = indexList.filter((shop) => shop.category === 'food');
  const monthKeys = Array.from(
    new Set(dateKeys.map((date) => date.slice(0, 7)))
  );
  const shops = await Promise.all(
    foodShops.map(async (shop) => {
      const reservationBasic = await fetchJson<ShopReservationBasic | null>(
        `/db/shops/reservations/${shop.id}/basic.json`
      );

      if (reservationBasic?.reservationEnabled !== true) return null;

      const months = await Promise.all(
        monthKeys.map(async (monthKey) => {
          const data = await fetchJson<ShopReservationMonth | null>(
            `/db/shops/reservations/${shop.id}/${monthKey}.json`
          );

          return [monthKey, data] as const;
        })
      );

      return {
        ...shop,
        reservationBasic,
        months: Object.fromEntries(
          months.filter((entry): entry is [string, ShopReservationMonth] =>
            Boolean(entry[1])
          )
        ),
      };
    })
  );

  return shops.filter((shop): shop is ReservationShop => Boolean(shop));
}

function createDateKeys(startDate: string, days: number) {
  const start = new Date(`${startDate}T00:00:00`);

  return Array.from({ length: days }, (_, i) =>
    formatDateKey(addDays(start, i))
  );
}

function formatTableDate(date: string) {
  const value = new Date(`${date}T00:00:00`);

  return `${value.getMonth() + 1}/${value.getDate()}`;
}

function fetchJson<T>(path: string): Promise<T | null> {
  return fetch(path, { cache: 'no-store' })
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);
}
