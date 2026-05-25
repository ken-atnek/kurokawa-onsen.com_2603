/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ(view)
 * URL: src/components/Shops/ShopProductDetailView.tsx
 * Referenced in: src/components/Shops/ShopProductDetailClient.tsx
 * Created: 2026-02-13
 * Last updated: 2026-05-22
 * ======================================= */
'use client';
import styles from '@/styles/PageShopProductDetail.module.scss';
import type {
  ShopProductDetail,
  ProductStandard,
  ProductStandardItem,
  ProductStandardOption,
} from '@/types/shop';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type AddCartResponse = {
  ok: boolean;
  cart?: {
    count: number;
    total?: number;
  };
  item?: {
    product_id: number;
    product_class_id: number;
    quantity: number;
  };
  error?: string;
  message?: string;
};

type Props = {
  shopName: string[];
  shopSlug: string;
  category: string;
  product: ShopProductDetail;
};

export default function ShopProductDetailView({
  shopName,
  shopSlug,
  category,
  product,
}: Props) {
  // 規格あり判定
  const standardData: ProductStandard | null = (() => {
    const s = product.standard;
    if (!s || Array.isArray(s)) return null;
    if (!Array.isArray(s.items) || s.items.length === 0) return null;
    return s;
  })();
  const hasStandard = standardData !== null;
  const standardItems: ProductStandardItem[] = standardData?.items ?? [];
  const options1: ProductStandardOption[] = standardData?.classCategory?.options1 ?? [];
  const allOptions2: ProductStandardOption[] = standardData?.classCategory?.options2 ?? [];
  const hasOption2 = allOptions2.length > 0;
  const firstVariant: ProductStandardItem | null = standardItems[0] ?? null;

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const images = Array.isArray(product.images) ? product.images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOption1Id, setSelectedOption1Id] = useState<number | null>(
    firstVariant?.classCategoryId1 ?? null
  );
  const [selectedOption2Id, setSelectedOption2Id] = useState<number | null>(
    firstVariant?.classCategoryId2 ?? null
  );
  const [quantity, setQuantity] = useState(1);

  // 規格2: 規格1選択後に存在する組み合わせのみに絞り込んだ選択肢
  const filteredOptions2: ProductStandardOption[] = (() => {
    if (!hasOption2 || selectedOption1Id == null) return allOptions2;
    const validIds = new Set(
      standardItems
        .filter((item) => item.classCategoryId1 === selectedOption1Id)
        .map((item) => item.classCategoryId2)
        .filter((id): id is number => id != null)
    );
    return allOptions2.filter((opt) => validIds.has(opt.id));
  })();

  // 選択済み規格 item
  const selectedVariant: ProductStandardItem | null = hasStandard
    ? standardItems.find((item) => {
        const match1 = item.classCategoryId1 === selectedOption1Id;
        const match2 = hasOption2
          ? item.classCategoryId2 === selectedOption2Id
          : true;
        return match1 && match2;
      }) ?? null
    : null;

  // 在庫
  const resolvedStockUnlimited = hasStandard
    ? selectedVariant?.stockUnlimited === true
    : product.stockUnlimited === true;
  const resolvedStock = hasStandard
    ? (selectedVariant?.stock ?? 0)
    : (product.stock ?? 0);
  const isOutOfStock = !resolvedStockUnlimited && resolvedStock <= 0;
  const maxQty = resolvedStockUnlimited ? 999 : Math.max(1, resolvedStock);

  const activeSrc = images[activeIndex] ?? images[0] ?? '';

  useEffect(() => {
    if (!hasStandard) {
      setSelectedOption1Id(null);
      setSelectedOption2Id(null);
      setQuantity(1);
      return;
    }
    setSelectedOption1Id(firstVariant?.classCategoryId1 ?? null);
    setSelectedOption2Id(firstVariant?.classCategoryId2 ?? null);
    setQuantity(1);
  }, [hasStandard, firstVariant?.classCategoryId1, firstVariant?.classCategoryId2]);

  useEffect(() => {
    setQuantity((q) => Math.min(Math.max(q, 1), maxQty));
  }, [maxQty]);

  // 価格表示テキスト
  // 規格あり・selectedVariant なし時のみ価格帯表示（¥min〜¥max 形式）
  const isPriceRange = hasStandard && selectedVariant?.price == null;
  const priceText = useMemo(() => {
    const fmt = new Intl.NumberFormat('ja-JP');
    if (hasStandard) {
      if (selectedVariant?.price != null) return fmt.format(selectedVariant.price);
      const prices = standardItems
        .map((item) => item.price)
        .filter((p): p is number => p != null);
      if (prices.length === 0) return '—';
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      return min === max
        ? fmt.format(min)
        : `¥${fmt.format(min)}〜¥${fmt.format(max)}`;
    }
    return fmt.format(product.price);
  }, [hasStandard, selectedVariant?.price, standardItems, product.price]);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => Math.min(maxQty, q + 1));

  const openModal = (message: string) => {
    setModalMessage(message);
    setIsCartModalOpen(true);
  };

  const closeModal = () => {
    setIsCartModalOpen(false);
    setModalMessage(null);
  };

  const notifyCartUpdate = () => {
    window.dispatchEvent(new CustomEvent('cartCountChanged'));
  };

  const normalizeQuantity = (v: number) => {
    if (Number.isNaN(v) || v < 1) return 1;
    return Math.min(Math.floor(v), maxQty);
  };

  // カート追加に使う product_class_id
  const productClassId =
    hasStandard && selectedVariant?.ecClassId != null
      ? selectedVariant.ecClassId
      : product.ecClassId;

  // カートボタン disabled 条件
  const isVariantUnresolved =
    hasStandard && (selectedVariant == null || selectedVariant.ecClassId == null);
  const isCartDisabled =
    isAddingToCart ||
    !product.ecId ||
    productClassId == null ||
    isVariantUnresolved ||
    isOutOfStock ||
    quantity < 1;

  const handleAddToCart = async () => {
    if (!product.ecId) {
      openModal('EC商品IDが未設定のため、カートに追加できませんでした。');
      return;
    }

    setIsAddingToCart(true);
    try {
      const q = normalizeQuantity(quantity);
      const res = await fetch('/online-shop/custom-api/cart/add', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: Number(product.ecId),
          product_class_id: productClassId ? Number(productClassId) : undefined,
          quantity: Number(q),
        }),
        cache: 'no-store',
      });

      const text = await res.text();
      let data: AddCartResponse | null = null;
      try {
        data = JSON.parse(text);
      } catch {
        openModal(`カート追加に失敗しました (${res.status})`);
        return;
      }

      if (!res.ok || !data?.ok) {
        openModal(
          data?.message
            ? data.message
            : data?.error
              ? data.error
              : `カート追加に失敗しました (${res.status})`
        );
        return;
      }

      openModal('カートに追加しました');
      notifyCartUpdate();
    } catch (err) {
      console.error(err);
      openModal('通信に失敗しました。ネットワークをご確認ください。');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const cartHref = '/online-shop/cart';
  return (
    <>
      <section
        className={clsx(styles.containerHeader, styles[`category-${category}`])}
      >
        <p>
          {shopName.map((line, i) => (
            <span key={i}>
              {line}
              {i !== shopName.length - 1 && <br />}
            </span>
          ))}
        </p>
        <h2>{product.title}</h2>
      </section>
      <section className={styles.containerDetails}>
        <article>
          <div className={styles.boxImage}>
            {activeSrc ? (
              <figure>
                <Image
                  src={activeSrc}
                  alt={product.title}
                  width={900}
                  height={675}
                />
              </figure>
            ) : null}
            {images.length > 1 ? (
              <ul>
                {images.map((src, i) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-current={i === activeIndex ? 'true' : 'false'}
                    >
                      <Image src={src} alt="" width={220} height={165} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className={styles.boxDetail}>
            <p className={styles.itemId}>{product.id}</p>
            <h3>{product.title}</h3>
            <p className={styles.itemPrice}>
              {isPriceRange ? (
                <>
                  {priceText} <span>（税込）</span>
                </>
              ) : (
                <>
                  <i>¥</i>
                  {priceText} <span>（税込）</span>
                </>
              )}
            </p>
            <div className={styles.itemComment}>
              {product.comment.map((line, i) =>
                line === '' ? <br key={`br-${i}`} /> : <p key={i}>{line}</p>
              )}
            </div>
            {hasStandard && (
              <>
                {options1.length > 0 && (
                  <div className={styles.wrapInput}>
                    <h4>{standardData?.className?.label1 || '規格1'}</h4>
                    <div>
                      <select
                        value={selectedOption1Id ?? ''}
                        onChange={(e) => {
                          const nextId = Number(e.target.value);
                          setSelectedOption1Id(nextId);
                          if (hasOption2 && selectedOption2Id == null) {
                            // 規格2未選択: 規格1変更後の最初の item を自動選択し規格2もセット
                            const nextItem =
                              standardItems.find(
                                (item) => item.classCategoryId1 === nextId
                              ) ?? null;
                            setSelectedOption2Id(nextItem?.classCategoryId2 ?? null);
                          }
                          // 規格2選択済みの場合は規格1のみ変更（selectedVariant は自動再計算）
                          setQuantity(1);
                        }}
                      >
                        {options1.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                {hasOption2 && (
                  <div className={styles.wrapInput}>
                    <h4>{standardData?.className?.label2 || '規格2'}</h4>
                    <div>
                      <select
                        value={selectedOption2Id ?? ''}
                        onChange={(e) => {
                          setSelectedOption2Id(Number(e.target.value));
                          setQuantity(1);
                        }}
                      >
                        {filteredOptions2.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
            {!isOutOfStock ? (
              <div className={styles.wrapInput}>
                <h4>購入数量</h4>
                <div>
                  <button
                    type="button"
                    onClick={dec}
                    aria-label="減らす"
                    className={styles.itemMinus}
                    disabled={quantity === 1}
                    aria-disabled={quantity === 1}
                  ></button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={inc}
                    aria-label="増やす"
                    className={styles.itemPlus}
                    disabled={quantity >= maxQty}
                    aria-disabled={quantity >= maxQty}
                  ></button>
                </div>
              </div>
            ) : (
              <p className={styles.soldOut}>在庫切れ</p>
            )}
            <button
              type="button"
              className={styles.itemButton}
              disabled={isCartDisabled}
              aria-disabled={isCartDisabled}
              onClick={handleAddToCart}
            >
              {isAddingToCart ? '追加中...' : 'カートに入れる'}
            </button>
          </div>
        </article>
        <Link href={`/shops/products?id=${shopSlug}`} className={styles.linkList}>
          オンライン商品一覧に戻る
        </Link>
      </section>
      {isCartModalOpen && modalMessage && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <p className={styles.modalText}>
              {modalMessage === 'カートに追加しました' ? (
                <>
                  商品をカートに追加しました。
                  <br />
                  このままカートに進みますか？
                </>
              ) : (
                modalMessage
              )}
            </p>

            {modalMessage === 'カートに追加しました' ? (
              <nav>
                <button
                  type="button"
                  className={styles.modalBtnSecondary}
                  onClick={closeModal}
                >
                  お買い物を続ける
                </button>
                <Link
                  href={cartHref}
                  prefetch={false}
                  className={styles.modalBtnPrimary}
                  onClick={(e) => {
                    // Next ルーターに捕まると /online-shop/* を「存在しないページ」として 404 にし得るため、確実にハード遷移させる
                    e.preventDefault();
                    window.location.href = cartHref;
                  }}
                >
                  カートに進む
                </Link>
              </nav>
            ) : (
              <nav>
                <button
                  type="button"
                  className={styles.modalBtnSecondary}
                  onClick={closeModal}
                >
                  閉じる
                </button>
              </nav>
            )}

            <button
              type="button"
              onClick={closeModal}
              className={styles.modalClose}
            >
              <i>✕</i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
