/* =======================================
 * 黒川温泉観光協会 飲食店予約フォーム
 * URL: src/components/Shops/ShopReservationFormClient.tsx
 * Referenced in: src/app/shops/reserve/page.tsx
 * Created: 2026-09-04
 * ======================================= */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import ShopHeader from '@/components/Shops/ShopHeader';
import SelectBox from '@/components/common/SelectBox';
import { useShopReservationFormData } from '@/hooks/shops/useShopReservationFormData';
import { getHoursRow } from '@/lib/shops/getHoursRow';
import styles from '@/styles/PageShopReservation.module.scss';

type Props = {
  id: string;
  date: string;
  guests: number;
};

type CustomerInputKey =
  | 'name'
  | 'kana'
  | 'tel'
  | 'email'
  | 'emailConfirm'
  | 'request';

type FormStep = 'input' | 'confirm' | 'complete';

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export default function ShopReservationFormClient({ id, date, guests }: Props) {
  const { shopDetail, reservationBasic, menuItems, status } =
    useShopReservationFormData(id, date, guests);
  const [seatOnly, setSeatOnly] = useState(false);
  const [courseByGuest, setCourseByGuest] = useState(() =>
    Array.from({ length: guests }, () => '')
  );
  const [customerInput, setCustomerInput] = useState<
    Record<CustomerInputKey, string>
  >({
    name: '',
    kana: '',
    tel: '',
    email: '',
    emailConfirm: '',
    request: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [formStep, setFormStep] = useState<FormStep>('input');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const timeRanges =
    getHoursRow(shopDetail?.info.hours ?? [])?.timeRanges ?? [];
  const reserveImage =
    shopDetail?.heroImage ??
    shopDetail?.pickupItems.find((item) => item.image)?.image ??
    '/images/no-image.webp';
  const menuOptions = useMemo(
    () => [
      { value: '', label: 'コースを選択してください' },
      ...menuItems.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    ],
    [menuItems]
  );
  const canShowMenuSelection =
    reservationBasic?.menuSelectionType !== 0 && menuItems.length > 0;
  const isMenuSelectionRequired = reservationBasic?.menuSelectionType === 2;
  const canReserve = status === 'open' || status === 'limited';
  const selectedCourseRows = courseByGuest.map((value, index) => {
    const menuName =
      menuItems.find((item) => item.id === value)?.name ?? 'ご来店時に選ぶ';

    return {
      label: `${index + 1}人目`,
      value: seatOnly ? 'お席のみ予約' : menuName,
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
      setErrorMessage('選択された日程は現在ご予約いただけません。');
      return;
    }

    if (
      !customerInput.name ||
      !customerInput.kana ||
      !customerInput.tel ||
      !customerInput.email ||
      !customerInput.emailConfirm
    ) {
      setErrorMessage('必須項目を入力してください。');
      return;
    }

    if (customerInput.email !== customerInput.emailConfirm) {
      setErrorMessage('メールアドレスが一致していません。');
      return;
    }

    if (isMenuSelectionRequired && courseByGuest.some((value) => !value)) {
      setErrorMessage('お食事メニューを人数分選択してください。');
      return;
    }

    if (!agreed) {
      setErrorMessage('プライバシーポリシーに同意してください。');
      return;
    }

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

    const body = new FormData();

    body.append('shopId', id);
    body.append('shopName', shopDetail.name.join(''));
    body.append('reservationDate', formatReservationDate(date));
    body.append('guests', `${guests}名`);
    body.append(
      'selectedMenus',
      selectedCourseRows.map((row) => `${row.label}：${row.value}`).join('\n')
    );
    body.append('customerName', customerInput.name);
    body.append('customerKana', customerInput.kana);
    body.append('tel', customerInput.tel);
    body.append('email', customerInput.email);
    body.append('request', customerInput.request);

    setIsSending(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/reservation/send.php', {
        method: 'POST',
        body,
      });

      if (!res.ok) {
        throw new Error('Failed to send reservation.');
      }

      setFormStep('complete');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setErrorMessage('送信に失敗しました。時間をおいて再度お試しください。');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <ShopHeader
        name={shopDetail.name}
        leadCopy={shopDetail.leadCopy}
        tel={shopDetail.info.tel}
        web={shopDetail.info.web}
        mail={shopDetail.info.mail}
        mapLinkUrl={shopDetail.info.mapLinkUrl}
        category={shopDetail.category}
        shopSlug={id}
        statusFallbackKey={shopDetail.statusFallbackKey}
        closedWeekdays={shopDetail.info.closedWeekdays}
        timeRanges={timeRanges}
        hasOnlineList={(shopDetail.onlineProductsCount ?? 0) > 0}
      />

      <section className={styles.containerReservationForm}>
        <article>
          <div className={styles.boxH2}>
            <h2>ご予約フォーム</h2>
          </div>

          <ol className={styles.listSteps}>
            <li className={formStep === 'input' ? styles.isCurrent : undefined}>
              ご予約/お客様情報
            </li>
            <li
              className={formStep === 'confirm' ? styles.isCurrent : undefined}
            >
              ご予約内容確認
            </li>
            <li
              className={formStep === 'complete' ? styles.isCurrent : undefined}
            >
              送信
            </li>
          </ol>

          {formStep === 'complete' ? (
            <div className={styles.boxComplete}>
              <div className={styles.boxCompleteText}>
                <p>ご予約ありがとうございます</p>
                <span>
                  ご入力いただいたメールアドレス宛に、予約内容の確認メールをお送りしました。
                  <br />
                  内容をご確認ください。
                  <br />
                  ご予約内容について確認が必要な場合は、店舗よりご連絡いたします。
                </span>
              </div>
              <Link href="/" className={styles.btnSubmit}>
                TOPページへ戻る
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
                  <h3>ご予約内容</h3>
                </div>
                <dl className={styles.listConfirm}>
                  <div>
                    <dt>店舗</dt>
                    <dd className={styles.itemShop}>
                      <Image
                        src={reserveImage}
                        alt={shopDetail.name.join(' ')}
                        width={180}
                        height={110}
                      />
                      <span>{shopDetail.name.join('')}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>予約日</dt>
                    <dd>{formatReservationDate(date)}</dd>
                  </div>
                  <div>
                    <dt>ご利用人数</dt>
                    <dd>{guests}名</dd>
                  </div>
                  {canShowMenuSelection ? (
                    <div>
                      <dt>お食事メニュー</dt>
                      <dd>
                        {selectedCourseRows.map((row) => (
                          <span key={row.label}>
                            {row.label}：{row.value}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className={styles.boxH3}>
                  <h3>お客様情報</h3>
                </div>
                <dl className={styles.listConfirm}>
                  <div>
                    <dt>お名前</dt>
                    <dd>{customerInput.name}</dd>
                  </div>
                  <div>
                    <dt>ふりがな</dt>
                    <dd>{customerInput.kana}</dd>
                  </div>
                  <div>
                    <dt>電話番号</dt>
                    <dd>{customerInput.tel}</dd>
                  </div>
                  <div>
                    <dt>メールアドレス</dt>
                    <dd>{customerInput.email}</dd>
                  </div>
                  <div>
                    <dt>ご要望・アレルギー等</dt>
                    <dd>{customerInput.request || 'なし'}</dd>
                  </div>
                </dl>
              </section>

              <div className={styles.boxButtons}>
                <button
                  type="button"
                  className={styles.btnBack}
                  onClick={moveToInput}
                >
                  修正する
                </button>
                <button
                  type="button"
                  className={styles.btnSubmit}
                  onClick={submitReservation}
                  disabled={isSending}
                >
                  {isSending ? '送信中です' : 'この情報で予約する'}
                </button>
              </div>
            </>
          ) : null}

          {formStep === 'input' ? (
            <>
              <ExternalLink
                href="https://www.kurokawaonsen.or.jp/"
                className={styles.linkStayPlan}
              >
                <Image
                  src="/images/common/link-stay-plan.webp"
                  alt="素泊まりプラン"
                  width={600}
                  height={80}
                />
              </ExternalLink>

              {!canReserve ? (
                <p className={styles.itemAlert}>
                  選択された日程は現在ご予約いただけません。
                </p>
              ) : null}

              <section
                className={clsx(styles.boxPanel, styles.boxReservationSummary)}
              >
                <div className={styles.boxH3}>
                  <h3>ご予約内容</h3>
                </div>
                <dl className={styles.listReservationSummary}>
                  <div>
                    <dt>店舗</dt>
                    <dd className={styles.itemShop}>
                      <Image
                        src={reserveImage}
                        alt={shopDetail.name.join(' ')}
                        width={180}
                        height={110}
                      />
                      <span>{shopDetail.name.join('')}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>予約日</dt>
                    <dd>{formatReservationDate(date)}</dd>
                  </div>
                  <div>
                    <dt>ご利用人数</dt>
                    <dd>{guests}名</dd>
                  </div>
                </dl>
                <Link href={`/shops/detail?id=${id}`} className={styles.btnSub}>
                  予約内容を変更する
                </Link>
              </section>

              {canShowMenuSelection ? (
                <section
                  className={clsx(styles.boxPanel, styles.boxMenuSelection)}
                >
                  <div className={styles.boxH3}>
                    <h3>お食事メニュー</h3>
                  </div>
                  {isMenuSelectionRequired ? null : (
                    <label className={styles.itemSeatOnly}>
                      <input
                        type="checkbox"
                        checked={seatOnly}
                        onChange={(e) => updateSeatOnly(e.target.checked)}
                      />
                      <span>お席のみ予約する</span>
                    </label>
                  )}
                  {!seatOnly ? (
                    <>
                      <p className={styles.itemLead}>
                        お一人様ずつお食事メニューを選択してください。
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
                              {item.price.toLocaleString('ja-JP')}円
                              {item.taxIncluded ? (
                                <span>（税込）</span>
                              ) : null}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.listCourseSelects}>
                        {courseByGuest.map((value, i) => (
                          <div key={i}>
                            <h4>{i + 1}人目</h4>
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

              <section className={clsx(styles.boxPanel, styles.boxCustomerInfo)}>
                <div className={styles.boxH3}>
                  <h3>お客様情報</h3>
                </div>
                <div className={styles.listInputs}>
                  <FormInput
                    label="お名前"
                    required
                    value={customerInput.name}
                    placeholder="黒川 太郎"
                    autoComplete="name"
                    onChange={(value) => updateCustomerInput('name', value)}
                  />
                  <FormInput
                    label="ふりがな"
                    required
                    value={customerInput.kana}
                    placeholder="くろかわ たろう"
                    onChange={(value) => updateCustomerInput('kana', value)}
                  />
                  <FormInput
                    label="電話番号"
                    required
                    value={customerInput.tel}
                    placeholder="090-1234-5678"
                    autoComplete="tel"
                    onChange={(value) => updateCustomerInput('tel', value)}
                  />
                  <FormInput
                    label="メールアドレス"
                    required
                    value={customerInput.email}
                    placeholder="example@mail.com"
                    autoComplete="email"
                    onChange={(value) => updateCustomerInput('email', value)}
                  />
                  <FormInput
                    label="メールアドレス（確認）"
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
                      ご要望・アレルギー等
                      <i>任意</i>
                    </span>
                    <textarea
                      value={customerInput.request}
                      placeholder="アレルギーやお店へのご要望がございましたらご記入ください。"
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
                  <Link href="/privacy/">プライバシーポリシー</Link>に同意する
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
                入力内容を確認する
              </button>
              <Link href={`/shops/detail?id=${id}`} className={styles.linkBack}>
                空席状況に戻る
              </Link>
            </>
          ) : null}
        </article>
      </section>
    </>
  );
}

type FormInputProps = {
  label: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function FormInput({
  label,
  value,
  placeholder,
  autoComplete,
  required,
  onChange,
}: FormInputProps) {
  return (
    <label className={styles.itemInput}>
      <span>
        {label}
        <i>{required ? '必須' : '任意'}</i>
      </span>
      <input
      type="text"
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => onChange(e.target.value)}
    />
    </label>
  );
}

function formatReservationDate(date: string) {
  const value = new Date(`${date}T00:00:00`);
  const weekday = WEEKDAYS[value.getDay()];

  return `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日（${weekday}）`;
}
