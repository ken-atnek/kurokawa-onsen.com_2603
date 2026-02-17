/* =======================================
 * 黒川温泉観光協会 ご利用規約
 * URL:src/components/Terms/ContainerTerms.tsx
 * Referenced in: src/app/terms/page.tsx
 * Created: 2026-02-17
 * Last updated: 2026-02-17
 * ======================================= */
import styles from '@/styles/PageTerms.module.scss';
import Link from 'next/link';

export default function ContainerTerms() {
  return (
    <section className={styles.containerTerms}>
      <article className={styles.blockKiyaku}>
        <p className={styles.headTitle}>ご利用規約</p>

        <dl>
          <dt>適用</dt>
          <dd>
            本規約は、黒川温泉観光協会（以下「当協会」）が運営するウェブサイト（以下「本サイト」）の利用条件を定めるものです。
            利用者は、本サイトを利用することで本規約に同意したものとみなします。
          </dd>

          <dt>禁止事項</dt>
          <dd>
            利用者は、本サイトの利用にあたり以下の行為をしてはなりません。
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>第三者または当協会の権利・利益を侵害する行為</li>
              <li>本サイトの運営を妨げる行為、またはそのおそれのある行為</li>
              <li>不正アクセス、またはそれを試みる行為</li>
              <li>
                本サイトの内容を無断転載・複製する行為（引用の範囲を除く）
              </li>
            </ul>
          </dd>

          <dt>著作権等</dt>
          <dd>
            本サイトに掲載される文章・画像・ロゴ・デザイン等のコンテンツに関する権利は、当協会または正当な権利者に帰属します。
            法令で認められる場合を除き、無断で使用することはできません。
          </dd>

          <dt>免責事項</dt>
          <dd>
            当協会は、本サイトに掲載する情報の正確性・安全性の確保に努めますが、その完全性を保証するものではありません。
            本サイトの利用により生じた損害について、当協会は一切の責任を負いません。
            <br />
            また、本サイトの内容は予告なく変更・停止・中断する場合があります。
          </dd>

          <dt>リンクについて</dt>
          <dd>
            本サイトからリンクされた外部サイトの内容について、当協会は責任を負いません。
          </dd>

          <dt>個人情報の取り扱い</dt>
          <dd>
            個人情報の取り扱いについては、
            <Link href="/privacy">プライバシーポリシー</Link>
            をご確認ください。
          </dd>

          <dt>特定商取引法に基づく表記</dt>
          <dd>
            物販等に関する表記は、
            <Link href="/law">特定商取引法に基づく表記</Link>
            をご確認ください。
          </dd>

          <dt>規約の変更</dt>
          <dd>
            当協会は、必要に応じて本規約を変更することがあります。変更後の規約は、本サイトに掲載した時点から効力を生じます。
          </dd>
        </dl>
      </article>
    </section>
  );
}
