/* =======================================
 *黒川温泉観光協会 HEADER
 * URL: src/components/common/Header.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-11
 * ======================================= */
'use client';
import styles from './Header.module.scss';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import ExternalLink from '@/components/common/ExternalLink';
import ScrollLink from '@/components/common/ScrollLink';
import clsx from 'clsx';

type Props = {
  locale?: 'ja' | 'en';
};

const Header = ({ locale = 'ja' }: Props) => {
  const isEnglish = locale === 'en';
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const pathname = usePathname();
  const isTop = pathname === (isEnglish ? '/en' : '/');

  // トップだけスクロールで可視化するので、scrollY だけ state で持つ
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isOpen &&
        navRef.current &&
        buttonRef.current &&
        !navRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleOutsideClick, true);
    return () =>
      document.removeEventListener('click', handleOutsideClick, true);
  }, [isOpen]);

  useEffect(() => {
    // トップ以外はスクロール監視しない（常に表示）
    if (!isTop) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // 初期値の同期（setStateはコールバック内のみ）
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTop]);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const isVisible = !isTop || scrollY > 500;

  return (
    <>
      <header className={styles.containerHeader}>
        <article className={styles.blockHeader}>
          <div
            className={clsx(
              styles.boxMobileMenu,
              isOpen && styles.isOpen,
              !isOpen && styles.closing
            )}
            ref={navRef}
          >
            <nav className={styles.mainMenu}>
              <ScrollLink
                href={isEnglish ? '/en/' : '/'}
                className={styles.linkTop}
              >
                {isEnglish ? 'Home' : 'トップページ'}
                <span>top</span>
              </ScrollLink>
              {isEnglish ? (
                <ScrollLink href="/en/shops/">
                  Shops & Restaurants<span>Member Shops</span>
                </ScrollLink>
              ) : (
                <>
                  <ScrollLink href="/about/">
                    黒川温泉とは<span>about us</span>
                  </ScrollLink>
                  <ScrollLink href="/shops/">
                    加盟店一覧<span>Member Shops</span>
                  </ScrollLink>
                  <ScrollLink href="/schedule/">
                    年間スケジュール<span>SEASONAL EVENTS</span>
                  </ScrollLink>
                  <ScrollLink href="/access/">
                    交通アクセス<span>Access</span>
                  </ScrollLink>
                </>
              )}
              <ExternalLink
                href={
                  isEnglish
                    ? 'https://www.kurokawaonsen.or.jp/en/oyado/'
                    : 'https://www.kurokawaonsen.or.jp/oyado/'
                }
                className={styles.pcLink}
              >
                {isEnglish ? 'Accommodation' : '黒川温泉のお宿一覧'}
              </ExternalLink>
              <ExternalLink
                href={
                  isEnglish
                    ? 'https://www.kurokawaonsen.or.jp/en/availability/'
                    : 'https://www.kurokawaonsen.or.jp/availability/'
                }
                className={styles.pcLink}
              >
                {isEnglish ? 'Room Availability' : '宿泊予約の空室状況'}
              </ExternalLink>
              <ScrollLink href={isEnglish ? '/' : '/en/'}>
                {isEnglish ? '日本語' : 'English'}
                <span>{isEnglish ? 'Japanese' : 'Language'}</span>
              </ScrollLink>
            </nav>
            <div className={styles.boxMobileBan}>
              <ExternalLink
                href={
                  isEnglish
                    ? 'https://www.kurokawaonsen.or.jp/en/oyado/'
                    : 'https://www.kurokawaonsen.or.jp/oyado/'
                }
                className={styles.itemList}
                onClick={closeMenu}
              >
                <span>
                  {isEnglish ? 'Accommodation' : '黒川温泉のお宿一覧'}
                </span>
              </ExternalLink>
              <ExternalLink
                href={
                  isEnglish
                    ? 'https://www.kurokawaonsen.or.jp/en/availability/'
                    : 'https://www.kurokawaonsen.or.jp/availability/'
                }
                className={styles.itemReserve}
                onClick={closeMenu}
              >
                <span>
                  {isEnglish ? 'Room Availability' : '宿泊予約の空室状況'}
                </span>
              </ExternalLink>
            </div>
            <ExternalLink
              href="https://www.youmore-minamioguni.com/livecamera/"
              className={styles.itemCamera}
              onClick={closeMenu}
            >
              <i></i>
              <span>
                {isEnglish ? 'Parking Live Camera' : '駐車場ライブカメラ'}
              </span>
            </ExternalLink>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            {!isEnglish ? (
              <nav className={styles.subMenu} onClick={closeMenu}>
                <ScrollLink href="/terms/">ご利用規約</ScrollLink>
                <ScrollLink href="/law/">特定商法取引法に基づく表記</ScrollLink>
                <ScrollLink href="/privacy/">プライバシーポリシー</ScrollLink>
              </nav>
            ) : null}
            {/* <ExternalLink
              className={styles.linkContact}
              href="mailto:info@kurokawa-onsen.com"
              onClick={closeMenu}
            >
              <span>お問い合わせ</span>
            </ExternalLink> */}
          </div>
          <h1 className={isVisible ? styles.isVisible : styles.isHidden}>
            <ScrollLink href={isEnglish ? '/en/' : '/'}>
              <svg role="img" aria-labelledby="heroLogoTitle">
                <title id="heroLogoTitle">
                  {isEnglish
                    ? 'Kurokawa Onsen Tourism Association'
                    : '黒川温泉観光協会'}
                </title>
                <use href="#svg_logo" />
              </svg>
            </ScrollLink>
          </h1>
          <div className={styles.linkCamera}>
            <ExternalLink href="https://www.youmore-minamioguni.com/livecamera/">
              <i></i>
              <span>
                {isEnglish ? 'Parking' : '駐車場'}
                <br />
                {isEnglish ? 'Live Camera' : 'ライブカメラ'}
              </span>
            </ExternalLink>
          </div>
        </article>
      </header>
      <button
        type="button"
        ref={buttonRef}
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label={isEnglish ? 'Toggle menu' : 'メニューを開閉'}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export default Header;
