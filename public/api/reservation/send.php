<?php
declare(strict_types=1);

ini_set('display_errors', '0');

date_default_timezone_set('Asia/Tokyo');

header('Content-Type: application/json; charset=UTF-8');

/**
 * No.12形式のJSON responseを返す。
 */
function reservationApiRespond(int $status, array $body): void
{
    http_response_code($status);
    $json = json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        http_response_code(500);
        $json = '{"success":false,"errorCode":"INTERNAL_ERROR","message":"予約処理中にエラーが発生しました。"}';
    }
    echo $json;
    exit;
}

/**
 * 公開用の固定error mappingで失敗responseを返す。
 */
function reservationApiRespondError(string $errorCode): void
{
    $errors = [
        'INVALID_REQUEST' => [400, 'リクエスト内容が正しくありません。'],
        'VALIDATION_ERROR' => [400, '入力内容を確認してください。'],
        'RESERVATION_UNAVAILABLE' => [400, '現在この条件では予約を受け付けていません。'],
        'MENU_INVALID' => [400, '選択されたメニューを確認してください。'],
        'FULL' => [409, 'この日時は満席になりました。別の日程をお選びください。'],
        'METHOD_NOT_ALLOWED' => [405, 'リクエスト方法が正しくありません。'],
        'UNSUPPORTED_MEDIA_TYPE' => [415, 'リクエスト形式が正しくありません。'],
        'RATE_LIMITED' => [429, 'しばらく時間をおいてから再度お試しください。'],
        'INTERNAL_ERROR' => [500, '予約処理中にエラーが発生しました。'],
    ];

    if (isset($errors[$errorCode]) === false) {
        $errorCode = 'INTERNAL_ERROR';
    }
    [$status, $message] = $errors[$errorCode];
    reservationApiRespond($status, [
        'success' => false,
        'errorCode' => $errorCode,
        'message' => $message,
    ]);
}

/**
 * PIIや例外詳細を含めず、処理stageだけをserver logへ残す。
 */
function reservationApiLog(string $stage, array $context = []): void
{
    $parts = ['[reservation-api]', 'stage=' . $stage];
    foreach ($context as $key => $value) {
        if (is_scalar($value) === true || $value === null) {
            $parts[] = $key . '=' . (string)$value;
        }
    }
    error_log(implode(' ', $parts));
}

/**
 * 実行環境ごとの差を吸収してContent-Type request headerを取得する。
 */
function reservationApiGetContentTypeHeader(): string
{
    foreach (['CONTENT_TYPE', 'HTTP_CONTENT_TYPE'] as $serverKey) {
        if (isset($_SERVER[$serverKey]) && trim((string)$_SERVER[$serverKey]) !== '') {
            return trim((string)$_SERVER[$serverKey]);
        }
    }

    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (is_array($headers)) {
            foreach ($headers as $name => $value) {
                if (strtolower((string)$name) === 'content-type' && trim((string)$value) !== '') {
                    return trim((string)$value);
                }
            }
        }
    }
    return '';
}

function reservationApiFailure(string $errorCode, string $stage = ''): array
{
    return [
        'success' => false,
        'error_code' => $errorCode,
        'stage' => $stage,
    ];
}

function reservationApiIsListArray($value): bool
{
    if (is_array($value) === false) {
        return false;
    }
    if ($value === []) {
        return true;
    }
    return array_keys($value) === range(0, count($value) - 1);
}

function reservationApiIsUnicodeBlank(string $value): bool
{
    return preg_match('/\A(?:\s|\p{Z}|\x{FEFF})*\z/u', $value) === 1;
}

/**
 * 正のASCII decimal stringをPHP intへ安全に変換する。
 */
function reservationApiNormalizePositiveDecimal(string $value): ?int
{
    if (preg_match('/\A[0-9]+\z/', $value) !== 1) {
        return null;
    }

    $significant = ltrim($value, '0');
    if ($significant === '') {
        return null;
    }

    $max = (string)PHP_INT_MAX;
    if (
        strlen($significant) > strlen($max) ||
        (strlen($significant) === strlen($max) && strcmp($significant, $max) > 0)
    ) {
        return null;
    }

    return (int)$significant;
}

/**
 * DBの整数値を、小数を許容せず指定範囲へ正規化する。
 */
