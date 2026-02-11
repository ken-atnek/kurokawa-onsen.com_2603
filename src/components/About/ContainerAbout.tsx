/* =======================================
 * 黒川温泉観光協会 黒川温泉について
 * URL:src/components/Schedule/ContainerSchedule.tsx
 * Referenced in: : :src/app/about/page.tsx
 * Created: 2026-02-11
 * Last updated: 2026-02-11
 * ======================================= */
import styles from '@/styles/PageAbout.module.scss';

export default function ContainerAbout() {
  return (
    <>
      <section className={styles.containerHeadBlack}>
        <div className={styles.boxImage}>
          <picture>
            <source src="/images/about/block01_image01.webp" />
            <img
              src="/images/about/block01_image01.webp"
              alt="黒川温泉郷の風景"
            />
          </picture>
        </div>
        <div className={styles.boxText}>
          <p>
            緑ゆたかな山々に囲まれ、三十軒の旅館が集まった「黒川温泉郷」。
            <br />
            高速道路からも駅からも遠い、田舎の温泉街です。
            <br />
            季節ごとに美しく表情を変える自然と、豊富なお湯が私たちの誇りです。
            <br />
            <br />
            黒川温泉郷では、三十軒の宿と里山の風景すべてを、
            <br />
            「一つの旅館」として考えています。
            <br />
            それを表す言葉が「黒川温泉一旅館」。
          </p>
        </div>
      </section>
      <section className={styles.containerHeadWhite}>
        <div className={styles.boxText}>
          <p>
            ひとつひとつの旅館は「離れ部屋」。
            <br />
            そして、旅館をつなぐ小径は「渡り廊下」。
            <br />
            温泉街全体の風景が、まるで一つの旅館のように
            <br />
            自然へと溶け込みます。
            <br />
            <br />
            大切な人との語らいを楽しみ、
            <br />
            自然に身を委ねる、ゆるりとした時間を。
            <br />
            一つ一つの〝離れ部屋〟への、
            <br />
            皆様のお越しを心よりお待ちしています。
          </p>
        </div>
        <div className={styles.boxImage}>
          <picture>
            <source src="/images/about/hero.webp" />
            <img src="/images/about/hero.webp" alt="黒川温泉郷の風景" />
          </picture>
        </div>
      </section>
    </>
  );
}
