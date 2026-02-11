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
// import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';
import ScrollLink from '@/components/common/ScrollLink';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const pathname = usePathname();
  const isTop = pathname === '/';

  // トップだけスクロールで可視化するので、scrollY だけ state で持つ
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target as Node)
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

  const isVisible = !isTop || scrollY > 500;

  return (
    <>
      <header className={styles.containerHeader} id="Header">
        <article className={styles.blockHeader}>
          <nav>
            <ScrollLink href="/about/">黒川温泉とは</ScrollLink>
            <ScrollLink href="/">加盟店一覧</ScrollLink>
            <ScrollLink href="/schedule/">年間スケジュール</ScrollLink>
            <ScrollLink href="/access/">交通アクセス</ScrollLink>
          </nav>

          <h1 className={isVisible ? styles.isVisible : styles.isHidden}>
            <ScrollLink href="/">
              <svg role="img" aria-labelledby="heroLogoTitle">
                <title id="heroLogoTitle">黒川温泉観光協会</title>
                <use href="#svg_logo" />
              </svg>
            </ScrollLink>
          </h1>

          <div className={styles.linkCamera}>
            <ExternalLink href="https://www.youmore-minamioguni.com/livecamera/">
              <i></i>
              <span>
                駐車場
                <br />
                ライブカメラ
              </span>
            </ExternalLink>
          </div>
        </article>
      </header>

      <button
        type="button"
        className={`${styles.hamburgerButton} ${
          isOpen ? styles['is-open'] : ''
        }`}
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-label="メニューを開閉"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};

export default Header;