function reservationApiNormalizeDatabaseInteger($value, ?int $min = null, ?int $max = null): ?int
{
    if (is_int($value) === true) {
        $normalized = $value;
    } elseif (is_string($value) === true && preg_match('/\A[0-9]+\z/', $value) === 1) {
        $normalized = reservationApiNormalizePositiveDecimal($value);
        if ($value === '0' || preg_match('/\A0+\z/', $value) === 1) {
            $normalized = 0;
        }
        if ($normalized === null) {
            return null;
        }
    } else {
        return null;
    }

    if ($min !== null && $normalized < $min) {
        return null;
    }
    if ($max !== null && $normalized > $max) {
        return null;
    }
    return $normalized;
}

function reservationApiIsValidDate(string $value): bool
{
    if (preg_match('/\A\d{4}-\d{2}-\d{2}\z/', $value) !== 1) {
        return false;
    }
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    return $date !== false && $date->format('Y-m-d') === $value;
}

/**
 * No.6 payloadを検証し、DB/commonへ渡す内部値へ正規化する。
 */
function reservationApiValidatePayload(array $payload): array
{
    $allowedKeys = [
        'shop_id',
        'date',
        'guests',
        'menu_selections',
        'name',
        'kana',
        'tel',
        'email',
        'note',
        'privacy_agreed',
    ];
    $requiredKeys = [
        'shop_id',
        'date',
        'guests',
        'menu_selections',
        'name',
        'kana',
        'tel',
        'email',
        'privacy_agreed',
    ];

    if (array_diff(array_keys($payload), $allowedKeys) !== []) {
        return reservationApiFailure('INVALID_REQUEST', 'unknown_field');
    }
    foreach ($requiredKeys as $key) {
        if (array_key_exists($key, $payload) === false) {
            return reservationApiFailure('VALIDATION_ERROR', 'required_field_missing');
        }
    }

    if (is_string($payload['shop_id']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'shop_id_type');
    }
    if (strlen($payload['shop_id']) < 1 || strlen($payload['shop_id']) > 20) {
        return reservationApiFailure('VALIDATION_ERROR', 'shop_id_length');
    }
    $shopId = reservationApiNormalizePositiveDecimal($payload['shop_id']);
    if ($shopId === null) {
        return reservationApiFailure('VALIDATION_ERROR', 'shop_id_value');
    }

    if (is_string($payload['date']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'date_type');
    }
    if (reservationApiIsValidDate($payload['date']) === false) {
        return reservationApiFailure('VALIDATION_ERROR', 'date_value');
    }

    if (is_int($payload['guests']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'guests_type');
    }
    if ($payload['guests'] < 1 || $payload['guests'] > 4) {
        return reservationApiFailure('VALIDATION_ERROR', 'guests_value');
    }

    if (is_array($payload['menu_selections']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'menu_selections_type');
    }
    if (reservationApiIsListArray($payload['menu_selections']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'menu_selections_structure');
    }
    if (count($payload['menu_selections']) !== $payload['guests']) {
        return reservationApiFailure('VALIDATION_ERROR', 'menu_selections_length');
    }

    $menuSelections = [];
    foreach ($payload['menu_selections'] as $selection) {
        if ($selection === null) {
            $menuSelections[] = null;
            continue;
        }
        if (is_string($selection) === false) {
            return reservationApiFailure('INVALID_REQUEST', 'menu_selection_type');
        }
        if (preg_match('/\Amenu-([0-9]{3,})\z/', $selection, $matches) !== 1) {
            return reservationApiFailure('VALIDATION_ERROR', 'menu_selection_format');
        }
        $menuId = reservationApiNormalizePositiveDecimal($matches[1]);
        if ($menuId === null) {
            return reservationApiFailure('VALIDATION_ERROR', 'menu_selection_value');
        }
        $menuSelections[] = $menuId;
    }

    if (is_string($payload['name']) === false || is_string($payload['kana']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'customer_identity_type');
    }
    $customerName = normalizeReservationCustomerIdentityValue($payload['name']);
    $customerKana = normalizeReservationCustomerIdentityValue($payload['kana']);
    if ($customerName === null || $customerKana === null) {
        return reservationApiFailure('VALIDATION_ERROR', 'customer_identity_value');
    }

    $stringLimits = [
        'tel' => 20,
        'email' => 255,
    ];
    foreach ($stringLimits as $key => $maxLength) {
        if (is_string($payload[$key]) === false) {
            return reservationApiFailure('INVALID_REQUEST', $key . '_type');
        }
        if (
            reservationApiIsUnicodeBlank($payload[$key]) === true ||
            mb_strlen($payload[$key], 'UTF-8') > $maxLength
        ) {
            return reservationApiFailure('VALIDATION_ERROR', $key . '_value');
        }
    }
    if (filter_var($payload['email'], FILTER_VALIDATE_EMAIL) === false) {
        return reservationApiFailure('VALIDATION_ERROR', 'email_format');
    }

    $customerNote = null;
    if (array_key_exists('note', $payload) === true) {
        if ($payload['note'] !== null && is_string($payload['note']) === false) {
            return reservationApiFailure('INVALID_REQUEST', 'note_type');
        }
        if (
            is_string($payload['note']) === true &&
            reservationApiIsUnicodeBlank($payload['note']) === false
        ) {
            if (strlen($payload['note']) > 65535) {
                return reservationApiFailure('VALIDATION_ERROR', 'note_length');
            }
            $customerNote = $payload['note'];
        }
    }

    if (is_bool($payload['privacy_agreed']) === false) {
        return reservationApiFailure('INVALID_REQUEST', 'privacy_agreed_type');
    }
    if ($payload['privacy_agreed'] !== true) {
        return reservationApiFailure('VALIDATION_ERROR', 'privacy_agreed_value');
    }

    return [
        'success' => true,
        'data' => [
            'shop_id' => $shopId,
            'date' => $payload['date'],
            'guests' => $payload['guests'],
            'menu_selections' => $menuSelections,
            'name' => $customerName,
            'kana' => $customerKana,
            'tel' => $payload['tel'],
            'email' => $payload['email'],
            'note' => $customerNote,
        ],
    ];
}

