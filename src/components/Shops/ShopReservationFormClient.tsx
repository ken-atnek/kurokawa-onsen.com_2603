/* =======================================
 * 黒川温泉観光協会 飲食店予約フォーム
 * URL: src/components/Shops/ShopReservationFormClient.tsx
 * Referenced in: src/app/shops/reserve/page.tsx
 * Created: 2026-09-04
 * Last updated: 2026-10-07
 * ======================================= */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import ShopHeader from '@/components/Shops/ShopHeader';
import SelectBox from '@/components/common/SelectBox';
import {
  NATIONALITIES,
  getNationalityLabel,
  getNationalityOptionGroups,
} from '@/data/nationalities';
import { useShopReservationFormData } from '@/hooks/shops/useShopReservationFormData';
import { getHoursRow } from '@/lib/shops/getHoursRow';
import styles from '@/styles/PageShopReservation.module.scss';

type Props = {
  id: string;
  date: string;
  guests: number;
  locale?: 'ja' | 'en';
};

type CustomerInputKey =
  | 'name'
  | 'kana'
  | 'nationality'
  | 'tel'
  | 'email'
  | 'emailConfirm'
  | 'childrenNote'
  | 'request';

type FormStep = 'input' | 'confirm' | 'complete';

type ReservationApiErrorCode =
  | 'INVALID_REQUEST'
  | 'VALIDATION_ERROR'
  | 'RESERVATION_UNAVAILABLE'
  | 'MENU_INVALID'
  | 'FULL'
  | 'METHOD_NOT_ALLOWED'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];
const RESERVATION_API_ERROR_CODES = new Set<ReservationApiErrorCode>([
  'INVALID_REQUEST',
  'VALIDATION_ERROR',
  'RESERVATION_UNAVAILABLE',
  'MENU_INVALID',
  'FULL',
  'METHOD_NOT_ALLOWED',
  'UNSUPPORTED_MEDIA_TYPE',
  'RATE_LIMITED',
  'INTERNAL_ERROR',
]);

function hasExactObjectKeys(
  value: unknown,
  expectedKeys: string[]
): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  const actualKeys = Object.keys(value).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();
  return (
    actualKeys.length === sortedExpectedKeys.length &&
    actualKeys.every((key, index) => key === sortedExpectedKeys[index])
  );
}

function isReservationApiSuccessResponse(
  value: unknown
): value is { success: true; reservationId: number } {
  return (
    hasExactObjectKeys(value, ['success', 'reservationId']) &&
    value.success === true &&
    typeof value.reservationId === 'number' &&
    Number.isSafeInteger(value.reservationId) &&
    value.reservationId > 0
  );
}

function isReservationApiErrorResponse(value: unknown): value is {
  success: false;
  errorCode: ReservationApiErrorCode;
  message: string;
} {
  return (
    hasExactObjectKeys(value, ['success', 'errorCode', 'message']) &&
    value.success === false &&
    typeof value.errorCode === 'string' &&
    RESERVATION_API_ERROR_CODES.has(
      value.errorCode as ReservationApiErrorCode
    ) &&
    typeof value.message === 'string' &&
    value.message !== ''
  );
}

