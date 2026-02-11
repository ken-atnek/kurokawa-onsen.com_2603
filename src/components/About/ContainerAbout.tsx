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
      <section className={styles.containerAboutDetails}>
        <article>
          <div className={styles.boxImage}>
            <picture>
              <source src="/images/about/block03_image02.webp" />
              <img
                src="/images/about/block03_image02.webp"
                alt="黒川温泉郷の風景"
              />
            </picture>
          </div>
          <h3>黒川温泉郷とは</h3>
          <p>
            熊本県の阿蘇のさらに奥地。大分県との県境、九州の北部中央エリアに位置する黒川温泉郷。2000(平成12)年まで、地元新聞が発行する「熊本県万能地図」に、黒川温泉の名称がなかったほど秘境の温泉でした。
            <br />
            黒川温泉に関わる多くの人々の手が「上質な里山」の景観を作り上げ、また「露天風呂めぐり」の入湯手形が次第に知られるようになり、全国区の温泉地として評判になりました。
            <br />
            ただ、植物は日々成長し、季節は日々移り変わります。「上質な里山の温泉地」づくりには完成はありません。新たな黒川への挑戦はこれからも続いていきます。
          </p>
        </article>
        <article>
          <div className={styles.boxImage}>
            <picture>
              <source src="/images/about/block03_image02.webp" />
              <img
                src="/images/about/block03_image02.webp"
                alt="黒川温泉郷の風景"
              />
            </picture>
          </div>
          <h3>「首なし身代わり地蔵」の伝説</h3>
          <p>
            その昔、豊後の中津留というところに、貧しい塩売りの若者・甚吉と、病気で寝たきりの父親が住んでいました。父親が瓜を欲しがるのですが、甚吉にはお金がありません。思いつめた甚吉は、商売ものの塩を地域のお地蔵様にお供えした後、瓜畑に瓜を盗みに入ってしまいます。しかしすぐに地主に見つかり、すぱあっと首をはねられてしまいました。ところが、落ちたのはお地蔵様の首。お地蔵様が身代わりになって甚吉を守ってくださったのです。
            <br />
            その後、この首だけのお地蔵様を肥後の国にまつろうと、肥後細川藩の本田勝十太郎という修行者が持ち帰ることになりました。旅の途中、黒川にさしかかったところでお地蔵様が突然「ここに安置してくれ」声をかけてきたということです。そこで黒川にお堂を建てることに。するとある日、この地から温泉が湧き出るようになり、これが黒川温泉の始まりとされています。
            <br />
            いまでも黒川の中心地に、このお地蔵様は大切にまつられています。
          </p>
        </article>
      </section>
      <section className={styles.containerHistory}>
        <h3>黒川温泉郷の歴史</h3>
        <ul>
          <li className={styles.list1960}>
            <div className={styles.year}>1960s</div>
            <div className={styles.boxImage}>
              <picture>
                <source src="/images/about/block04_image01.webp" />
                <img
                  src="/images/about/block04_image01.webp"
                  alt="黒川温泉郷の歴史"
                />
              </picture>
            </div>
            <h4>「鳴かず飛ばず」で存続の危機</h4>
            <div className={styles.boxText}>
              <p>
                江戸時代中期には湯治の場として知られていた黒川温泉。肥後細川藩の国境付近にあることから、藩の役人も利用する「御客屋」として位置づけられました。明治になり、廃藩置県が行われた後も、けがによく効く温泉として半農宿の営みが続けられていました。
                <br />
                「黒川温泉郷」としての歴史が始まったのは戦後から。1961(昭和36)年、6軒の旅館によって黒川温泉観光旅館協同組合が設立。「露天風呂を集めた温泉街」のコンセプトがスタートしました。
                <br />
                1964(昭和39)年に「やまなみハイウェイ」が開通し、観光客は一時的に増えたものの、すぐに「鳴かず飛ばず」の状態に落ち込んでしまいます。
              </p>
            </div>
          </li>
          <li className={styles.list1970}>
            <div className={styles.year}>1970s</div>
            <div className={styles.boxImage}>
              <picture>
                <source src="/images/about/block04_image02.webp" />
                <img
                  src="/images/about/block04_image02.webp"
                  alt="黒川温泉郷の歴史"
                />
              </picture>
            </div>
            <h4>黒川を変えた“若手の風”</h4>
            <div className={styles.boxText}>
              <p>
                高度経済成長が続き、車社会の到来も進んだことから、阿蘇や杖立、別府などの大型旅館のある温泉地は大繁栄を極めていました。
                <br />
                一方の黒川はやまなみハイウェイの開通効果も一時的なもので終わり、相変わらずの鳴かず飛ばずの状態。更に２度のオイルショックは追い打ちをかけ、先の見えない空気が黒川全体に充満していました。
                <br />
                しかし時同じくして、黒川温泉へ若手の風が吹き込んできました。Ｕターン、婿入りなどで旅館の「二代目、三代目」が黒川に現れたのです。彼らは都会での経験を活かし、新たな温泉郷の姿を模索しました。{' '}
              </p>
            </div>
          </li>
          <li className={styles.list1980}>
            <div className={styles.year}>1980s</div>
            <div className={styles.boxImage}>
              <picture>
                <source src="/images/about/block04_image03.webp" />
                <img
                  src="/images/about/block04_image03.webp"
                  alt="黒川温泉郷の歴史"
                />
              </picture>
            </div>
            <h4>
              一軒で儲かろうとしても、
              <br className="sp" />
              一軒も儲からない
            </h4>
            <div className={styles.boxText}>
              <p>
                当時の秘境温泉ブームにも影響され、黒川の認知度は少しずつ上がっていきました。1986(昭和61)年には、旅館組合の組織を再編成。「看板班」「環境班」「企画広報班」に分かれ、それぞれが黒川全体の景観づくりに取り組みました。
                <br />
                看板班は乱立していた、統一感のない看板200本をすべて撤去。統一共同看板に変えました。環境班は、当時スギ山だけで殺風景だった温泉郷を「絵になる風景にしよう」と剪定や植樹を行いました。更には共に手助けし合い、山里の立地を活かした野趣に富んだ露天風呂の形成が進められました。企画班は敷地の制約上、露天風呂が作れない2件の宿を救うため、黒川の全ての露天風呂を利用できる「入湯手形」を発案。「露天風呂めぐりの黒川温泉」というブランドが作られました。
                <br />
                いずれも「一軒で儲かるのではなく、地域全体で黒川温泉郷を盛り上げたい」との思いから生まれた施策でした{' '}
              </p>
            </div>
          </li>
          <li className={styles.list1990}>
            <div className={styles.year}>1990s</div>
            <div className={styles.boxImage}>
              <picture>
                <source src="/images/about/block04_image04.webp" />
                <img
                  src="/images/about/block04_image04.webp"
                  alt="黒川温泉郷の歴史"
                />
              </picture>
            </div>
            <h4>「黒川温泉一旅館」のコンセプト </h4>
            <div className={styles.boxText}>
              <p>
                入湯手形は評判となり、売り上げも年々増加。多くのメディアに取り上げられたことから、「露天風呂の黒川温泉」は全国区の人気となりました。宿泊者数は、統計を取り始めた1989(平成元)年の17万人から年々と増え、1999(平成10)年には30万人に届くほどに。
                <br />
                1980年代から取り組んできた黒川独自の「本物志向」の活動も継続して展開。組合では、(1)緑豊かな景観、(2)入湯手形による露天風呂めぐり、(3)感謝イベントと研修の3方面から、さらなる黒川ブランドの設立に尽力しました。
                <br />
              </p>
            </div>
          </li>
          <li className={styles.list2000}>
            <div className={styles.year}>2000s</div>
            <div className={styles.boxImage}>
              <picture>
                <source src="/images/about/block04_image05.webp" />
                <img
                  src="/images/about/block04_image05.webp"
                  alt="黒川温泉郷の歴史"
                />
              </picture>
            </div>
            <h4>明るさと元気、原点回帰</h4>
            <div className={styles.boxText}>
              <p>
                景観づくりが評価され、多くの賞を受賞。さらにメディアでの紹介も増え続け、2003(平成15)年には、宿泊者数40万人、推定入込客数120万人のピークを記録しました。
                <br />
                また、3代目に相当する30代の若手が跡継ぎとして増えてきたのもこの頃。組合の青年部も活気ある新チームとなり、「明るさと元気、原点回帰」をテーマとして活動を始めました。
              </p>
            </div>
          </li>
          <li className={styles.list2010}>
            <div className={styles.year}>2010s</div>
            <h4>熊本地震を経て、さらなる飛躍を </h4>
            <div className={styles.boxText}>
              <p>
                2016(平成28)年には、2度にわたって最大震度7を記録した熊本地震が発生。一部の旅館で長期休業を余儀なくされたものの、他の旅館の被害は少なく、発生1カ月後のGWにはほぼ通常営業に戻りました。ただ、熊本―阿蘇経由のアクセスが不便となった(※現在は復旧)うえ、風評被害によりツアーの中止などにより観光客は減少し大きな痛手を受けました。
                <br />
                しかしながら全国からの復興支援への温かい支援などもあり、徐々に宿泊客の数は戻り、2018(平成30)年現在、ほぼ地震前の水準に戻っています
              </p>
            </div>
          </li>
        </ul>
      </section>
    </>
  );
}
