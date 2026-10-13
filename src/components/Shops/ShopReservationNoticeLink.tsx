/* =======================================
 * 黒川温泉観光協会 飲食店予約 注意事項モーダル
 * URL: src/components/Shops/ShopReservationNoticeLink.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import clsx from 'clsx';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/styles/components/ReservationNoticeModal.module.scss';

type Props = {
  locale?: 'ja' | 'en';
  href: string;
  tel: string;
  className?: string;
  status: string;
  ariaLabel: string;
  children: ReactNode;
};

export default function ShopReservationNoticeLink({
  locale = 'ja',
  href,
  tel,
  className,
  status,
  ariaLabel,
  children,
}: Props) {
  const isEnglish = locale === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const telHref = `tel:${tel.replace(/-/g, '')}`;
  const modal =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            className={styles.modalOverlay}
            role="presentation"
            onClick={() => setIsOpen(false)}
          >
            <div
              className={styles.modalBox}
              role="dialog"
              aria-modal="true"
              aria-label={
                isEnglish
                  ? 'Important information before booking'
                  : '予約前の確認事項'
              }
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={styles.modalClose}
                aria-label={isEnglish ? 'Close' : '閉じる'}
                onClick={() => setIsOpen(false)}
              />
              {isEnglish ? (
                <ul className={styles.listNotes}>
                  <li>
                    Please note that specific seating requests cannot be
                    guaranteed.
                  </li>
                  <li>
                    If we cannot reach you more than 15 minutes after your
                    reservation time, your reservation may be treated as a
                    cancellation. Please contact the restaurant if you expect to
                    arrive late.
                  </li>
                  <li>
                    For reservations of 5 or more guests, please contact the
                    restaurant directly.
                  </li>
                  <li>
                    Children&apos;s meals are not available.
                    <br />
                    If a child will have the same meal as an adult, please
                    include them in the number of adults when booking.
                    <br />
                    If a child will not be having a meal, please include them in
                    the number of children.
                  </li>
                </ul>
              ) : (
                <ul className={styles.listNotes}>
                  <li>
                    お席のご指定につきましては、ご要望に添えない場合もございますので、予めご了承ください。
                  </li>
                  <li>
                    ご予約のお時間15分を過ぎてご連絡が取れない場合はやむを得ずキャンセル扱いとさせていただく場合がございますので遅れる場合は必ずご連絡ください。
                  </li>
                  <li>
                    5名様以上のご予約の際は直接店舗までお問い合わせください。
                  </li>
                  <li>
                    お子様向けのお料理のご用意はございません。
                    <br />
                    大人と同じお食事をされる場合は大人の人数に含めてご予約いただくようお願いいたします。
                    <br />
                    お召し上がりにならない場合はお子様の人数に含めていただくようお願いいたします。
                  </li>
                </ul>
              )}
              <p className={styles.itemTel}>
                {isEnglish ? 'Telephone inquiries: ' : 'お電話でのお問合せ：'}
                <a href={telHref}>{tel}</a>
              </p>
              <Link href={href} className={clsx(styles.btnConfirm)}>
                {isEnglish
                  ? 'Proceed to Reservation'
                  : '内容を確認して予約に進む'}
              </Link>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        type="button"
        className={className}
        data-status={status}
        aria-label={ariaLabel}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>
      {modal}
    </>
  );
}
