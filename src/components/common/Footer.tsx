/* =======================================
 *黒川温泉観光協会 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-09
 * ======================================= */
'use client';
import styles from './Footer.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
import ScrollLink from '@/components/common/ScrollLink';
import { useEffect, useState } from 'react';
const Footer = () => {
  const [showPageTop, setShowPageTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowPageTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <footer className={styles.containerFooter}>
        <section>
          <nav>
            <ScrollLink href="/about/">黒川温泉とは</ScrollLink>
            <ScrollLink href="/shops/">加盟店一覧</ScrollLink>
            <ScrollLink href="/schedule/">年間スケジュール</ScrollLink>
            <ScrollLink href="/access/">交通アクセス</ScrollLink>
            <ExternalLink href="https://www.youmore-minamioguni.com/livecamera/">
              駐車場ライブカメラ
            </ExternalLink>
          </nav>
          <div className={styles.boxLogo}>
            <ScrollLink href="/">
              <svg role="img" aria-labelledby="footerLogoTitle">
                <title id="footerLogoTitle">黒川温泉観光協会</title>
                <use href="#svg_logo" />
              </svg>
            </ScrollLink>
            <div className={styles.copyRight}>
              © 2026 Kurokawa Onsen Tourism Association
            </div>
          </div>
          <nav>
            <ScrollLink href="/">ご利用規約</ScrollLink>
            <ScrollLink href="/">特定商法取引法に基づく表記</ScrollLink>
            <ScrollLink href="/">プライバシーポリシー</ScrollLink>
            <ExternalLink
              className={styles.linkContact}
              href="mailto:info@kurokawa-onsen.com"
            >
              <span>お問い合わせ</span>
            </ExternalLink>
          </nav>
        </section>
      </footer>
      <button
        type="button"
        className={`${styles.movePageTop} ${showPageTop ? styles.isShow : ''}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        aria-label="ページ上部へ戻る"
      />
    </>
  );
};

export default Footer;