function reservationApiResolveCmsConfigRoot(): ?string
{
    $rootCandidates = [
        dirname(__DIR__, 4),
        dirname(__DIR__, 2),
    ];
    $documentRoot = trim((string)($_SERVER['DOCUMENT_ROOT'] ?? ''));
    if ($documentRoot !== '') {
        $rootCandidates[] = rtrim($documentRoot, '/\\');
    }

    if (PHP_OS_FAMILY === 'Windows') {
        $panelDirectoryNames = ['cms-panel_2602'];
    } elseif (PHP_OS_FAMILY === 'Linux') {
        $panelDirectoryNames = ['cms-panel'];
    } else {
        return null;
    }

    foreach (array_unique($rootCandidates) as $rootCandidate) {
        foreach ($panelDirectoryNames as $panelDirectoryName) {
            $cmsConfigRoot = rtrim($rootCandidate, '/\\') . '/' . $panelDirectoryName . '/cms_config';
            if (is_file($cmsConfigRoot . '/common/set_reservation_function.php') === true) {
                return $cmsConfigRoot;
            }
        }
    }

    return null;
}

function reservationApiDependencyFiles(string $cmsConfigRoot): array
{
    return [
        'common/define.php' => $cmsConfigRoot . '/common/define.php',
        'common/set_function.php' => $cmsConfigRoot . '/common/set_function.php',
        'database/set_db.php' => $cmsConfigRoot . '/database/set_db.php',
        'database/db_shops.php' => $cmsConfigRoot . '/database/db_shops.php',
        'database/db_reservation_settings.php' => $cmsConfigRoot . '/database/db_reservation_settings.php',
        'database/db_food_menus.php' => $cmsConfigRoot . '/database/db_food_menus.php',
        'database/db_seats.php' => $cmsConfigRoot . '/database/db_seats.php',
        'database/db_reservation_calender.php' => $cmsConfigRoot . '/database/db_reservation_calender.php',
        'database/db_reservation_detail.php' => $cmsConfigRoot . '/database/db_reservation_detail.php',
        'database/db_reservations.php' => $cmsConfigRoot . '/database/db_reservations.php',
        'common/set_reservation_function.php' => $cmsConfigRoot . '/common/set_reservation_function.php',
        'common/set_reservation_mail_function.php' => $cmsConfigRoot . '/common/set_reservation_mail_function.php',
    ];
}

function reservationApiFindMissingDependency(array $dependencyFiles): ?string
{
    foreach ($dependencyFiles as $name => $path) {
        if (is_file($path) === false || is_readable($path) === false) {
            return $name;
        }
    }
    return null;
}

