<?php
// Veritabanı Bağlantı Dosyası
require_once 'config.php';

// Veritabanı bağlantısı oluştur
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Bağlantı kontrolü
if ($conn->connect_error) {
    die("Veritabanı bağlantı hatası: " . $conn->connect_error);
}

// Karakter seti ayarla
$conn->set_charset("utf8mb4");

// Güvenli sorgu fonksiyonu
function safe_query($conn, $sql, $types = "", $params = []) {
    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        return false;
    }

    if (!empty($params)) {
        $stmt->bind_param($types, ...$params);
    }

    $stmt->execute();
    return $stmt;
}

// Log kaydetme fonksiyonu
function log_activity($conn, $user_id, $action_type, $table_name = null, $record_id = null, $description = null, $old_value = null, $new_value = null) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? null;

    $sql = "INSERT INTO activity_logs (user_id, action_type, table_name, record_id, old_value, new_value, description, ip_address)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ississss", $user_id, $action_type, $table_name, $record_id, $old_value, $new_value, $description, $ip);
    return $stmt->execute();
}

// Bildirim gönderme fonksiyonu
function send_alert_notification($conn, $alert_id, $site_id) {
    // İlgili alan sorumluları bul
    $sql = "SELECT DISTINCT user_id FROM site_responsibilities WHERE site_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $site_id);
    $stmt->execute();
    $result = $stmt->get_result();

    // Her sorumluya bildirim ekle
    while ($row = $result->fetch_assoc()) {
        $insert_sql = "INSERT INTO alert_notifications (alert_id, user_id) VALUES (?, ?)";
        $insert_stmt = $conn->prepare($insert_sql);
        $insert_stmt->bind_param("ii", $alert_id, $row['user_id']);
        $insert_stmt->execute();
    }

    return true;
}

// Bölge durumu değiştirme
function update_zone_status($conn, $site_id, $new_status, $user_id) {
    $sql = "UPDATE archaeological_sites SET zone_status = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $new_status, $site_id);

    if ($stmt->execute()) {
        log_activity($conn, $user_id, 'bolge_degistir', 'archaeological_sites', $site_id,
                     "Bölge durumu '$new_status' olarak değiştirildi");
        return true;
    }
    return false;
}
?>
