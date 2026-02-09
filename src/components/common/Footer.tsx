/* =======================================
 *黒川温泉観光協会 FOOTER
 * URL: src/components/common/Footer.tsx
 * Created: 2026-02-09
 * Last updated: 2026-02-09
 * ======================================= */
import styles from './Footer.module.scss';
import Link from 'next/link';
import ExternalLink from '@/components/common/ExternalLink';

const Footer = () => {
  return (
    <>
      <footer className={styles.containerFooter}>
        <section>
          <nav>
            <Link href="/">黒川温泉とは</Link>
            <Link href="/">加盟店一覧</Link>
            <Link href="/">年間スケジュール</Link>
            <Link href="/">交通アクセス</Link>
            <Link href="/">駐車場ライブカメラ</Link>
          </nav>
          <div className={styles.boxLogo}>
            <svg role="img" aria-labelledby="footerLogoTitle">
              <title id="footerLogoTitle">黒川温泉観光協会</title>
              <use href="#svg_logo" />
            </svg>
            <div className={styles.copyRight}>
              © 2026 Kurokawa Onsen Tourism Association
            </div>
          </div>
          <nav>
            <Link href="/">ご利用規約</Link>
            <Link href="/">特定商法取引法に基づく表記</Link>
            <Link href="/">プライバシーポリシ＝</Link>
            <ExternalLink className={styles.linkContact}>
              <span>お問い合わせ</span>
            </ExternalLink>
          </nav>
        </section>
      </footer>
      <a href="#Header" className={styles.movePageTop}></a>
    </>
  );
};

export default Footer;