function reservationApiCheckAcceptancePeriod(array $settings, string $targetDate): array
{
    $acceptEnd = reservationApiNormalizeDatabaseInteger($settings['accept_end_days_before'] ?? null, 0);
    $acceptStartValue = $settings['accept_start_days_before'] ?? null;
    $acceptStart = $acceptStartValue === null
        ? null
        : reservationApiNormalizeDatabaseInteger($acceptStartValue, 0);

    if ($acceptEnd === null || ($acceptStartValue !== null && $acceptStart === null)) {
        return reservationApiFailure('INTERNAL_ERROR', 'acceptance_settings_invalid');
    }
    if ($acceptStart !== null && $acceptStart < $acceptEnd) {
        return reservationApiFailure('INTERNAL_ERROR', 'acceptance_range_invalid');
    }

    $today = new DateTimeImmutable('today');
    $target = new DateTimeImmutable($targetDate);
    if ($target < $today) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'reservation_date_past');
    }

    $firstBookableDate = $today->add(new DateInterval('P' . $acceptEnd . 'D'));
    if ($target < $firstBookableDate) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'acceptance_not_started');
    }
    if ($acceptStart !== null) {
        $lastBookableDate = $today->add(new DateInterval('P' . $acceptStart . 'D'));
        if ($target > $lastBookableDate) {
            return reservationApiFailure('RESERVATION_UNAVAILABLE', 'acceptance_closed');
        }
    }

    return ['success' => true];
}

/**
 * shops mutex取得後の最新DB stateでWeb routeの受付条件を確認する。
 */
function reservationApiCheckFreshEligibility(int $shopId, string $targetDate, int $guests, array $menuSelections): array
{
    $shop = getReservationShopForOccupancy($shopId);
    if ($shop === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'shop_read_failed');
    }
    if ($shop === null) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'shop_not_found');
    }
    if (is_array($shop) === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'shop_read_invalid');
    }
    if (
        ($shop['shop_type'] ?? null) !== 'food' ||
        (int)($shop['is_active'] ?? 0) !== 1 ||
        (int)($shop['is_public'] ?? 0) !== 1
    ) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'shop_not_eligible');
    }

    $settings = getShopReservationSettings($shopId);
    if ($settings === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'settings_read_failed');
    }
    if ($settings === null) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'settings_not_found');
    }
    if (is_array($settings) === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'settings_read_invalid');
    }
    if ((int)($settings['reservation_enabled'] ?? 0) !== 1) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'reservation_disabled');
    }

    $menuSelectionType = reservationApiNormalizeDatabaseInteger($settings['menu_selection_type'] ?? null, 0, 2);
    if ($menuSelectionType === null) {
        return reservationApiFailure('INTERNAL_ERROR', 'menu_selection_type_invalid');
    }

    if ($menuSelectionType !== 0) {
        $selectedMenuIds = [];
        foreach ($menuSelections as $menuId) {
            if ($menuId !== null) {
                $selectedMenuIds[$menuId] = $menuId;
            }
        }
        if ($selectedMenuIds !== []) {
            $selectedMenuRows = getFoodMenuRowsForReservation($shopId, array_values($selectedMenuIds));
            if ($selectedMenuRows === false) {
                return reservationApiFailure('INTERNAL_ERROR', 'selected_menu_read_failed');
            }
            if (is_array($selectedMenuRows) === false) {
                return reservationApiFailure('INTERNAL_ERROR', 'selected_menu_read_invalid');
            }
        }
    }

    if ($menuSelectionType === 2) {
        $activeMenuCount = getActiveFoodMenuCountForReservation($shopId);
        if ($activeMenuCount === false) {
            return reservationApiFailure('INTERNAL_ERROR', 'active_menu_count_read_failed');
        }
        if ($activeMenuCount < 1) {
            return reservationApiFailure('RESERVATION_UNAVAILABLE', 'active_menu_not_found');
        }
    }

    $seatRows = getSeatsForReservationOccupancy($shopId);
    if ($seatRows === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'seat_read_failed');
    }
    if (is_array($seatRows) === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'seat_read_invalid');
    }
    $activeNormalSeatCount = 0;
    foreach ($seatRows as $seatRow) {
        if (
            is_array($seatRow) === true &&
            (int)($seatRow['is_active'] ?? 0) === 1 &&
            (int)($seatRow['is_temp_move'] ?? 0) === 0
        ) {
            $activeNormalSeatCount++;
        }
    }
    if ($activeNormalSeatCount < 1) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'active_seat_not_found');
    }

    if (isReservationEnabledForShop($shopId) !== true) {
        return reservationApiFailure('INTERNAL_ERROR', 'common_eligibility_inconsistent');
    }

    $acceptanceResult = reservationApiCheckAcceptancePeriod($settings, $targetDate);
    if (($acceptanceResult['success'] ?? false) !== true) {
        return $acceptanceResult;
    }

    $guestMin = reservationApiNormalizeDatabaseInteger($settings['guest_min'] ?? null, 1, 4);
    $guestMax = reservationApiNormalizeDatabaseInteger($settings['guest_max'] ?? null, 1, 4);
    if ($guestMin === null || $guestMax === null || $guestMin > $guestMax) {
        return reservationApiFailure('INTERNAL_ERROR', 'guest_range_invalid');
    }
    if ($guests < $guestMin || $guests > $guestMax) {
        return reservationApiFailure('RESERVATION_UNAVAILABLE', 'guest_range_unavailable');
    }

    return ['success' => true];
}

