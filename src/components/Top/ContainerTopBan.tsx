/* =======================================
 * 黒川温泉観光協会 バナー
 * URL:src/components/Top/ContainerTopBan.tsx
 * Referenced in: : /app/page.tsx
 * Created: 2026-02-11
 * Last updated: 2026-02-11
 * ======================================= */

import styles from '@/styles/PageTop.module.scss';
import ExternalLink from '@/components/common/ExternalLink';
export default function ContainerTopBan() {
  return (
    <section className={styles.containerTopBan}>
      <nav>
        <ExternalLink
          href="https://www.kurokawaonsen.or.jp/oyado/"
          className={styles.itemList}
        >
          <span>黒川温泉のお宿一覧</span>
        </ExternalLink>
        <ExternalLink
          href="https://www.kurokawaonsen.or.jp/availability/"
          className={styles.itemReserve}
        >
          <span>宿泊予約の空室状況</span>
        </ExternalLink>
      </nav>
    </section>
  );
}
