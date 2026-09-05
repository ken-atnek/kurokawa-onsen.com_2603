<?php
declare(strict_types=1);

date_default_timezone_set('Asia/Tokyo');

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'POST method only.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$to = 'ken.atnek@gmail.com';
$from = 'no-reply@kurokawa-onsen.com';

$fields = [
    'shopId' => '店舗ID',
    'shopName' => '店舗名',
    'reservationDate' => '予約日',
    'guests' => 'ご利用人数',
    'selectedMenus' => '選択メニュー',
    'customerName' => 'お名前',
    'customerKana' => 'ふりがな',
    'tel' => '電話番号',
    'email' => 'メールアドレス',
    'request' => 'ご要望・アレルギー等',
];

$required = [
    'shopId',
    'reservationDate',
    'guests',
    'customerName',
    'customerKana',
    'tel',
    'email',
];

$input = [];

foreach ($fields as $key => $label) {
    $value = $_POST[$key] ?? '';

    if (is_array($value)) {
        $value = implode(', ', array_map('sanitize_text', $value));
    } else {
        $value = sanitize_text((string) $value);
    }

    $input[$key] = $value;
}

foreach ($required as $key) {
    if ($input[$key] === '') {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Required fields are missing.',
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid email address.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!function_exists('mb_send_mail')) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Mail function is unavailable.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$adminSubject = '【黒川温泉】飲食店予約フォーム';
$adminBodyLines = [
    '飲食店予約フォームから送信がありました。',
    '',
];

foreach ($fields as $key => $label) {
    $adminBodyLines[] = $label . '：' . ($input[$key] !== '' ? $input[$key] : '-');
}

$adminBodyLines[] = '';
$adminBodyLines[] = '送信日時：' . date('Y-m-d H:i:s');

$adminBody = implode("\n", $adminBodyLines);
$adminHeaders = [
    'From: ' . $from,
    'Reply-To: ' . sanitize_header_text($input['email']),
    'Content-Type: text/plain; charset=UTF-8',
];

mb_language('Japanese');
mb_internal_encoding('UTF-8');

$adminSent = mb_send_mail($to, $adminSubject, $adminBody, implode("\r\n", $adminHeaders));

$customerSubject = '【黒川温泉】ご予約内容の確認';
$customerBodyLines = [
    $input['customerName'] . ' 様',
    '',
    'この度はご予約いただきありがとうございます。',
    '以下の内容でご予約を受け付けました。',
    '',
];

foreach ($fields as $key => $label) {
    if ($key === 'customerName' || $key === 'customerKana' || $key === 'email') {
        continue;
    }

    $customerBodyLines[] = $label . '：' . ($input[$key] !== '' ? $input[$key] : '-');
}

$customerBodyLines[] = '';
$customerBodyLines[] = 'ご予約内容について確認が必要な場合は、店舗よりご連絡いたします。';
$customerBodyLines[] = '';
$customerBodyLines[] = '黒川温泉観光協会';

$customerBody = implode("\n", $customerBodyLines);
$customerHeaders = [
    'From: ' . $from,
    'Reply-To: ' . $from,
    'Content-Type: text/plain; charset=UTF-8',
];

$customerSent = mb_send_mail(
    sanitize_header_text($input['email']),
    $customerSubject,
    $customerBody,
    implode("\r\n", $customerHeaders)
);

if (!$adminSent || !$customerSent) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send mail.',
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'message' => 'Mail sent.',
], JSON_UNESCAPED_UNICODE);

function sanitize_text(string $value): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = trim($value);

    return str_replace(["\0"], '', $value);
}

function sanitize_header_text(string $value): string
{
    return str_replace(["\r", "\n", "\0"], '', trim($value));
}
