/* =======================================
 * 黒川温泉観光協会 店舗オンライン商品 詳細ページ(view)
 * URL:src/components/Shops/ShopProductDetailView.tsx
 * Referenced in: : /shops/[slug]/products/[productId]
 * Created: 2026-02-13
 * Last updated: 2026-02-13
 * ======================================= */
'use client';
import styles from '@/styles/PageShopProductDetail.module.scss';
import type { ShopProductDetail } from '@/types/shop';
import Image from 'next/image';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo, useState } from 'react';

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
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const images = Array.isArray(product.images) ? product.images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const stock = product.stock ?? 0;
  const maxQty = Math.max(1, stock);
  const activeSrc = images[activeIndex] ?? images[0] ?? '';
  const priceText = useMemo(() => {
    return new Intl.NumberFormat('ja-JP').format(product.price);
  }, [product.price]);

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
          product_class_id: product.ecClassId ? Number(product.ecClassId) : undefined,
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
        <p>{shopName}</p>
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
        <Link href={`/shops/${shopSlug}/products/`} className={styles.linkList}>
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