function reservationApiMapRegistrationResult($registrationResult): array
{
    if (is_array($registrationResult) === false) {
        return reservationApiFailure('INTERNAL_ERROR', 'registration_result_invalid');
    }
    if (($registrationResult['success'] ?? false) === true) {
        $reservationId = $registrationResult['reservation_id'] ?? null;
        if (is_int($reservationId) === false || $reservationId < 1) {
            return reservationApiFailure('INTERNAL_ERROR', 'reservation_id_invalid');
        }
        return [
            'success' => true,
            'reservation_id' => $reservationId,
        ];
    }

    $reason = $registrationResult['reason'] ?? null;
    $allocationReason = $registrationResult['allocation_reason'] ?? null;
    if ($reason === 'invalid_menu') {
        return reservationApiFailure('MENU_INVALID', 'registration_invalid_menu');
    }
    if ($reason === 'allocation_failed') {
        if ($allocationReason === 'full') {
            return reservationApiFailure('FULL', 'allocation_full');
        }
        if (in_array($allocationReason, ['acceptance_stopped', 'shop_holiday', 'regular_holiday'], true)) {
            return reservationApiFailure('RESERVATION_UNAVAILABLE', 'allocation_unavailable');
        }
        return reservationApiFailure('INTERNAL_ERROR', 'allocation_internal_' . (string)$allocationReason);
    }
    if (
        $reason === 'invalid_input' ||
        in_array($reason, [
            'settings_read_failed',
            'menu_read_failed',
            'relocation_write_failed',
            'reservation_insert_failed',
            'seat_insert_failed',
            'menu_insert_failed',
        ], true)
    ) {
        return reservationApiFailure('INTERNAL_ERROR', 'registration_' . (string)$reason);
    }

    return reservationApiFailure('INTERNAL_ERROR', 'registration_unknown_reason');
}

function reservationApiRollbackActiveTransaction(): void
{
    global $DB_CONNECT;
    try {
        if (
            is_object($DB_CONNECT) === true &&
            method_exists($DB_CONNECT, 'inTransaction') === true &&
            $DB_CONNECT->inTransaction() === true &&
            DB_Transaction(3) !== true
        ) {
            reservationApiLog('rollback_failed');
        }
    } catch (Throwable $e) {
        reservationApiLog('rollback_exception', ['exception' => get_class($e)]);
    }
}

/**
 * BEGINからCOMMIT/ROLLBACKまでを所有し、transaction解決後に結果を返す。
 */
