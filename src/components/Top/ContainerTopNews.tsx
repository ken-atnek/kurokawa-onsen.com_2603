/* =======================================
 * 黒川温泉観光協会 お知らせ
 * URL:src/components/Top/ContainerTopNews.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-10
 * Last updated: 2026-02-10
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import Link from 'next/link';

export default function ContainerTopNews() {
  return (
    <section className={styles.containerTopNews}>
      <article>
        <h3>お知らせ</h3>
        <ul>
          <li>
            <Link href="#">
              <span className={styles.itemDate}>2025.12.16</span>
              <p>褐-aka-さんの情報を掲載しました。</p>
              <i></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className={styles.itemDate}>2025.12.16</span>
              <p>褐-aka-さんの情報を掲載しました。</p>
              <i></i>
            </Link>
          </li>
          <li>
            <Link href="#">
              <span className={styles.itemDate}>2025.12.16</span>
              <p>褐-aka-さんの情報を掲載しました。</p>
              <i></i>
            </Link>
          </li>
        </ul>
      </article>
    </section>
  );
}
