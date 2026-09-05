/* =======================================
 * 黒川温泉観光協会 店舗詳細ページ（予約カレンダー）
 * URL: src/components/Shops/ShopReservationCalendar.tsx
 * Referenced in: src/components/Shops/ShopInfo.tsx
 * Created: 2026-09-04
 * Last updated: 2026-09-05
 * ======================================= */
'use client';

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import type {
  ShopReservationBasic,
  ShopReservationDay,
  ShopReservationMonth,
} from '@/types/shop';
import {
  addMonths,
  createGuestOptions,
  formatMonthKey,
  getReservationStatus,
  getReservationStatusLabel,
  getWeekendType,
  getWeekdayIndex,
  isReservableStatus,
  RESERVATION_WEEKDAYS,
  type ReservationDisplayStatus,
} from '@/lib/shops/reservation';
import styles from '@/styles/PageShopDetails.module.scss';
import SelectBox from '@/components/common/SelectBox';
import ShopReservationNoticeLink from '@/components/Shops/ShopReservationNoticeLink';

type Props = {
  shopId: string;
  tel: string;
  reservationBasic: ShopReservationBasic;
};

export default function ShopReservationCalendar({
  shopId,
  tel,
  reservationBasic,
}: Props) {
  const today = useMemo(() => new Date(), []);
  const [displayMonth, setDisplayMonth] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [monthData, setMonthData] = useState<ShopReservationMonth | null>(null);
  const [nextMonthExists, setNextMonthExists] = useState(false);

  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth() + 1;
  const monthKey = formatMonthKey(displayMonth);
  const currentMonthStart = useMemo(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
    [today]
  );
  const isPrevMonthDisabled =
    displayMonth.getTime() <= currentMonthStart.getTime();
  const isNextMonthDisabled = !nextMonthExists;
  const guestOptions = useMemo(
    () => createGuestOptions(reservationBasic.guestRange),
    [reservationBasic.guestRange]
  );

  useEffect(() => {
    const firstGuestOption = guestOptions[0];

    if (!guestOptions.includes(selectedGuests) && firstGuestOption) {
      setSelectedGuests(firstGuestOption);
    }
  }, [guestOptions, selectedGuests]);

  useEffect(() => {
    fetch(`/db/shops/reservations/${shopId}/${monthKey}.json`, {
      cache: 'no-store',
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ShopReservationMonth | null) => {
        if (Array.isArray(data?.days)) {
          setMonthData(data);
        } else {
          setMonthData(null);
        }
      })
      .catch(() => setMonthData(null));
  }, [monthKey, shopId]);

  useEffect(() => {
    let isCancelled = false;
    const nextMonthKey = formatMonthKey(addMonths(displayMonth, 1));

    setNextMonthExists(false);

    fetch(`/db/shops/reservations/${shopId}/${nextMonthKey}.json`, {
      cache: 'no-store',
      method: 'HEAD',
    })
      .then((res) => {
        if (!isCancelled) setNextMonthExists(res.ok);
      })
      .catch(() => {
        if (!isCancelled) setNextMonthExists(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [displayMonth, shopId]);

  if (!monthData) return null;

  const firstDate = new Date(year, month - 1, 1);
  const blankDays = Array.from({ length: firstDate.getDay() });

  return (
    <div className={styles.boxReservationCalendar}>
      <div className={styles.boxH2}>
        <i className={styles.itemLeft}></i>
        <h2>ご予約</h2>
        <i className={styles.itemRight}></i>
      </div>

      <div className={styles.reservationGuestSelect}>
        <h3>ご利用人数</h3>
        <GuestSelectBox
          name="reservationGuests"
          value={selectedGuests}
          options={guestOptions.map((guests) => ({
            value: guests,
            label: `${guests}名`,
          }))}
          onChange={setSelectedGuests}
        />
      </div>

      <div className={styles.reservationMonthHead}>
        <button
          type="button"
          className={clsx(
            styles.btnPrevMonth,
            isPrevMonthDisabled && styles.isDisabledMonthButton
          )}
          aria-label="前の月へ"
          disabled={isPrevMonthDisabled}
          onClick={() => setDisplayMonth((current) => addMonths(current, -1))}
        />
        <span>
          {monthData.year}年{monthData.month}月
        </span>
        <button
          type="button"
          className={clsx(
            styles.btnNextMonth,
            isNextMonthDisabled && styles.isDisabledMonthButton
          )}
          aria-label="次の月へ"
          disabled={isNextMonthDisabled}
          onClick={() => setDisplayMonth((current) => addMonths(current, 1))}
        />
      </div>

      <div className={styles.reservationWeekdays}>
        {RESERVATION_WEEKDAYS.map((weekday, i) => (
          <span key={weekday} data-weekend={getWeekendType(i)}>
            {weekday}
          </span>
        ))}
      </div>

      <ul className={styles.reservationMonthGrid}>
        {blankDays.map((_, i) => (
          <li key={`blank-${i}`} aria-hidden="true"></li>
        ))}
        {monthData.days.map((day) => (
          <li key={day.date}>
            <div
              className={styles.reservationDay}
              data-weekend={getWeekendType(getWeekdayIndex(day.date))}
            >
              {Number(day.date.split('-')[2])}
            </div>
            {renderStatus(
              day,
              selectedGuests,
              shopId,
              tel,
              today,
              reservationBasic.acceptancePeriod
            )}
          </li>
        ))}
      </ul>

      <div className={styles.reservationLegend}>
        <span data-status="open">
          <i
            className={styles.reservationStatusIcon}
            aria-hidden="true"
          ></i>
          ご予約可
        </span>
        <span data-status="limited">
          <i
            className={styles.reservationStatusIcon}
            aria-hidden="true"
          ></i>
          一部満席
        </span>
        <span data-status="full">
          <i
            className={styles.reservationStatusIcon}
            aria-hidden="true"
          ></i>
          満席
        </span>
        <span data-status="holiday">
          <i
            className={styles.reservationStatusIcon}
            aria-hidden="true"
          ></i>
          休業日
        </span>
      </div>
      <p className={styles.reservationNote}>
        ※ 5名様以上のご予約は直接お電話でお問い合わせください。
      </p>
      <p className={styles.reservationNote}>
        ※ △の日は、ご利用人数によって予約できない場合があります。
      </p>
    </div>
  );
}

type GuestSelectBoxProps = {
  name: string;
  value: number;
  options: {
    value: number;
    label: string;
  }[];
  onChange: (value: number) => void;
};

function GuestSelectBox({
  name,
  value,
  options,
  onChange,
}: GuestSelectBoxProps) {
  return (
    <SelectBox
      name={name}
      value={String(value)}
      height="5.2rem"
      listHeight="4.2rem"
      valueFontSize="2rem"
      labelFontSize="1.6rem"
      position="left"
      options={options.map((option) => ({
        value: String(option.value),
        label: option.label,
      }))}
      onChange={(nextValue) => onChange(Number(nextValue))}
    />
  );
}

function renderStatus(
  day: ShopReservationDay,
  guests: number,
  shopId: string,
  tel: string,
  today: Date,
  acceptancePeriod: ShopReservationBasic['acceptancePeriod']
) {
  const status = getReservationStatus(day, guests, today, acceptancePeriod);
  const label = getReservationStatusLabel(status);

  if (isReservableStatus(status)) {
    return (
      <ShopReservationNoticeLink
        href={`/shops/reserve?id=${shopId}&date=${day.date}&guests=${guests}`}
        tel={tel}
        className={styles.reservationStatus}
        status={status}
        ariaLabel={`${day.date} ${guests}名 ${label} 予約する`}
      >
        <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
      </ShopReservationNoticeLink>
    );
  }

  return (
    <span
      className={styles.reservationStatus}
      data-status={status}
      aria-label={`${day.date} ${guests}名 ${label}`}
    >
      <i className={styles.reservationStatusIcon} aria-hidden="true"></i>
    </span>
  );
}
