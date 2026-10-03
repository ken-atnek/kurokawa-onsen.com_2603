/* =======================================
 * 国籍選択肢
 * ISO 3166-1 alpha-2 準拠
 * ======================================= */

export type NationalityLocale = 'ja' | 'en';

const PRIORITY_NATIONALITY_CODES = [
  'JP',
  'KR',
  'TW',
  'CN',
  'HK',
  'US',
  'AU',
  'SG',
  'TH',
] as const;

const NATIONALITY_GROUP_LABELS = {
  ja: {
    priority: '主な国・地域',
    others: 'その他の国・地域',
  },
  en: {
    priority: 'Popular countries and regions',
    others: 'Other countries and regions',
  },
} as const;

type Nationality = {
  value: string;
  labels: Record<NationalityLocale, string>;
};

export const NATIONALITIES = [
  { value: 'AD', labels: { ja: 'アンドラ', en: 'Andorra' } },
  {
    value: 'AE',
    labels: { ja: 'アラブ首長国連邦', en: 'United Arab Emirates' },
  },
  { value: 'AF', labels: { ja: 'アフガニスタン', en: 'Afghanistan' } },
  {
    value: 'AG',
    labels: { ja: 'アンティグア・バーブーダ', en: 'Antigua & Barbuda' },
  },
  { value: 'AI', labels: { ja: 'アンギラ', en: 'Anguilla' } },
  { value: 'AL', labels: { ja: 'アルバニア', en: 'Albania' } },
  { value: 'AM', labels: { ja: 'アルメニア', en: 'Armenia' } },
  { value: 'AO', labels: { ja: 'アンゴラ', en: 'Angola' } },
  { value: 'AQ', labels: { ja: '南極', en: 'Antarctica' } },
  { value: 'AR', labels: { ja: 'アルゼンチン', en: 'Argentina' } },
  { value: 'AS', labels: { ja: '米領サモア', en: 'American Samoa' } },
  { value: 'AT', labels: { ja: 'オーストリア', en: 'Austria' } },
  { value: 'AU', labels: { ja: 'オーストラリア', en: 'Australia' } },
  { value: 'AW', labels: { ja: 'アルバ', en: 'Aruba' } },
  { value: 'AX', labels: { ja: 'オーランド諸島', en: 'Åland Islands' } },
  { value: 'AZ', labels: { ja: 'アゼルバイジャン', en: 'Azerbaijan' } },
  {
    value: 'BA',
    labels: { ja: 'ボスニア・ヘルツェゴビナ', en: 'Bosnia & Herzegovina' },
  },
  { value: 'BB', labels: { ja: 'バルバドス', en: 'Barbados' } },
  { value: 'BD', labels: { ja: 'バングラデシュ', en: 'Bangladesh' } },
  { value: 'BE', labels: { ja: 'ベルギー', en: 'Belgium' } },
  { value: 'BF', labels: { ja: 'ブルキナファソ', en: 'Burkina Faso' } },
  { value: 'BG', labels: { ja: 'ブルガリア', en: 'Bulgaria' } },
  { value: 'BH', labels: { ja: 'バーレーン', en: 'Bahrain' } },
  { value: 'BI', labels: { ja: 'ブルンジ', en: 'Burundi' } },
  { value: 'BJ', labels: { ja: 'ベナン', en: 'Benin' } },
  { value: 'BL', labels: { ja: 'サン・バルテルミー', en: 'St. Barthélemy' } },
  { value: 'BM', labels: { ja: 'バミューダ', en: 'Bermuda' } },
  { value: 'BN', labels: { ja: 'ブルネイ', en: 'Brunei' } },
  { value: 'BO', labels: { ja: 'ボリビア', en: 'Bolivia' } },
  {
    value: 'BQ',
    labels: { ja: 'オランダ領カリブ', en: 'Caribbean Netherlands' },
  },
  { value: 'BR', labels: { ja: 'ブラジル', en: 'Brazil' } },
  { value: 'BS', labels: { ja: 'バハマ', en: 'Bahamas' } },
  { value: 'BT', labels: { ja: 'ブータン', en: 'Bhutan' } },
  { value: 'BV', labels: { ja: 'ブーベ島', en: 'Bouvet Island' } },
  { value: 'BW', labels: { ja: 'ボツワナ', en: 'Botswana' } },
  { value: 'BY', labels: { ja: 'ベラルーシ', en: 'Belarus' } },
  { value: 'BZ', labels: { ja: 'ベリーズ', en: 'Belize' } },
  { value: 'CA', labels: { ja: 'カナダ', en: 'Canada' } },
  {
    value: 'CC',
    labels: { ja: 'ココス(キーリング)諸島', en: 'Cocos (Keeling) Islands' },
  },
  {
    value: 'CD',
    labels: { ja: 'コンゴ民主共和国(キンシャサ)', en: 'Congo - Kinshasa' },
  },
  {
    value: 'CF',
    labels: { ja: '中央アフリカ共和国', en: 'Central African Republic' },
  },
  {
    value: 'CG',
    labels: { ja: 'コンゴ共和国(ブラザビル)', en: 'Congo - Brazzaville' },
  },
  { value: 'CH', labels: { ja: 'スイス', en: 'Switzerland' } },
  { value: 'CI', labels: { ja: 'コートジボワール', en: 'Côte d’Ivoire' } },
  { value: 'CK', labels: { ja: 'クック諸島', en: 'Cook Islands' } },
  { value: 'CL', labels: { ja: 'チリ', en: 'Chile' } },
  { value: 'CM', labels: { ja: 'カメルーン', en: 'Cameroon' } },
  { value: 'CN', labels: { ja: '中国', en: 'China' } },
  { value: 'CO', labels: { ja: 'コロンビア', en: 'Colombia' } },
  { value: 'CR', labels: { ja: 'コスタリカ', en: 'Costa Rica' } },
  { value: 'CU', labels: { ja: 'キューバ', en: 'Cuba' } },
  { value: 'CV', labels: { ja: 'カーボベルデ', en: 'Cape Verde' } },
  { value: 'CW', labels: { ja: 'キュラソー', en: 'Curaçao' } },
  { value: 'CX', labels: { ja: 'クリスマス島', en: 'Christmas Island' } },
  { value: 'CY', labels: { ja: 'キプロス', en: 'Cyprus' } },
  { value: 'CZ', labels: { ja: 'チェコ', en: 'Czechia' } },
  { value: 'DE', labels: { ja: 'ドイツ', en: 'Germany' } },
  { value: 'DJ', labels: { ja: 'ジブチ', en: 'Djibouti' } },
  { value: 'DK', labels: { ja: 'デンマーク', en: 'Denmark' } },
  { value: 'DM', labels: { ja: 'ドミニカ国', en: 'Dominica' } },
  { value: 'DO', labels: { ja: 'ドミニカ共和国', en: 'Dominican Republic' } },
  { value: 'DZ', labels: { ja: 'アルジェリア', en: 'Algeria' } },
  { value: 'EC', labels: { ja: 'エクアドル', en: 'Ecuador' } },
  { value: 'EE', labels: { ja: 'エストニア', en: 'Estonia' } },
  { value: 'EG', labels: { ja: 'エジプト', en: 'Egypt' } },
  { value: 'EH', labels: { ja: '西サハラ', en: 'Western Sahara' } },
  { value: 'ER', labels: { ja: 'エリトリア', en: 'Eritrea' } },
  { value: 'ES', labels: { ja: 'スペイン', en: 'Spain' } },
  { value: 'ET', labels: { ja: 'エチオピア', en: 'Ethiopia' } },
  { value: 'FI', labels: { ja: 'フィンランド', en: 'Finland' } },
  { value: 'FJ', labels: { ja: 'フィジー', en: 'Fiji' } },
  { value: 'FK', labels: { ja: 'フォークランド諸島', en: 'Falkland Islands' } },
  { value: 'FM', labels: { ja: 'ミクロネシア連邦', en: 'Micronesia' } },
  { value: 'FO', labels: { ja: 'フェロー諸島', en: 'Faroe Islands' } },
  { value: 'FR', labels: { ja: 'フランス', en: 'France' } },
  { value: 'GA', labels: { ja: 'ガボン', en: 'Gabon' } },
  { value: 'GB', labels: { ja: 'イギリス', en: 'United Kingdom' } },
  { value: 'GD', labels: { ja: 'グレナダ', en: 'Grenada' } },
  { value: 'GE', labels: { ja: 'ジョージア', en: 'Georgia' } },
  { value: 'GF', labels: { ja: '仏領ギアナ', en: 'French Guiana' } },
  { value: 'GG', labels: { ja: 'ガーンジー', en: 'Guernsey' } },
  { value: 'GH', labels: { ja: 'ガーナ', en: 'Ghana' } },
  { value: 'GI', labels: { ja: 'ジブラルタル', en: 'Gibraltar' } },
  { value: 'GL', labels: { ja: 'グリーンランド', en: 'Greenland' } },
  { value: 'GM', labels: { ja: 'ガンビア', en: 'Gambia' } },
  { value: 'GN', labels: { ja: 'ギニア', en: 'Guinea' } },
  { value: 'GP', labels: { ja: 'グアドループ', en: 'Guadeloupe' } },
  { value: 'GQ', labels: { ja: '赤道ギニア', en: 'Equatorial Guinea' } },
  { value: 'GR', labels: { ja: 'ギリシャ', en: 'Greece' } },
  {
    value: 'GS',
    labels: {
      ja: 'サウスジョージア・サウスサンドウィッチ諸島',
      en: 'South Georgia & South Sandwich Islands',
    },
  },
  { value: 'GT', labels: { ja: 'グアテマラ', en: 'Guatemala' } },
  { value: 'GU', labels: { ja: 'グアム', en: 'Guam' } },
  { value: 'GW', labels: { ja: 'ギニアビサウ', en: 'Guinea-Bissau' } },
  { value: 'GY', labels: { ja: 'ガイアナ', en: 'Guyana' } },
  {
    value: 'HK',
    labels: { ja: '香港', en: 'Hong Kong' },
  },
  {
    value: 'HM',
    labels: {
      ja: 'ハード島・マクドナルド諸島',
      en: 'Heard & McDonald Islands',
    },
  },
  { value: 'HN', labels: { ja: 'ホンジュラス', en: 'Honduras' } },
  { value: 'HR', labels: { ja: 'クロアチア', en: 'Croatia' } },
  { value: 'HT', labels: { ja: 'ハイチ', en: 'Haiti' } },
  { value: 'HU', labels: { ja: 'ハンガリー', en: 'Hungary' } },
  { value: 'ID', labels: { ja: 'インドネシア', en: 'Indonesia' } },
  { value: 'IE', labels: { ja: 'アイルランド', en: 'Ireland' } },
  { value: 'IL', labels: { ja: 'イスラエル', en: 'Israel' } },
  { value: 'IM', labels: { ja: 'マン島', en: 'Isle of Man' } },
  { value: 'IN', labels: { ja: 'インド', en: 'India' } },
  {
    value: 'IO',
    labels: { ja: '英領インド洋地域', en: 'British Indian Ocean Territory' },
  },
  { value: 'IQ', labels: { ja: 'イラク', en: 'Iraq' } },
  { value: 'IR', labels: { ja: 'イラン', en: 'Iran' } },
  { value: 'IS', labels: { ja: 'アイスランド', en: 'Iceland' } },
  { value: 'IT', labels: { ja: 'イタリア', en: 'Italy' } },
  { value: 'JE', labels: { ja: 'ジャージー', en: 'Jersey' } },
  { value: 'JM', labels: { ja: 'ジャマイカ', en: 'Jamaica' } },
  { value: 'JO', labels: { ja: 'ヨルダン', en: 'Jordan' } },
  { value: 'JP', labels: { ja: '日本', en: 'Japan' } },
  { value: 'KE', labels: { ja: 'ケニア', en: 'Kenya' } },
  { value: 'KG', labels: { ja: 'キルギス', en: 'Kyrgyzstan' } },
  { value: 'KH', labels: { ja: 'カンボジア', en: 'Cambodia' } },
  { value: 'KI', labels: { ja: 'キリバス', en: 'Kiribati' } },
  { value: 'KM', labels: { ja: 'コモロ', en: 'Comoros' } },
  {
    value: 'KN',
    labels: { ja: 'セントクリストファー・ネーヴィス', en: 'St. Kitts & Nevis' },
  },
  { value: 'KP', labels: { ja: '北朝鮮', en: 'North Korea' } },
  { value: 'KR', labels: { ja: '韓国', en: 'South Korea' } },
  { value: 'KW', labels: { ja: 'クウェート', en: 'Kuwait' } },
  { value: 'KY', labels: { ja: 'ケイマン諸島', en: 'Cayman Islands' } },
  { value: 'KZ', labels: { ja: 'カザフスタン', en: 'Kazakhstan' } },
  { value: 'LA', labels: { ja: 'ラオス', en: 'Laos' } },
  { value: 'LB', labels: { ja: 'レバノン', en: 'Lebanon' } },
  { value: 'LC', labels: { ja: 'セントルシア', en: 'St. Lucia' } },
  { value: 'LI', labels: { ja: 'リヒテンシュタイン', en: 'Liechtenstein' } },
  { value: 'LK', labels: { ja: 'スリランカ', en: 'Sri Lanka' } },
  { value: 'LR', labels: { ja: 'リベリア', en: 'Liberia' } },
  { value: 'LS', labels: { ja: 'レソト', en: 'Lesotho' } },
  { value: 'LT', labels: { ja: 'リトアニア', en: 'Lithuania' } },
  { value: 'LU', labels: { ja: 'ルクセンブルク', en: 'Luxembourg' } },
  { value: 'LV', labels: { ja: 'ラトビア', en: 'Latvia' } },
  { value: 'LY', labels: { ja: 'リビア', en: 'Libya' } },
  { value: 'MA', labels: { ja: 'モロッコ', en: 'Morocco' } },
  { value: 'MC', labels: { ja: 'モナコ', en: 'Monaco' } },
  { value: 'MD', labels: { ja: 'モルドバ', en: 'Moldova' } },
  { value: 'ME', labels: { ja: 'モンテネグロ', en: 'Montenegro' } },
  { value: 'MF', labels: { ja: 'サン・マルタン', en: 'St. Martin' } },
  { value: 'MG', labels: { ja: 'マダガスカル', en: 'Madagascar' } },
  { value: 'MH', labels: { ja: 'マーシャル諸島', en: 'Marshall Islands' } },
  { value: 'MK', labels: { ja: '北マケドニア', en: 'North Macedonia' } },
  { value: 'ML', labels: { ja: 'マリ', en: 'Mali' } },
  { value: 'MM', labels: { ja: 'ミャンマー (ビルマ)', en: 'Myanmar (Burma)' } },
  { value: 'MN', labels: { ja: 'モンゴル', en: 'Mongolia' } },
  {
    value: 'MO',
    labels: { ja: '中華人民共和国マカオ特別行政区', en: 'Macao SAR China' },
  },
  {
    value: 'MP',
    labels: { ja: '北マリアナ諸島', en: 'Northern Mariana Islands' },
  },
  { value: 'MQ', labels: { ja: 'マルティニーク', en: 'Martinique' } },
  { value: 'MR', labels: { ja: 'モーリタニア', en: 'Mauritania' } },
  { value: 'MS', labels: { ja: 'モントセラト', en: 'Montserrat' } },
  { value: 'MT', labels: { ja: 'マルタ', en: 'Malta' } },
  { value: 'MU', labels: { ja: 'モーリシャス', en: 'Mauritius' } },
  { value: 'MV', labels: { ja: 'モルディブ', en: 'Maldives' } },
  { value: 'MW', labels: { ja: 'マラウイ', en: 'Malawi' } },
  { value: 'MX', labels: { ja: 'メキシコ', en: 'Mexico' } },
  { value: 'MY', labels: { ja: 'マレーシア', en: 'Malaysia' } },
  { value: 'MZ', labels: { ja: 'モザンビーク', en: 'Mozambique' } },
  { value: 'NA', labels: { ja: 'ナミビア', en: 'Namibia' } },
  { value: 'NC', labels: { ja: 'ニューカレドニア', en: 'New Caledonia' } },
  { value: 'NE', labels: { ja: 'ニジェール', en: 'Niger' } },
  { value: 'NF', labels: { ja: 'ノーフォーク島', en: 'Norfolk Island' } },
  { value: 'NG', labels: { ja: 'ナイジェリア', en: 'Nigeria' } },
  { value: 'NI', labels: { ja: 'ニカラグア', en: 'Nicaragua' } },
  { value: 'NL', labels: { ja: 'オランダ', en: 'Netherlands' } },
  { value: 'NO', labels: { ja: 'ノルウェー', en: 'Norway' } },
  { value: 'NP', labels: { ja: 'ネパール', en: 'Nepal' } },
  { value: 'NR', labels: { ja: 'ナウル', en: 'Nauru' } },
  { value: 'NU', labels: { ja: 'ニウエ', en: 'Niue' } },
  { value: 'NZ', labels: { ja: 'ニュージーランド', en: 'New Zealand' } },
  { value: 'OM', labels: { ja: 'オマーン', en: 'Oman' } },
  { value: 'PA', labels: { ja: 'パナマ', en: 'Panama' } },
  { value: 'PE', labels: { ja: 'ペルー', en: 'Peru' } },
  { value: 'PF', labels: { ja: '仏領ポリネシア', en: 'French Polynesia' } },
  { value: 'PG', labels: { ja: 'パプアニューギニア', en: 'Papua New Guinea' } },
  { value: 'PH', labels: { ja: 'フィリピン', en: 'Philippines' } },
  { value: 'PK', labels: { ja: 'パキスタン', en: 'Pakistan' } },
  { value: 'PL', labels: { ja: 'ポーランド', en: 'Poland' } },
  {
    value: 'PM',
    labels: { ja: 'サンピエール島・ミクロン島', en: 'St. Pierre & Miquelon' },
  },
  { value: 'PN', labels: { ja: 'ピトケアン諸島', en: 'Pitcairn Islands' } },
  { value: 'PR', labels: { ja: 'プエルトリコ', en: 'Puerto Rico' } },
  {
    value: 'PS',
    labels: { ja: 'パレスチナ自治区', en: 'Palestinian Territories' },
  },
  { value: 'PT', labels: { ja: 'ポルトガル', en: 'Portugal' } },
  { value: 'PW', labels: { ja: 'パラオ', en: 'Palau' } },
  { value: 'PY', labels: { ja: 'パラグアイ', en: 'Paraguay' } },
  { value: 'QA', labels: { ja: 'カタール', en: 'Qatar' } },
  { value: 'RE', labels: { ja: 'レユニオン', en: 'Réunion' } },
  { value: 'RO', labels: { ja: 'ルーマニア', en: 'Romania' } },
  { value: 'RS', labels: { ja: 'セルビア', en: 'Serbia' } },
  { value: 'RU', labels: { ja: 'ロシア', en: 'Russia' } },
  { value: 'RW', labels: { ja: 'ルワンダ', en: 'Rwanda' } },
  { value: 'SA', labels: { ja: 'サウジアラビア', en: 'Saudi Arabia' } },
  { value: 'SB', labels: { ja: 'ソロモン諸島', en: 'Solomon Islands' } },
  { value: 'SC', labels: { ja: 'セーシェル', en: 'Seychelles' } },
  { value: 'SD', labels: { ja: 'スーダン', en: 'Sudan' } },
  { value: 'SE', labels: { ja: 'スウェーデン', en: 'Sweden' } },
  { value: 'SG', labels: { ja: 'シンガポール', en: 'Singapore' } },
  { value: 'SH', labels: { ja: 'セントヘレナ', en: 'St. Helena' } },
  { value: 'SI', labels: { ja: 'スロベニア', en: 'Slovenia' } },
  {
    value: 'SJ',
    labels: {
      ja: 'スバールバル諸島・ヤンマイエン島',
      en: 'Svalbard & Jan Mayen',
    },
  },
  { value: 'SK', labels: { ja: 'スロバキア', en: 'Slovakia' } },
  { value: 'SL', labels: { ja: 'シエラレオネ', en: 'Sierra Leone' } },
  { value: 'SM', labels: { ja: 'サンマリノ', en: 'San Marino' } },
  { value: 'SN', labels: { ja: 'セネガル', en: 'Senegal' } },
  { value: 'SO', labels: { ja: 'ソマリア', en: 'Somalia' } },
  { value: 'SR', labels: { ja: 'スリナム', en: 'Suriname' } },
  { value: 'SS', labels: { ja: '南スーダン', en: 'South Sudan' } },
  {
    value: 'ST',
    labels: { ja: 'サントメ・プリンシペ', en: 'São Tomé & Príncipe' },
  },
  { value: 'SV', labels: { ja: 'エルサルバドル', en: 'El Salvador' } },
  { value: 'SX', labels: { ja: 'シント・マールテン', en: 'Sint Maarten' } },
  { value: 'SY', labels: { ja: 'シリア', en: 'Syria' } },
  { value: 'SZ', labels: { ja: 'エスワティニ', en: 'Eswatini' } },
  {
    value: 'TC',
    labels: { ja: 'タークス・カイコス諸島', en: 'Turks & Caicos Islands' },
  },
  { value: 'TD', labels: { ja: 'チャド', en: 'Chad' } },
  {
    value: 'TF',
    labels: { ja: '仏領極南諸島', en: 'French Southern Territories' },
  },
  { value: 'TG', labels: { ja: 'トーゴ', en: 'Togo' } },
  { value: 'TH', labels: { ja: 'タイ', en: 'Thailand' } },
  { value: 'TJ', labels: { ja: 'タジキスタン', en: 'Tajikistan' } },
  { value: 'TK', labels: { ja: 'トケラウ', en: 'Tokelau' } },
  { value: 'TL', labels: { ja: '東ティモール', en: 'Timor-Leste' } },
  { value: 'TM', labels: { ja: 'トルクメニスタン', en: 'Turkmenistan' } },
  { value: 'TN', labels: { ja: 'チュニジア', en: 'Tunisia' } },
  { value: 'TO', labels: { ja: 'トンガ', en: 'Tonga' } },
  { value: 'TR', labels: { ja: 'トルコ', en: 'Türkiye' } },
  {
    value: 'TT',
    labels: { ja: 'トリニダード・トバゴ', en: 'Trinidad & Tobago' },
  },
  { value: 'TV', labels: { ja: 'ツバル', en: 'Tuvalu' } },
  { value: 'TW', labels: { ja: '台湾', en: 'Taiwan' } },
  { value: 'TZ', labels: { ja: 'タンザニア', en: 'Tanzania' } },
  { value: 'UA', labels: { ja: 'ウクライナ', en: 'Ukraine' } },
  { value: 'UG', labels: { ja: 'ウガンダ', en: 'Uganda' } },
  {
    value: 'UM',
    labels: { ja: '合衆国領有小離島', en: 'U.S. Outlying Islands' },
  },
  { value: 'US', labels: { ja: 'アメリカ合衆国', en: 'United States' } },
  { value: 'UY', labels: { ja: 'ウルグアイ', en: 'Uruguay' } },
  { value: 'UZ', labels: { ja: 'ウズベキスタン', en: 'Uzbekistan' } },
  { value: 'VA', labels: { ja: 'バチカン市国', en: 'Vatican City' } },
  {
    value: 'VC',
    labels: {
      ja: 'セントビンセント及びグレナディーン諸島',
      en: 'St. Vincent & Grenadines',
    },
  },
  { value: 'VE', labels: { ja: 'ベネズエラ', en: 'Venezuela' } },
  {
    value: 'VG',
    labels: { ja: '英領ヴァージン諸島', en: 'British Virgin Islands' },
  },
  {
    value: 'VI',
    labels: { ja: '米領ヴァージン諸島', en: 'U.S. Virgin Islands' },
  },
  { value: 'VN', labels: { ja: 'ベトナム', en: 'Vietnam' } },
  { value: 'VU', labels: { ja: 'バヌアツ', en: 'Vanuatu' } },
  { value: 'WF', labels: { ja: 'ウォリス・フツナ', en: 'Wallis & Futuna' } },
  { value: 'WS', labels: { ja: 'サモア', en: 'Samoa' } },
  { value: 'YE', labels: { ja: 'イエメン', en: 'Yemen' } },
  { value: 'YT', labels: { ja: 'マヨット', en: 'Mayotte' } },
  { value: 'ZA', labels: { ja: '南アフリカ', en: 'South Africa' } },
  { value: 'ZM', labels: { ja: 'ザンビア', en: 'Zambia' } },
  { value: 'ZW', labels: { ja: 'ジンバブエ', en: 'Zimbabwe' } },
] as const satisfies readonly Nationality[];

export function getNationalityOptions(locale: NationalityLocale) {
  return NATIONALITIES.map(({ value, labels }) => ({
    value,
    label: labels[locale],
  })).sort((a, b) => {
    if (a.value === 'JP') return -1;
    if (b.value === 'JP') return 1;

    return a.label.localeCompare(b.label, locale);
  });
}

export function getNationalityLabel(value: string, locale: NationalityLocale) {
  return (
    NATIONALITIES.find((nationality) => nationality.value === value)?.labels[
      locale
    ] ?? value
  );
}

export function getNationalityOptionGroups(locale: NationalityLocale) {
  const options = getNationalityOptions(locale);
  const optionMap = new Map(options.map((option) => [option.value, option]));
  const priorityOptions = PRIORITY_NATIONALITY_CODES.map(
    (code) => optionMap.get(code)!
  );
  const priorityCodes = new Set<string>(PRIORITY_NATIONALITY_CODES);
  const otherOptions = options.filter(
    (option) => !priorityCodes.has(option.value)
  );

  return [
    {
      label: NATIONALITY_GROUP_LABELS[locale].priority,
      options: priorityOptions,
    },
    {
      label: NATIONALITY_GROUP_LABELS[locale].others,
      options: otherOptions,
    },
  ];
}
