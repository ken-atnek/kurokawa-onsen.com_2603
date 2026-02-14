/* =======================================
 * 黒川温泉観光協会 年間スケジュール
 * URL:src/components/Schedule/ContainerSchedule.tsx
 * Referenced in: : src/app/schedule/page.tsx
 * Created: 2026-02-10
 * Last updated: 2026-02-10
 * ======================================= */
'use client';
import styles from '@/styles/PageSchedule.module.scss';
import { useEffect } from 'react';

export default function ContainerSchedule() {
  useEffect(() => {
    import('modal-video').then((module) => {
      const ModalVideo = module.default;
      new ModalVideo('.js-modal-video', {
        youtube: {
          autoplay: 1,
          mute: 1,
        },
      });
    });
  }, []);
  return (
    <section className={styles.containerSchedule}>
      <article className={styles.blockSpring}>
        <h3>芽吹き・花盛り</h3>
        <p className={styles.sidebarH3}>
          <span>【3月〜4月】</span>
          黒川温泉の長くて寒い冬に耐えた木々の芽がほころび、野焼き後の山には山菜が顔を出します。4月の初めに桜が咲くと花々が一斉に開き、温泉街に春がやってきます。
        </p>
        <div className={styles.blockHead}>
          <div className={styles.head}>
            <picture>
              <source src="/images/schedule/container_spring_head.webp" />
              <img
                src="/images/schedule/container_spring_head.webp"
                alt="芽吹き・花盛り"
              />
            </picture>
          </div>
          <div className={styles.movieContents}>
            <h4>映像で見る 春の黒川温泉</h4>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="Oar0jf6nhYY"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-01.webp" />
                <img
                  src="/images/schedule/video_thumb-01.webp"
                  alt="春の黒川温泉（1分15秒）"
                />
              </picture>
              <span>春の黒川温泉（1分15秒）</span>
            </button>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="R9PW4owRHpo"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-02.webp" />
                <img
                  src="/images/schedule/video_thumb-02.webp"
                  alt="春の黒川温泉（1分15秒）"
                />
              </picture>
              <span>黒川温泉 入浴手形（1分34秒）</span>
            </button>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="Ixmrun9d0AM"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-03.webp" />
                <img
                  src="/images/schedule/video_thumb-03.webp"
                  alt="黒川温泉 朝ピクニック（1分45秒）"
                />
              </picture>
              <span>黒川温泉 朝ピクニック（1分45秒）</span>
            </button>
          </div>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-03.webp" />
              <img src="/images/schedule/icon_month-03.webp" alt="3月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_03-01.webp" />
                  <img src="/images/schedule/month_03-01.webp" alt="野焼き" />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>野焼き</h5>
                <p>
                  阿蘇に春の訪れを告げる野焼き。黒川周辺では瀬の本高原や平野台にダイナミックな炎が広がり山をこんがりと焼き尽くします。阿蘇の美しい草原は自然に育つものではなく、千年もの間こうして人の手により維持されています。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
      <article className={styles.blockEarlySummer}>
        <h3>新緑</h3>
        <p className={styles.sidebarH3}>
          <span>【5月〜6月】</span>
          若々しい新緑が葉を広げ、木漏れ日の気持ちいい５月は一年で一番美しい季節といっても過言ではありません。６月の雨に濡れる葉も生き生きと鮮やかです。
        </p>
        <div className={styles.blockHead}>
          <div className={styles.head}>
            <picture>
              <source src="/images/schedule/container_early-summer_head.webp" />
              <img
                src="/images/schedule/container_early-summer_head.webp"
                alt="芽吹き・花盛り"
              />
            </picture>
          </div>
          <div className={styles.boxDetails}>
            <div className={styles.titleMonthNumber}>
              <picture>
                <source src="/images/schedule/icon_month-05.webp" />
                <img src="/images/schedule/icon_month-05.webp" alt="5月" />
              </picture>
            </div>
            <ul className={styles.listMonthEvent}>
              <li>
                <div className={styles.itemPhoto}>
                  <picture>
                    <source src="/images/schedule/month_05-01.webp" />
                    <img src="/images/schedule/month_05-01.webp" alt="地蔵祭" />
                  </picture>
                </div>
                <div className={styles.itemText}>
                  <h5>地蔵祭 （毎年8日）</h5>
                  <p>
                    黒川に温泉が湧き出た由来にもなっている「首なし地蔵」。このお地蔵さまが祀られる温泉街の地蔵堂では毎年５月８日に各旅館のお湯を奉納し、お経をあげて温泉の恵みに感謝します。地元のアットホームなお祭ですがお客様のご参加も大歓迎です。
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.itemPhoto}>
                  <picture>
                    <source src="/images/schedule/month_05-02.webp" />
                    <img
                      src="/images/schedule/month_05-02.webp"
                      alt="ウォーキングイベント"
                    />
                  </picture>
                </div>
                <div className={styles.itemText}>
                  <h5>
                    ウォーキングイベント
                    <br />
                    「野みちをゆく」 （毎年最終日曜）
                  </h5>
                  <p>
                    年二回、テーマを決めて行う恒例のウォーキングイベント。５月は新緑があふれ、爽やかな風が吹く平野台までの道のりを会話を楽しみながらゆっくり歩きます。青空の下、親水公園で食べる昼食やイベント後の入浴券も付いた楽しい企画です。
                  </p>
                  <p className={styles.notice}>
                    ※毎年の状況に応じて開催が決まります
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.blockHead}>
          <div className={styles.boxDetails}>
            <div className={styles.titleMonthNumber}>
              <picture>
                <source src="/images/schedule/icon_month-06.webp" />
                <img src="/images/schedule/icon_month-06.webp" alt="6月" />
              </picture>
            </div>
            <ul className={styles.listMonthEvent}>
              <li>
                <div className={styles.itemPhoto}>
                  <picture>
                    <source src="/images/schedule/month_06-01.webp" />
                    <img
                      src="/images/schedule/month_06-01.webp"
                      alt="ホタルツアー "
                    />
                  </picture>
                </div>
                <div className={styles.itemText}>
                  <h5>
                    ホタルツアー <br />
                    （毎年6月～7月初旬）
                  </h5>
                  <p>
                    黒川温泉ご宿泊者様限定の無料バスツアーです。水のきれいな黒川温泉周辺にはたくさんのホタルが生息しています。ホタルの舞う秘密の場所へ皆様をご案内します。
                  </p>
                  <p className={styles.notice}>
                    ※毎年の状況に応じて開催が決まります
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.itemPhoto}>
                  <picture>
                    <source src="/images/schedule/month_06-02.webp" />
                    <img
                      src="/images/schedule/month_06-02.webp"
                      alt="露天風呂の日"
                    />
                  </picture>
                </div>
                <div className={styles.itemText}>
                  <h5>露天風呂の日 （毎年26日）</h5>
                  <p>
                    6月26日は露天風呂（ロ・テン・ブ・ロ）の日。日頃のご愛顧への感謝を込めて、また露天風呂めぐりの文化を推進するため、毎年この日は各旅館の露天風呂を無料開放いたします。（日帰りのお客様は10：00～15：00、お宿の浴衣ご着用の宿泊のお客様は8：30～21：00までとなります。）
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.itemPhoto}>
                  <picture>
                    <source src="/images/schedule/month_06-03.webp" />
                    <img
                      src="/images/schedule/month_06-03.webp"
                      alt="朝ピクニック"
                    />
                  </picture>
                </div>
                <div className={styles.itemText}>
                  <h5>
                    朝ピクニック
                    <br />
                    （6月～10月の月一回開催）
                  </h5>
                  <p>
                    黒川温泉のある南小国町ではおいしい野菜がたくさん作られています。野菜を知り尽くした料理上手な農家のお母さんたちが作る朝ごはんを、空気のきれいな平野台の草原にてピクニック形式でご用意いたします。野菜の豊富な6月から10月、月一回ずつ行います。
                  </p>
                  <p className={styles.notice}>
                    ※毎年の状況に応じて開催が決まります
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </article>
      <article className={styles.blockSummer}>
        <h3>深緑</h3>
        <p className={styles.sidebarH3}>
          <span>【7月〜9月】</span>
          緑がどんどん勢いを増し温泉街を覆いつくすほどに生い茂ります。木々のざわめき、夕暮れ時のヒグラシの声が涼しさを誘う黒川温泉の夏です。
        </p>
        <div className={styles.blockHead}>
          <div className={styles.head}>
            <picture>
              <source src="/images/schedule/container_summer_head.webp" />
              <img
                src="/images/schedule/container_summer_head.webp"
                alt="新緑"
              />
            </picture>
          </div>
          <div className={styles.movieContents}>
            <h4>映像で見る 夏の黒川温泉</h4>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="KsnP4UVWp1k"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-04.webp" />
                <img
                  src="/images/schedule/video_thumb-04.webp"
                  alt="夏の黒川温泉(1分34秒)"
                />
              </picture>
              <span>夏の黒川温泉(1分34秒)</span>
            </button>
          </div>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-07.webp" />
              <img src="/images/schedule/icon_month-07.webp" alt="7月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_07-01.webp" />
                  <img
                    src="/images/schedule/month_07-01.webp"
                    alt="朝ピクニック"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>
                  朝ピクニック
                  <br />
                  （6月～10月の月一回開催）
                </h5>
                <p>
                  黒川温泉のある南小国町ではおいしい野菜がたくさん作られています。野菜を知り尽くした料理上手な農家のお母さんたちが作る朝ごはんを、空気のきれいな平野台の草原にてピクニック形式でご用意いたします。野菜の豊富な6月から10月、月一回ずつ行います。。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-08.webp" />
              <img src="/images/schedule/icon_month-08.webp" alt="8月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_08-01.webp" />
                  <img src="/images/schedule/month_08-01.webp" alt="川端夜市" />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>川端夜市</h5>
                <p>
                  瀬の本高原マラソンの前夜祭として始まった川端夜市。いつもは静かな黒川温泉の夜ですがこの日ばかりはメインストリート「川端通り」に提灯が灯り地元有志のおいしいもん屋台が軒を連ねます。子供イベントややまなみ太鼓演奏、豪華景品が当たる福引大会など楽しいイベントも盛りだくさん！
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_08-02.webp" />
                  <img
                    src="/images/schedule/month_08-02.webp"
                    alt="瀬の本高原マラソン大会"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>瀬の本高原マラソン大会</h5>
                <p>
                  阿蘇五岳や九重連山を一望しながら瀬の本高原の爽やかな風を受けて走るマラソン大会。コースは5ｋｍ、10ｋｍ、10マイルがあります。
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-09.webp" />
              <img src="/images/schedule/icon_month-09.webp" alt="9月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_09-01.webp" />
                  <img
                    src="/images/schedule/month_09-01.webp"
                    alt="吉原神楽秋季例大祭"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>吉原神楽秋季例大祭 （毎年20日）</h5>
                <p>
                  黒川温泉から車で約10分の吉原地区に伝わる「吉原岩戸神楽」は昭和51年、国の無形民俗文化財として指定を受けた伝統芸能です。毎年9月20日の夜に五穀豊穣と集落の安全を祈願し奉納されています。野外の神楽殿で夜に舞う神楽はとても幻想的です。
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_09-02.webp" />
                  <img src="/images/schedule/month_09-02.webp" alt="奥の院祭" />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>奥の院祭 （毎年28日）</h5>
                <p>
                  不動明王と龍神様を祀った奥の院。参道は少し険しいですが入口から5分ほどでたどり着く滝の側に威厳のあるお不動さまが静かに佇む神秘的な雰囲気の場所です。年に一度、お経をあげて水に感謝をし、1年の無事を祈ります。
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_09-03.webp" />
                  <img
                    src="/images/schedule/month_09-03.webp"
                    alt="朝ピクニック"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>朝ピクニック（6月～10月の月一回開催）</h5>
                <p>
                  黒川温泉のある南小国町ではおいしい野菜がたくさん作られています。野菜を知り尽くした料理上手な農家のお母さんたちが作る朝ごはんを、空気のきれいな平野台の草原にてピクニック形式でご用意いたします。野菜の豊富な6月から10月、月一回ずつ行います。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
      <article className={styles.blockAutumn}>
        <h3>実り・紅葉</h3>
        <p className={styles.sidebarH3}>
          <span>【10月〜11月】</span>
          10月中旬、田んぼの稲がこうべを垂れて黄金色に染まるころ、木々の葉が少しずつ色づき始め、11月の後半まで紅葉がにぎやかに温泉街を彩ります。黒川温泉の秋の風景です。
        </p>
        <div className={styles.blockHead}>
          <div className={styles.head}>
            <picture>
              <source src="/images/schedule/container_autum_head.webp" />
              <img
                src="/images/schedule/container_autum_head.webp"
                alt="新緑"
              />
            </picture>
          </div>
          <div className={styles.movieContents}>
            <h4>映像で見る 秋の黒川温泉</h4>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="J6nbv5rpWgU"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-05.webp" />
                <img
                  src="/images/schedule/video_thumb-05.webp"
                  alt="秋の黒川温泉（1分23秒）"
                />
              </picture>
              <span>秋の黒川温泉（1分23秒）</span>
            </button>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="xH7tMxXUyts"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-06.webp" />
                <img
                  src="/images/schedule/video_thumb-06.webp"
                  alt="黒川温泉 感謝祭（1分34秒）"
                />
              </picture>
              <span>黒川温泉 感謝祭（1分34秒）</span>
            </button>
          </div>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-07.webp" />
              <img src="/images/schedule/icon_month-07.webp" alt="7月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_07-01.webp" />
                  <img
                    src="/images/schedule/month_07-01.webp"
                    alt="朝ピクニック"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>
                  朝ピクニック
                  <br />
                  （6月～10月の月一回開催）
                </h5>
                <p>
                  黒川温泉のある南小国町ではおいしい野菜がたくさん作られています。野菜を知り尽くした料理上手な農家のお母さんたちが作る朝ごはんを、空気のきれいな平野台の草原にてピクニック形式でご用意いたします。野菜の豊富な6月から10月、月一回ずつ行います。。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-10.webp" />
              <img src="/images/schedule/icon_month-10.webp" alt="10月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_10-01.webp" />
                  <img
                    src="/images/schedule/month_10-01.webp"
                    alt="温泉感謝祭"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>温泉感謝祭（毎年第一土曜日曜）</h5>
                <p>
                  自然に感謝、温泉に感謝、お越しくださるすべてのお客様に感謝。会場のふれあい広場では日頃の感謝を込めてスタッフ総出でバザーやステージイベントを行い夜遅くまで賑わいます。また肥後細川藩士が参勤交代で立ち寄り旅の疲れを癒したといわれる黒川温泉。翌日は当時を再現した大名行列が温泉街を練り歩きます。
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_10-02.webp" />
                  <img
                    src="/images/schedule/month_10-02.webp"
                    alt="朝ピクニック"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>朝ピクニック（6月～10月の月一回開催）</h5>
                <p>
                  黒川温泉のある南小国町ではおいしい野菜がたくさん作られています。野菜を知り尽くした料理上手な農家のお母さんたちが作る朝ごはんを、空気のきれいな平野台の草原にてピクニック形式でご用意いたします。野菜の豊富な6月から10月、月一回ずつ行います。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_10-03.webp" />
                  <img
                    src="/images/schedule/month_10-03.webp"
                    alt="ウォーキングイベント「野みちをゆく」"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>ウォーキングイベント「野みちをゆく」</h5>
                <p>
                  年二回、テーマを決めて行う恒例のウォーキングイベント。11月は紅葉の美しい平野台へのんびり散策しながら歩きます。秋の澄みきった空の下、親水公園で食べる昼食やイベント後の入浴券も付いた楽しい企画です。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_10-04.webp" />
                  <img
                    src="/images/schedule/month_10-04.webp"
                    alt="タボレッタポプリ作り体験"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>タボレッタポプリ作り体験</h5>
                <p>
                  黒川温泉と地元小国杉を素材に家具やフレグランス商品を展開するライフスタイルブランド“FIL”との共同ワークショップです。溶かしたソイワックス（ろう）に小国杉のエッセンシャルオイルを混ぜ、地元で採れたドライフラワーや木の実をデコレーションして固め、世界で一つだけのタボレッタポプリを作ります。
                </p>
                <p className={styles.notice}>
                  ※毎年の状況に応じて開催が決まります
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
      <article className={styles.blockWinter}>
        <h3>落葉・雪景色</h3>
        <p className={styles.sidebarH3}>
          <span>【12月〜2月】</span>
          葉が落ちすっきりとした裸木のシルエットが美しい季節。雪が降ると枝のひとつひとつにゆっくりと積もり、温泉街を真っ白に包んでいきます。
        </p>
        <div className={styles.blockHead}>
          <div className={styles.head}>
            <picture>
              <source src="/images/schedule/container_winter_head.webp" />
              <img
                src="/images/schedule/container_winter_head.webp"
                alt="新緑"
              />
            </picture>
          </div>
          <div className={styles.movieContents}>
            <h4>映像で見る 冬の黒川温泉</h4>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="J2ZUZ_9st_I"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-08.webp" />
                <img
                  src="/images/schedule/video_thumb-08.webp"
                  alt="冬の黒川温泉（1分29秒）"
                />
              </picture>
              <span>冬の黒川温泉（1分29秒）</span>
            </button>
            <button
              type="button"
              className="js-modal-video"
              data-channel="youtube"
              data-video-id="PxtnlZTAKs4"
              data-autoplay="1"
              data-mute="1"
            >
              <picture>
                <source src="/images/schedule/video_thumb-09.webp" />
                <img
                  src="/images/schedule/video_thumb-09.webp"
                  alt="黒川温泉 湯あかり（2分00秒）"
                />
              </picture>
              <span>黒川温泉 湯あかり（2分00秒）</span>
            </button>
          </div>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-12.webp" />
              <img src="/images/schedule/icon_month-12.webp" alt="12月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_12-01.webp" />
                  <img src="/images/schedule/month_12-01.webp" alt="湯あかり" />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>湯あかり （クリスマス頃〜3月末）</h5>
                <p>
                  観光協会員が手作りした竹の灯篭、その数約300個を温泉街を流れる田の原川に吊るし、日没から22時まであかりを灯します。竹灯篭の優しい光が温泉街を包み、寒い黒川の冬をあたたかく彩ります。大切な方と夜のお散歩をお楽しみください。
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_12-02.webp" />
                  <img
                    src="/images/schedule/month_12-02.webp"
                    alt="あか牛フェア"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>あか牛フェア</h5>
                <p>
                  黒川温泉の旅館や飲食店であか牛を使ったお料理を展開する「あか牛フェア」を開催します。あか牛は脂肪が少なくヘルシーで、和牛ならではの柔らかさが特徴です。黒川温泉の温泉や散策とあわせて、極上のあか牛料理をお楽しみください。
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className={styles.boxDetails}>
          <div className={styles.titleMonthNumber}>
            <picture>
              <source src="/images/schedule/icon_month-01.webp" />
              <img src="/images/schedule/icon_month-01.webp" alt="1月" />
            </picture>
          </div>
          <ul className={styles.listMonthEvent}>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_01-01.webp" />
                  <img
                    src="/images/schedule/month_01-01.webp"
                    alt="温泉感謝祭"
                  />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>元旦ふるまい汁 やまなみ太鼓初打ち （元旦）</h5>
                <p>
                  元旦の朝、やまなみ太鼓保存会による威勢のいい和太鼓の音が温泉街に響き渡り新年の幕開けをお祝いします。当日は千人鍋と言われる大鍋で作った地元野菜たっぷりのけんちん汁が無料でふるまわれます。
                </p>
              </div>
            </li>
            <li>
              <div className={styles.itemPhoto}>
                <picture>
                  <source src="/images/schedule/month_01-02.webp" />
                  <img src="/images/schedule/month_01-02.webp" alt="どんどや" />
                </picture>
              </div>
              <div className={styles.itemText}>
                <h5>どんどや</h5>
                <p>
                  各旅館や家庭のお正月飾りを持ち寄って燃やし、お正月の神様を天に帰す神事です。この火に当たると一年健康に過ごせると言われています。毎年ぜんざいなどがふるまわれる地元の行事ですがお客様の参加も大歓迎です。
                </p>
              </div>
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
}