function reservationApiExecuteRegistration(array $requestData): array
{
    $transactionStarted = false;
    $commitSucceeded = false;

    try {
        if (DB_Transaction(1) !== true) {
            reservationApiLog('begin_failed');
            return reservationApiFailure('INTERNAL_ERROR', 'begin_failed');
        }
        $transactionStarted = true;

        $lockedShop = getReservationShopForUpdate($requestData['shop_id']);
        if ($lockedShop === false) {
            reservationApiLog('shop_mutex_failed');
            return reservationApiFailure('INTERNAL_ERROR', 'shop_mutex_failed');
        }
        if ($lockedShop === null) {
            return reservationApiFailure('RESERVATION_UNAVAILABLE', 'shop_mutex_not_found');
        }
        if (is_array($lockedShop) === false) {
            reservationApiLog('shop_mutex_invalid');
            return reservationApiFailure('INTERNAL_ERROR', 'shop_mutex_invalid');
        }

        $eligibilityResult = reservationApiCheckFreshEligibility(
            $requestData['shop_id'],
            $requestData['date'],
            $requestData['guests'],
            $requestData['menu_selections']
        );
        if (($eligibilityResult['success'] ?? false) !== true) {
            if (($eligibilityResult['error_code'] ?? '') === 'INTERNAL_ERROR') {
                reservationApiLog((string)($eligibilityResult['stage'] ?? 'eligibility_failed'));
            }
            return $eligibilityResult;
        }

        $reservationData = [
            'reservation_date' => $requestData['date'],
            'party_size' => $requestData['guests'],
            'reservation_route' => 1,
            'customer_name' => $requestData['name'],
            'customer_kana' => $requestData['kana'],
            'customer_tel' => $requestData['tel'],
            'customer_email' => $requestData['email'],
            'customer_note' => $requestData['note'],
        ];
        $registrationResult = executeReservationRegistration(
            $requestData['shop_id'],
            $reservationData,
            $requestData['menu_selections']
        );
        $mappedResult = reservationApiMapRegistrationResult($registrationResult);
        if (($mappedResult['success'] ?? false) !== true) {
            if (($mappedResult['error_code'] ?? '') === 'INTERNAL_ERROR') {
                reservationApiLog((string)($mappedResult['stage'] ?? 'registration_failed'));
            }
            return $mappedResult;
        }

        if (DB_Transaction(2) !== true) {
            reservationApiLog('commit_failed');
            return reservationApiFailure('INTERNAL_ERROR', 'commit_failed');
        }
        $commitSucceeded = true;
        $transactionStarted = false;

        return [
            'success' => true,
            'reservation_id' => $mappedResult['reservation_id'],
        ];
    } catch (Throwable $e) {
        reservationApiLog('transaction_exception', ['exception' => get_class($e)]);
        return reservationApiFailure('INTERNAL_ERROR', 'transaction_exception');
    } finally {
        if ($transactionStarted === true && $commitSucceeded === false) {
            reservationApiRollbackActiveTransaction();
        }
    }
}

$requestMethod = $_SERVER['REQUEST_METHOD'] ?? '';
if ($requestMethod !== 'POST') {
    header('Allow: POST');
    reservationApiRespondError('METHOD_NOT_ALLOWED');
}

$contentTypeHeader = reservationApiGetContentTypeHeader();
$contentType = strtolower(trim(explode(';', $contentTypeHeader, 2)[0]));
if ($contentType !== 'application/json') {
    reservationApiLog('unsupported_media_type', [
        'content_type_header_present' => $contentTypeHeader === '' ? 0 : 1,
    ]);
    reservationApiRespondError('UNSUPPORTED_MEDIA_TYPE');
}

if (function_exists('mb_strlen') === false) {
    reservationApiLog('mbstring_unavailable');
    reservationApiRespondError('INTERNAL_ERROR');
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false) {
    reservationApiRespondError('INVALID_REQUEST');
}
$decodedBody = json_decode($rawBody);
if (json_last_error() !== JSON_ERROR_NONE || is_object($decodedBody) === false) {
    reservationApiRespondError('INVALID_REQUEST');
}

$cmsConfigRoot = reservationApiResolveCmsConfigRoot();
if ($cmsConfigRoot === null) {
    reservationApiLog('environment_unsupported', ['os_family' => PHP_OS_FAMILY]);
    reservationApiRespondError('INTERNAL_ERROR');
}
$reservationFunctionFile = $cmsConfigRoot . '/common/set_reservation_function.php';
if (is_file($reservationFunctionFile) === false || is_readable($reservationFunctionFile) === false) {
    reservationApiLog('dependency_missing', ['dependency' => 'common/set_reservation_function.php']);
    reservationApiRespondError('INTERNAL_ERROR');
}
try {
    require_once $reservationFunctionFile;
} catch (Throwable $e) {
    reservationApiLog('bootstrap_exception', ['exception' => get_class($e)]);
    reservationApiRespondError('INTERNAL_ERROR');
}
if (function_exists('normalizeReservationCustomerIdentityValue') === false) {
    reservationApiLog('function_missing', ['function' => 'normalizeReservationCustomerIdentityValue']);
    reservationApiRespondError('INTERNAL_ERROR');
}

