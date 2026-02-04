<?php
// I.A.N. - International Archaeology Network
// Veritabanı ve Sistem Konfigürasyonu

// Veritabanı Ayarları
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ian_network');

// Session Ayarları
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 0); // HTTPS kullanıyorsanız 1 yapın

// Zaman Ayarları
date_default_timezone_set('Europe/Istanbul');

// Hata Raporlama (Canlı sistemde kapatılmalı)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Dosya Yükleme Ayarları
define('UPLOAD_DIR', __DIR__ . '/../uploads/');
define('MAX_FILE_SIZE', 5242880); // 5 MB

// Güvenlik Ayarları
define('HASH_COST', 10);

// Rol Tanımlamaları
define('ROLE_ARKEOLOG', 'arkeolog');
define('ROLE_POLIS', 'polis');
define('ROLE_MUZE', 'muze_yetkilisi');

// Bölge Durumları
define('ZONE_GREEN', 'yesil');
define('ZONE_BLUE', 'mavi');
define('ZONE_YELLOW', 'sari');
define('ZONE_RED', 'kirmizi');

// Bölge Renkleri (CSS)
$zone_colors = [
    'yesil' => '#28a745',
    'mavi' => '#007bff',
    'sari' => '#ffc107',
    'kirmizi' => '#dc3545'
];

// Bölge İsimleri
$zone_names = [
    'yesil' => 'Yeşil (Normal)',
    'mavi' => 'Mavi (UNESCO)',
    'sari' => 'Sarı (Risk)',
    'kirmizi' => 'Kırmızı (Acil)'
];

// Alert Tipleri
$alert_types = [
    'savas' => 'Savaş',
    'yagma' => 'Yağma',
    'kacak_kazi' => 'Kaçak Kazı',
    'dogal_afet' => 'Doğal Afet',
    'risk' => 'Risk',
    'diger' => 'Diğer'
];

// Alan Tipleri
$site_types = [
    'kazi' => 'Kazı Alanı',
    'muze' => 'Müze',
    'koruma_alani' => 'Koruma Alanı'
];

// Roller
$roles = [
    'arkeolog' => 'Arkeolog',
    'polis' => 'Polis/Jandarma',
    'muze_yetkilisi' => 'Müze Yetkilisi'
];
?>
