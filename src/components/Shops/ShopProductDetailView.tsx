/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ(view)
 * URL: src/components/Shops/ShopProductDetailView.tsx
 * Referenced in: src/components/Shops/ShopProductDetailClient.tsx
 * Created: 2026-02-13
 * Last updated: 2026-05-04
 * ======================================= */
'use client';
import styles from '@/styles/PageShopProductDetail.module.scss';
import type { ShopProductDetail } from '@/types/shop';
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

type ProductStandardOption = {
  id: number;
  label: string;
};

type ProductStandardItem = {
  ecClassId?: number;
  classCategoryId1?: number;
  classCategoryId2?: number;
  price?: number;
  stock?: number;
};

type ProductStandard = {
  className?: {
    label1?: string;
    label2?: string;
  };
  classCategory?: {
    options1?: ProductStandardOption[];
    options2?: ProductStandardOption[];
  };
  items?: ProductStandardItem[];
};

export default function ShopProductDetailView({
  shopName,
  shopSlug,
  category,
  product,
}: Props) {
  const productWithStandard = product as ShopProductDetail & {
    standard?: ProductStandard | [];
  };
  const standardData =
    productWithStandard.standard &&
    !Array.isArray(productWithStandard.standard) &&
    Array.isArray(productWithStandard.standard.items)
      ? productWithStandard.standard
      : null;
  const standardItems = standardData?.items ?? [];
  const hasStandardItems = standardItems.length > 0;
  const options1 = standardData?.classCategory?.options1 ?? [];
  const options2 = standardData?.classCategory?.options2 ?? [];
  const hasOption2 = options2.length > 0;
  const firstVariant = hasStandardItems ? standardItems[0] : null;

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
  const selectedVariant = hasStandardItems
    ? standardItems.find((item) => {
        const option1Matched =
          selectedOption1Id == null || item.classCategoryId1 === selectedOption1Id;
        const option2Matched = hasOption2
          ? selectedOption2Id != null && item.classCategoryId2 === selectedOption2Id
          : true;
        return option1Matched && option2Matched;
      }) ?? null
    : null;
  const displayPrice =
    hasStandardItems && selectedVariant?.price != null
      ? selectedVariant.price
      : product.price;
  const stock =
    hasStandardItems && selectedVariant?.stock != null
      ? selectedVariant.stock
      : (product.stock ?? 0);
  const maxQty = Math.max(1, stock);
  const activeSrc = images[activeIndex] ?? images[0] ?? '';

  useEffect(() => {
    if (!hasStandardItems) {
      setSelectedOption1Id(null);
      setSelectedOption2Id(null);
      setQuantity(1);
      return;
    }

    setSelectedOption1Id(firstVariant?.classCategoryId1 ?? null);
    setSelectedOption2Id(firstVariant?.classCategoryId2 ?? null);
    setQuantity(1);
  }, [hasStandardItems, firstVariant?.classCategoryId1, firstVariant?.classCategoryId2]);

  useEffect(() => {
    setQuantity((q) => Math.min(Math.max(q, 1), maxQty));
  }, [maxQty]);

  const priceText = useMemo(() => {
    return new Intl.NumberFormat('ja-JP').format(displayPrice);
  }, [displayPrice]);

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

  const handleAddToCart = async () => {
    const productId = product.ecId;
    const productClassId =
      hasStandardItems && selectedVariant?.ecClassId != null
        ? selectedVariant.ecClassId
        : product.ecClassId;
    if (!productId) {
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
          product_id: Number(productId),
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
              <i>¥</i>
              {priceText} <span>（税込）</span>
            </p>
            <div className={styles.itemComment}>
              {product.comment.map((line, i) =>
                line === '' ? <br key={`br-${i}`} /> : <p key={i}>{line}</p>
              )}
            </div>
            {hasStandardItems && (
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
                          const nextItem =
                            standardItems.find(
                              (item) =>
                                item.classCategoryId1 === nextId &&
                                (hasOption2 ? item.classCategoryId2 != null : true)
                            ) ?? null;
                          if (hasOption2) {
                            setSelectedOption2Id(nextItem?.classCategoryId2 ?? null);
                          }
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
                        {options2.map((option) => (
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
            {stock > 0 ? (
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
                    disabled={stock > 0 ? quantity >= maxQty : true}
                    aria-disabled={stock > 0 ? quantity >= maxQty : true}
                  ></button>
                </div>
              </div>
            ) : (
              <p className={styles.soldOut}>在庫切れ</p>
            )}
            <button
              type="button"
              className={styles.itemButton}
              disabled={stock === 0 || isAddingToCart}
              aria-disabled={stock === 0 || isAddingToCart}
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