function normalizeCustomerIdentityInput(value: string) {
  if (/[\u0000-\u001f\u007f-\u009f]/.test(value)) return null;

  const normalized = value
    .replace(
      /[\s\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/g,
      ' '
    )
    .trim();
  const length = Array.from(normalized).length;

  if (length < 1 || length > 101) {
    return null;
  }

  return normalized;
}

export default function ShopReservationFormClient({
  id,
  date,
  guests,
  locale = 'ja',
}: Props) {
  const isEnglish = locale === 'en';
  const { shopDetail, reservationBasic, menuItems, status } =
    useShopReservationFormData(id, date, guests, locale);
  const [seatOnly, setSeatOnly] = useState(false);
  const [courseByGuest, setCourseByGuest] = useState(() =>
    Array.from({ length: guests }, () => '')
  );
  const [customerInput, setCustomerInput] = useState<
    Record<CustomerInputKey, string>
  >({
    name: '',
    kana: '',
    nationality: isEnglish ? '' : 'JP',
    tel: '',
    email: '',
    emailConfirm: '',
    childrenNote: '',
    request: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [formStep, setFormStep] = useState<FormStep>('input');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [, setReservationId] = useState<number | null>(null);

  const displayName = isEnglish
    ? (shopDetail?.name_en ?? [])
    : (shopDetail?.name ?? []);
  const displayLeadCopy = isEnglish
    ? (shopDetail?.leadCopy_en ?? [])
    : (shopDetail?.leadCopy ?? []);
  const displayHours = isEnglish
    ? (shopDetail?.info.hours_en ?? [])
    : (shopDetail?.info.hours ?? []);
  const timeRanges = getHoursRow(displayHours)?.timeRanges ?? [];
  const nationalityOptionGroups = useMemo(
    () => getNationalityOptionGroups(locale),
    [locale]
  );
  const reserveImage =
    shopDetail?.heroImage ??
    shopDetail?.pickupItems.find((item) => item.image)?.image ??
    '/images/no-image.webp';
  const menuOptions = useMemo(
    () => [
      {
        value: '',
        label: isEnglish ? 'Select a course' : 'コースを選択してください',
      },
      ...menuItems.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    ],
    [isEnglish, menuItems]
  );
  const canShowMenuSelection =
    reservationBasic?.menuSelectionType !== 0 && menuItems.length > 0;
  const isMenuSelectionRequired = reservationBasic?.menuSelectionType === 2;
  const canReserve = status === 'open' || status === 'limited';
  const selectedCourseRows = courseByGuest.map((value, index) => {
    const menuName =
      menuItems.find((item) => item.id === value)?.name ??
      (isEnglish ? 'Select at the restaurant' : 'ご来店時に選ぶ');

    return {
      label: isEnglish ? `Guest ${index + 1}` : `${index + 1}人目`,
      value: seatOnly
        ? isEnglish
          ? 'Table reservation only'
          : 'お席のみ予約'
        : menuName,
    };
  });

  if (!shopDetail) return null;

  const updateCourse = (index: number, value: string) => {
    setCourseByGuest((current) =>
      current.map((item, i) => (i === index ? value : item))
    );
  };

  const updateSeatOnly = (checked: boolean) => {
    setSeatOnly(checked);

    if (checked) {
      setCourseByGuest((current) => current.map(() => ''));
    }
  };

  const updateCustomerInput = (key: CustomerInputKey, value: string) => {
    setCustomerInput((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const moveToConfirm = () => {
    if (!canReserve) {
      setErrorMessage(
        isEnglish
          ? 'The selected date is not currently available for booking.'
          : '選択された日程は現在ご予約いただけません。'
      );
      return;
    }

    if (
      !customerInput.name ||
      (!isEnglish && !customerInput.kana) ||
      !customerInput.nationality ||
      !customerInput.tel ||
      !customerInput.email ||
      !customerInput.emailConfirm
    ) {
      setErrorMessage(
        isEnglish
          ? 'Please complete all required fields.'
          : '必須項目を入力してください。'
      );
      return;
    }

    const normalizedName = normalizeCustomerIdentityInput(customerInput.name);
    const normalizedKana = isEnglish
      ? normalizedName
      : normalizeCustomerIdentityInput(customerInput.kana);
    if (normalizedName === null || normalizedKana === null) {
      setErrorMessage(
        isEnglish
          ? 'Name must be between 1 and 101 characters.'
          : 'お名前・ふりがなは1〜101文字で入力してください。'
      );
      return;
    }

    if (
      !/^[A-Z]{2}$/.test(customerInput.nationality) ||
      !NATIONALITIES.some((item) => item.value === customerInput.nationality)
    ) {
      setErrorMessage(
        isEnglish
          ? 'Please select your nationality.'
          : '国籍を選択してください。'
      );
      return;
    }

    if (customerInput.email !== customerInput.emailConfirm) {
      setErrorMessage(
        isEnglish
          ? 'The email addresses do not match.'
          : 'メールアドレスが一致していません。'
      );
      return;
    }

    if (isMenuSelectionRequired && courseByGuest.some((value) => !value)) {
      setErrorMessage(
        isEnglish
          ? 'Please select a menu for each guest.'
          : 'お食事メニューを人数分選択してください。'
      );
      return;
    }

    if (!agreed) {
      setErrorMessage(
        isEnglish
          ? 'Please agree to the Privacy Policy.'
          : 'プライバシーポリシーに同意してください。'
      );
      return;
    }

    setCustomerInput((current) => ({
      ...current,
      name: normalizedName,
      kana: normalizedKana,
    }));
    setErrorMessage('');
    setFormStep('confirm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const moveToInput = () => {
    setErrorMessage('');
    setFormStep('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitReservation = async () => {
    if (isSending) return;

    const note = [
      customerInput.childrenNote.trim()
        ? `${isEnglish ? '[Children of Elementary School Age or Younger]' : '[小学生以下のお子様]'}\n${customerInput.childrenNote.trim()}`
        : '',
      customerInput.request.trim()
        ? `${isEnglish ? '[Requests / Allergies]' : '[ご要望・アレルギー等]'}\n${customerInput.request.trim()}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const body = {
      shop_id: id,
      date,
      guests,
      menu_selections: courseByGuest.map((menuId) =>
        seatOnly || menuId === '' ? null : menuId
      ),
      name: customerInput.name,
      kana: customerInput.kana,
      nationality: customerInput.nationality,
      tel: customerInput.tel,
      email: customerInput.email,
      note,
      privacy_agreed: agreed,
    };

    setIsSending(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/reservation/send.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const responseBody: unknown = await res.json();

      if (res.status === 200 && isReservationApiSuccessResponse(responseBody)) {
        setReservationId(responseBody.reservationId);
        setFormStep('complete');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (!res.ok && isReservationApiErrorResponse(responseBody)) {
        setErrorMessage(
          getReservationApiErrorMessage(
            responseBody.errorCode,
            locale,
            responseBody.message
          )
        );
        return;
      }

      throw new Error('Unexpected reservation response.');
    } catch {
      setErrorMessage(
        isEnglish
          ? 'Failed to submit your reservation. Please try again later.'
          : '送信に失敗しました。時間をおいて再度お試しください。'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <ShopHeader
        locale={locale}
        name={displayName}
        leadCopy={displayLeadCopy}
        tel={shopDetail.info.tel}
        web={shopDetail.info.web}
        mail={shopDetail.info.mail}
        mapLinkUrl={shopDetail.info.mapLinkUrl}
        category={shopDetail.category}
        shopSlug={id}
        statusFallbackKey={shopDetail.statusFallbackKey}
        closedWeekdays={shopDetail.info.closedWeekdays}
        timeRanges={timeRanges}
        hasOnlineList={!isEnglish && (shopDetail.onlineProductsCount ?? 0) > 0}
      />

      <section className={styles.containerReservationForm}>
        <article>
          <div className={styles.boxH2}>
            <h2>{isEnglish ? 'Reservation Form' : 'ご予約フォーム'}</h2>
          </div>

          <ol className={styles.listSteps}>
            <li className={formStep === 'input' ? styles.isCurrent : undefined}>
              {isEnglish
                ? 'Reservation / Guest Information'
                : 'ご予約/お客様情報'}
            </li>
            <li
              className={formStep === 'confirm' ? styles.isCurrent : undefined}
            >
              {isEnglish ? 'Review' : 'ご予約内容確認'}
            </li>
            <li
              className={formStep === 'complete' ? styles.isCurrent : undefined}
            >
              {isEnglish ? 'Complete' : '送信'}
            </li>
          </ol>

          {formStep === 'complete' ? (
            <div className={styles.boxComplete}>
              <div className={styles.boxCompleteText}>
                <p>
                  {isEnglish
                    ? 'Thank you for your reservation'
                    : 'ご予約ありがとうございます'}
                </p>
                {isEnglish ? (
                  <span>
                    Your reservation has been received.
                    <br />
                    A confirmation email has been sent to the email address you
                    provided.
                    <br />
                    Please review your reservation details.
                    <br />
                    The restaurant may contact you if any additional
                    confirmation is required.
                  </span>
                ) : (
                  <span>
                    ご予約を受け付けました。
                    <br />
                    ご入力いただいたメールアドレス宛に、予約内容の確認メールを送信しております。
                    <br />
                    ご予約内容をご確認ください。
                    <br />
                    ご予約いただいた内容について確認が必要な場合
                    <br />
                    店舗よりご連絡させていただく場合がございます。
                  </span>
                )}
              </div>
              <Link
                href={isEnglish ? '/en/' : '/'}
                className={styles.btnSubmit}
              >
                {isEnglish ? 'Back to Home' : 'TOPページへ戻る'}
              </Link>
            </div>
          ) : null}

          {formStep === 'confirm' ? (
            <>
              {errorMessage ? (
                <p className={styles.itemAlert} role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <section
                className={clsx(styles.boxPanel, styles.boxConfirmContent)}
              >
                <div className={styles.boxH3}>
                  <h3>{isEnglish ? 'Reservation Details' : 'ご予約内容'}</h3>
                </div>
                <dl className={styles.listConfirm}>
                  <div>
                    <dt>{isEnglish ? 'Restaurant' : '店舗'}</dt>
                    <dd className={styles.itemShop}>
                      <Image
                        src={reserveImage}
                        alt={displayName.join(' ')}
                        width={180}
                        height={110}
                      />
                      <span>{displayName.join(' ')}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Reservation Date' : '予約日'}</dt>
                    <dd>{formatReservationDate(date, locale)}</dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Guests' : 'ご利用人数'}</dt>
                    <dd>
                      {isEnglish
                        ? `${guests} ${guests === 1 ? 'guest' : 'guests'}`
                        : `${guests}名`}
                    </dd>
                  </div>
                  {canShowMenuSelection ? (
                    <div>
                      <dt>{isEnglish ? 'Menu' : 'お食事メニュー'}</dt>
                      <dd>
                        {selectedCourseRows.map((row) => (
                          <span key={row.label}>
                            {row.label}
                            {isEnglish ? ': ' : '：'}
                            {row.value}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className={styles.boxH3}>
                  <h3>{isEnglish ? 'Guest Information' : 'お客様情報'}</h3>
                </div>
                <dl className={styles.listConfirm}>
                  <div>
                    <dt>{isEnglish ? 'Name' : 'お名前'}</dt>
                    <dd>{customerInput.name}</dd>
                  </div>
                  {!isEnglish ? (
                    <div>
                      <dt>ふりがな</dt>
                      <dd>{customerInput.kana}</dd>
                    </div>
                  ) : null}
                  <div>
                    <dt>{isEnglish ? 'Nationality' : '国籍'}</dt>
                    <dd>
                      {getNationalityLabel(customerInput.nationality, locale)}
                    </dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Phone Number' : '電話番号'}</dt>
                    <dd>{customerInput.tel}</dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Email Address' : 'メールアドレス'}</dt>
                    <dd>{customerInput.email}</dd>
                  </div>
                  <div>
                    <dt>
                      {isEnglish
                        ? 'Children of Elementary School Age or Younger'
                        : '小学生以下のお子様'}
                    </dt>
                    <dd>
                      {customerInput.childrenNote ||
                        (isEnglish ? 'None' : 'なし')}
                    </dd>
                  </div>
                  <div>
                    <dt>
                      {isEnglish
                        ? 'Requests / Allergies'
                        : 'ご要望・アレルギー等'}
                    </dt>
                    <dd>
                      {customerInput.request || (isEnglish ? 'None' : 'なし')}
                    </dd>
                  </div>
                </dl>
              </section>

              <div className={styles.boxButtons}>
                <button
                  type="button"
                  className={styles.btnBack}
                  onClick={moveToInput}
                >
                  {isEnglish ? 'Edit' : '修正する'}
                </button>
                <button
                  type="button"
                  className={styles.btnSubmit}
                  onClick={submitReservation}
                  disabled={isSending}
                >
                  {isSending
                    ? isEnglish
                      ? 'Submitting...'
                      : '送信中です'
                    : isEnglish
                      ? 'Confirm Reservation'
                      : 'この情報で予約する'}
                </button>
              </div>
            </>
          ) : null}

          {formStep === 'input' ? (
            <>
              {!isEnglish ? (
                <ExternalLink
                  href={`https://kurokawaonsen.or.jp/availability/room.php?selYMD=${encodeURIComponent(date)}&ref=kyokai`}
                  className={styles.linkStayPlan}
                >
                  <Image
                    src="/images/common/link-stay-plan.webp"
                    alt="素泊まりプラン"
                    width={600}
                    height={80}
                  />
                </ExternalLink>
              ) : null}

              {!canReserve ? (
                <p className={styles.itemAlert}>
                  {isEnglish
                    ? 'The selected date is not currently available for booking.'
                    : '選択された日程は現在ご予約いただけません。'}
                </p>
              ) : null}

              <section
                className={clsx(styles.boxPanel, styles.boxReservationSummary)}
              >
                <div className={styles.boxH3}>
                  <h3>{isEnglish ? 'Reservation Details' : 'ご予約内容'}</h3>
                </div>
                <dl className={styles.listReservationSummary}>
                  <div>
                    <dt>{isEnglish ? 'Restaurant' : '店舗'}</dt>
                    <dd className={styles.itemShop}>
                      <Image
                        src={reserveImage}
                        alt={displayName.join(' ')}
                        width={180}
                        height={110}
                      />
                      <span>{displayName.join(' ')}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Reservation Date' : '予約日'}</dt>
                    <dd>{formatReservationDate(date, locale)}</dd>
                  </div>
                  <div>
                    <dt>{isEnglish ? 'Guests' : 'ご利用人数'}</dt>
                    <dd>
                      {isEnglish
                        ? `${guests} ${guests === 1 ? 'guest' : 'guests'}`
                        : `${guests}名`}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`${isEnglish ? '/en' : ''}/shops/detail?id=${id}`}
                  className={styles.btnSub}
                >
                  {isEnglish
                    ? 'Change Reservation Details'
                    : '予約内容を変更する'}
                </Link>
              </section>

              {canShowMenuSelection ? (
                <section
                  className={clsx(styles.boxPanel, styles.boxMenuSelection)}
                >
                  <div className={styles.boxH3}>
                    <h3>{isEnglish ? 'Menu' : 'お食事メニュー'}</h3>
                  </div>
                  {isMenuSelectionRequired ? null : (
                    <label className={styles.itemSeatOnly}>
                      <input
                        type="checkbox"
                        checked={seatOnly}
                        onChange={(e) => updateSeatOnly(e.target.checked)}
                      />
                      <span>
                        {isEnglish
                          ? 'Reserve a table without selecting a course'
                          : 'お席のみ予約する'}
                      </span>
                    </label>
                  )}
                  {!seatOnly ? (
                    <>
                      <p className={styles.itemLead}>
                        {isEnglish
                          ? 'Please select a menu for each guest.'
                          : 'お一人様ずつお食事メニューを選択してください。'}
                      </p>
                      <ul className={styles.listMenus}>
                        {menuItems.map((item) => (
                          <li key={item.id}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={320}
                              height={210}
                            />
                            <h4>{item.name}</h4>
                            <p>
                              {isEnglish
                                ? `¥${item.price.toLocaleString('en-US')}`
                                : `${item.price.toLocaleString('ja-JP')}円`}
                              {item.taxIncluded ? (
                                <span>
                                  {isEnglish ? ' (tax included)' : '（税込）'}
                                </span>
                              ) : null}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.listCourseSelects}>
                        {courseByGuest.map((value, i) => (
                          <div key={i}>
                            <h4>
                              {isEnglish ? `Guest ${i + 1}` : `${i + 1}人目`}
                            </h4>
                            <SelectBox
                              name={`reservationCourse${i + 1}`}
                              value={value}
                              options={menuOptions}
                              onChange={(nextValue) =>
                                updateCourse(i, nextValue)
                              }
                              position="left"
                              height="4.2rem"
                              listHeight="3.8rem"
                              valueFontSize="1.4rem"
                              labelFontSize="1.4rem"
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </section>
              ) : null}

              <section
                className={clsx(styles.boxPanel, styles.boxCustomerInfo)}
              >
                <div className={styles.boxH3}>
                  <h3>{isEnglish ? 'Guest Information' : 'お客様情報'}</h3>
                </div>
                <div className={styles.listInputs}>
                  <FormInput
                    locale={locale}
                    label={isEnglish ? 'Name' : 'お名前'}
                    required
                    value={customerInput.name}
                    placeholder={isEnglish ? 'Taro Kurokawa' : '黒川 太郎'}
                    autoComplete="name"
                    maxLength={101}
                    onChange={(value) => updateCustomerInput('name', value)}
                  />
                  {!isEnglish ? (
                    <FormInput
                      locale={locale}
                      label="ふりがな"
                      required
                      value={customerInput.kana}
                      placeholder="くろかわ たろう"
                      maxLength={101}
                      onChange={(value) => updateCustomerInput('kana', value)}
                    />
                  ) : null}
                  <label className={styles.itemSelect}>
                    <span>
                      {isEnglish ? 'Nationality' : '国籍'}
                      <i>{isEnglish ? 'Required' : '必須'}</i>
                    </span>
                    <div className={styles.selectWrapper}>
                      <select
                        name="nationality"
                        value={customerInput.nationality}
                        autoComplete="country"
                        onChange={(e) =>
                          updateCustomerInput('nationality', e.target.value)
                        }
                      >
                        {isEnglish ? (
                          <option value="" disabled>
                            Select your nationality
                          </option>
                        ) : null}
                        {nationalityOptionGroups.map((group) => (
                          <optgroup key={group.label} label={group.label}>
                            {group.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                    </div>
                  </label>
                  <FormInput
                    locale={locale}
                    label={isEnglish ? 'Phone Number' : '電話番号'}
                    required
                    value={customerInput.tel}
                    placeholder="090-1234-5678"
                    autoComplete="tel"
                    onChange={(value) => updateCustomerInput('tel', value)}
                  />
                  <FormInput
                    locale={locale}
                    label={isEnglish ? 'Email Address' : 'メールアドレス'}
                    required
                    value={customerInput.email}
                    placeholder="example@mail.com"
                    autoComplete="email"
                    onChange={(value) => updateCustomerInput('email', value)}
                  />
                  <FormInput
                    locale={locale}
                    label={
                      isEnglish
                        ? 'Confirm Email Address'
                        : 'メールアドレス（確認）'
                    }
                    required
                    value={customerInput.emailConfirm}
                    placeholder="example@mail.com"
                    autoComplete="email"
                    onChange={(value) =>
                      updateCustomerInput('emailConfirm', value)
                    }
                  />
                  <label className={styles.itemTextarea}>
                    <span>
                      {isEnglish
                        ? 'Children of Elementary School Age or Younger'
                        : '小学生以下のお子様'}
                      <i>{isEnglish ? 'Optional' : '任意'}</i>
                    </span>
                    <textarea
                      value={customerInput.childrenNote}
                      placeholder={
                        isEnglish
                          ? 'If you are bringing children of elementary school age or younger, please enter the number of children and their ages. Child seats will be prepared.'
                          : '小学生以下のお子様をお連れの場合は、人数・年齢をご記入ください。子ども用の椅子をご用意します。'
                      }
                      onChange={(e) =>
                        updateCustomerInput('childrenNote', e.target.value)
                      }
                    />
                  </label>
                  <label className={styles.itemTextarea}>
                    <span>
                      {isEnglish
                        ? 'Requests / Allergies'
                        : 'ご要望・アレルギー等'}
                      <i>{isEnglish ? 'Optional' : '任意'}</i>
                    </span>
                    <textarea
                      value={customerInput.request}
                      placeholder={
                        isEnglish
                          ? 'Please enter any allergies or requests for the restaurant.'
                          : 'アレルギーやお店へのご要望がございましたらご記入ください。'
                      }
                      onChange={(e) =>
                        updateCustomerInput('request', e.target.value)
                      }
                    />
                  </label>
                </div>
              </section>

              <label className={styles.itemPrivacy}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span>
                  {isEnglish ? (
                    <>
                      I agree to the{' '}
                      <Link href="/privacy/">Privacy Policy</Link>
                    </>
                  ) : (
                    <>
                      <Link href="/privacy/">プライバシーポリシー</Link>
                      に同意する
                    </>
                  )}
                </span>
              </label>

              {errorMessage ? (
                <p className={styles.itemAlert} role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <button
                type="button"
                className={styles.btnSubmit}
                onClick={moveToConfirm}
              >
                {isEnglish ? 'Review Reservation' : '入力内容を確認する'}
              </button>
              <Link
                href={`${isEnglish ? '/en' : ''}/shops/detail?id=${id}`}
                className={styles.linkBack}
              >
                {isEnglish ? 'Back to Availability' : '空席状況に戻る'}
              </Link>
            </>
          ) : null}
        </article>
      </section>
    </>
  );
}

type FormInputProps = {
  locale?: 'ja' | 'en';
  label: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  maxLength?: number;
  required?: boolean;
  onChange: (value: string) => void;
};

function FormInput({
  locale = 'ja',
  label,
  value,
  placeholder,
  autoComplete,
  maxLength,
  required,
  onChange,
}: FormInputProps) {
  return (
    <label className={styles.itemInput}>
      <span>
        {label}
        <i>
          {locale === 'en'
            ? required
              ? 'Required'
              : 'Optional'
            : required
              ? '必須'
              : '任意'}
        </i>
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function formatReservationDate(date: string, locale: 'ja' | 'en') {
  const value = new Date(`${date}T00:00:00`);

  if (locale === 'en') {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }).format(value);
  }

  const weekday = WEEKDAYS[value.getDay()];

  return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日（${weekday}）`;
}

function getReservationApiErrorMessage(
  errorCode: ReservationApiErrorCode,
  locale: 'ja' | 'en',
  fallbackMessage: string
) {
  if (locale === 'ja') return fallbackMessage;

  if (errorCode === 'RESERVATION_UNAVAILABLE' || errorCode === 'FULL') {
    return 'The selected reservation is no longer available. Please choose another date or number of guests.';
  }

  if (errorCode === 'MENU_INVALID') {
    return 'The selected menu is not available. Please review your menu selection.';
  }

  if (errorCode === 'RATE_LIMITED') {
    return 'Too many requests were submitted. Please wait a moment and try again.';
  }

  if (errorCode === 'INVALID_REQUEST' || errorCode === 'VALIDATION_ERROR') {
    return 'Please review the information you entered.';
  }

  return 'Failed to submit your reservation. Please try again later.';
}
