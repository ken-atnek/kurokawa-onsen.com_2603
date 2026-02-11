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
      <ExternalLink href="https://www.kurokawaonsen.or.jp/oyado/">
        <span>黒川温泉のお宿一覧</span>
      </ExternalLink>
    </section>
  );
}