$validationResult = reservationApiValidatePayload(get_object_vars($decodedBody));
if (($validationResult['success'] ?? false) !== true) {
    reservationApiRespondError((string)($validationResult['error_code'] ?? 'INTERNAL_ERROR'));
}
$requestData = $validationResult['data'];

$dependencyFiles = reservationApiDependencyFiles($cmsConfigRoot);
$missingDependency = reservationApiFindMissingDependency($dependencyFiles);
if ($missingDependency !== null) {
    reservationApiLog('dependency_missing', ['dependency' => $missingDependency]);
    reservationApiRespondError('INTERNAL_ERROR');
}

if (defined('DB_CONNECT_THROW_ON_ERROR') === true && DB_CONNECT_THROW_ON_ERROR !== true) {
    reservationApiLog('db_exception_mode_conflict');
    reservationApiRespondError('INTERNAL_ERROR');
}
if (defined('DB_CONNECT_THROW_ON_ERROR') === false) {
    define('DB_CONNECT_THROW_ON_ERROR', true);
}

try {
    foreach ($dependencyFiles as $dependencyFile) {
        require_once $dependencyFile;
    }
} catch (Throwable $e) {
    reservationApiLog('bootstrap_exception', ['exception' => get_class($e)]);
    reservationApiRespondError('INTERNAL_ERROR');
}

$requiredFunctions = [
    'DB_Transaction',
    'getReservationShopForUpdate',
    'getReservationShopForOccupancy',
    'getShopReservationSettings',
    'getFoodMenuRowsForReservation',
    'getActiveFoodMenuCountForReservation',
    'countActiveFoodMenusForReservation',
    'getSeatsForReservationOccupancy',
    'countActiveNormalSeatsForReservation',
    'isFoodMenuAvailableForReservationRegistration',
    'isReservationEnabledForShop',
    'executeReservationRegistration',
    'getReservationDetail',
    'getReservationDetailSeatRows',
    'getReservationDetailMenuRows',
    'getReservationMailShop',
    'insertReservationMailLog',
    'sendMail_Common',
    'sendReservationCreatedNotificationMails',
];
foreach ($requiredFunctions as $requiredFunction) {
    if (function_exists($requiredFunction) === false) {
        reservationApiLog('function_missing', ['function' => $requiredFunction]);
        reservationApiRespondError('INTERNAL_ERROR');
    }
}
if (
    isset($GLOBALS['DB_CONNECT']) === false ||
    is_object($GLOBALS['DB_CONNECT']) === false ||
    method_exists($GLOBALS['DB_CONNECT'], 'inTransaction') === false
) {
    reservationApiLog('database_connection_invalid');
    reservationApiRespondError('INTERNAL_ERROR');
}

$registrationResult = reservationApiExecuteRegistration($requestData);
if (($registrationResult['success'] ?? false) !== true) {
    reservationApiRespondError((string)($registrationResult['error_code'] ?? 'INTERNAL_ERROR'));
}

$availabilityWriter = $cmsConfigRoot . '/common/workJson/makeReservationJson.php';
if (is_file($availabilityWriter) === false || is_readable($availabilityWriter) === false) {
    reservationApiLog('availability_export_dependency_missing');
} else {
    try {
        require_once $availabilityWriter;
        if (retryReservationAvailabilityDayJson($requestData['shop_id'], $requestData['date']) !== true) {
            $queued = queueReservationAvailabilityJsonFailure($requestData['shop_id'], 'day', $requestData['date']);
            reservationApiLog('availability_export_failed', ['queued' => $queued ? 1 : 0]);
        }
    } catch (Throwable $e) {
        reservationApiLog('availability_export_exception', ['exception' => get_class($e)]);
    }
}

try {
    if (sendReservationCreatedNotificationMails(
        $requestData['shop_id'],
        $registrationResult['reservation_id']
    ) !== true) {
        reservationApiLog('reservation_mail_processing_incomplete');
    }
} catch (Throwable $e) {
    reservationApiLog('reservation_mail_processing_exception', ['exception' => get_class($e)]);
}

reservationApiRespond(200, [
    'success' => true,
    'reservationId' => $registrationResult['reservation_id'],
]);
