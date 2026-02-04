-- I.A.N. - International Archaeology Network Database Schema
-- Veritabanı Oluşturma
CREATE DATABASE IF NOT EXISTS ian_network CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ian_network;

-- Kullanıcılar Tablosu
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    country VARCHAR(100) NOT NULL,
    role ENUM('arkeolog', 'polis', 'muze_yetkilisi') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_country (country)
);

-- Arkeolojik Alanlar Tablosu
CREATE TABLE archaeological_sites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_name VARCHAR(300) NOT NULL,
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    site_type ENUM('kazi', 'muze', 'koruma_alani') NOT NULL,
    current_status TEXT,
    zone_status ENUM('yesil', 'mavi', 'sari', 'kirmizi') DEFAULT 'yesil',
    is_unesco BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_country (country),
    INDEX idx_zone_status (zone_status),
    INDEX idx_site_type (site_type)
);

-- Eserler Tablosu
CREATE TABLE artifacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artifact_name VARCHAR(300) NOT NULL,
    site_id INT,
    photo_path VARCHAR(500),
    current_location VARCHAR(300),
    last_seen_date DATE,
    museum_name VARCHAR(300),
    museum_country VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (site_id) REFERENCES archaeological_sites(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_museum (museum_name),
    INDEX idx_site (site_id)
);

-- Alan Güncellemeleri Tablosu (Aktif Kazılar İçin)
CREATE TABLE site_updates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_id INT NOT NULL,
    update_description TEXT NOT NULL,
    update_type ENUM('genel', 'kazi_ilerlemesi', 'eser_bulundu', 'guvenlik', 'diger') NOT NULL,
    photo_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (site_id) REFERENCES archaeological_sites(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    INDEX idx_site_date (site_id, created_at)
);

-- İhbar Sistemi Tablosu
CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_id INT NOT NULL,
    alert_type ENUM('savas', 'yagma', 'kacak_kazi', 'dogal_afet', 'risk', 'diger') NOT NULL,
    urgency_level ENUM('dusuk', 'orta', 'yuksek', 'kritik') NOT NULL,
    location_details VARCHAR(500),
    description TEXT NOT NULL,
    alert_status ENUM('aktif', 'inceleniyor', 'cozuldu', 'kapandi') DEFAULT 'aktif',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    created_by INT,
    resolved_by INT,
    FOREIGN KEY (site_id) REFERENCES archaeological_sites(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id),
    FOREIGN KEY (resolved_by) REFERENCES users(id),
    INDEX idx_site_status (site_id, alert_status),
    INDEX idx_urgency (urgency_level),
    INDEX idx_created_at (created_at)
);

-- İhbar Bildirimleri Tablosu (Kime Bildirim Gönderildi)
CREATE TABLE alert_notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alert_id INT NOT NULL,
    user_id INT NOT NULL,
    notified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    FOREIGN KEY (alert_id) REFERENCES alerts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_read (user_id, is_read)
);

-- Alan Sorumlulukları Tablosu (Her alan için önceden tanımlı sorumlular)
CREATE TABLE site_responsibilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    site_id INT NOT NULL,
    user_id INT NOT NULL,
    responsibility_type ENUM('ana_sorumlu', 'arkeolog', 'guvenlik', 'kultur_birimi') NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INT,
    FOREIGN KEY (site_id) REFERENCES archaeological_sites(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id),
    INDEX idx_site (site_id),
    INDEX idx_user (user_id),
    UNIQUE KEY unique_site_user_type (site_id, user_id, responsibility_type)
);

-- Aktivite Logları Tablosu (Tüm işlemlerin kaydı)
CREATE TABLE activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action_type ENUM('giris', 'cikis', 'alan_ekle', 'alan_guncelle', 'alan_sil', 'eser_ekle', 'eser_guncelle', 'eser_sil', 'ihbar_olustur', 'ihbar_guncelle', 'bolge_degistir', 'diger') NOT NULL,
    table_name VARCHAR(100),
    record_id INT,
    old_value TEXT,
    new_value TEXT,
    description TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_action (user_id, action_type),
    INDEX idx_created_at (created_at),
    INDEX idx_table_record (table_name, record_id)
);

-- Demo Kullanıcılar Ekleme (Şifre: password123)
INSERT INTO users (username, password, full_name, email, country, role) VALUES
('admin_tr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmet Yılmaz', 'ahmet@kulturbakanligi.gov.tr', 'Türkiye', 'arkeolog'),
('police_tr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mehmet Kaya', 'mehmet@emniyet.gov.tr', 'Türkiye', 'polis'),
('museum_it', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Giovanni Rossi', 'giovanni@beniculturali.it', 'İtalya', 'muze_yetkilisi'),
('archaeo_gr', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Maria Papadopoulos', 'maria@culture.gr', 'Yunanistan', 'arkeolog'),
('admin_eg', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ahmed Hassan', 'ahmed@antiquities.gov.eg', 'Mısır', 'arkeolog');

-- Demo Arkeolojik Alanlar
INSERT INTO archaeological_sites (site_name, country, latitude, longitude, site_type, current_status, zone_status, is_unesco) VALUES
('Göbekli Tepe', 'Türkiye', 37.2233, 38.9225, 'kazi', 'Aktif kazı çalışması devam ediyor', 'yesil', TRUE),
('Efes Antik Kenti', 'Türkiye', 37.9395, 27.3408, 'koruma_alani', 'Turizme açık, koruma altında', 'mavi', TRUE),
('Troia Antik Kenti', 'Türkiye', 39.9575, 26.2386, 'koruma_alani', 'Restorasyon çalışmaları sürüyor', 'yesil', TRUE),
('Pompeii', 'İtalya', 40.7505, 14.4897, 'koruma_alani', 'Güvenli, ziyarete açık', 'mavi', TRUE),
('Akropolis', 'Yunanistan', 37.9715, 23.7257, 'koruma_alani', 'Normal durum', 'mavi', TRUE),
('Giza Piramitleri', 'Mısır', 29.9792, 31.1342, 'koruma_alani', 'Güvenlik önlemleri artırıldı', 'sari', TRUE),
('Palmyra', 'Suriye', 34.5514, 38.2698, 'koruma_alani', 'Savaş bölgesi - erişim yok', 'kirmizi', TRUE);

-- Demo Eserler
INSERT INTO artifacts (artifact_name, site_id, current_location, last_seen_date, museum_name, museum_country, description) VALUES
('Artemis Heykeli Parçası', 2, 'Efes Müzesi', '2025-12-15', 'Efes Arkeoloji Müzesi', 'Türkiye', 'MS 2. yüzyıla ait mermer heykel parçası'),
('Roma Dönemi Sikke Koleksiyonu', 3, 'Çanakkale Müzesi', '2026-01-10', 'Çanakkale Arkeoloji Müzesi', 'Türkiye', '50 adet Roma sikkesi'),
('Fresk Parçası', 4, 'Napoli Müzesi', '2025-11-20', 'Napoli Arkeoloji Müzesi', 'İtalya', 'Pompeii villa duvar freski');

-- Demo İhbarlar
INSERT INTO alerts (site_id, alert_type, urgency_level, description, alert_status) VALUES
(7, 'savas', 'kritik', 'Bölgede aktif çatışma var. Alana erişim tamamen kapalı.', 'aktif'),
(6, 'risk', 'orta', 'Turistik bölgede güvenlik açığı tespit edildi.', 'inceleniyor');

-- Demo Alan Sorumlulukları
INSERT INTO site_responsibilities (site_id, user_id, responsibility_type, assigned_by) VALUES
(1, 1, 'ana_sorumlu', 1),
(2, 1, 'arkeolog', 1),
(3, 1, 'arkeolog', 1),
(1, 2, 'guvenlik', 1),
(2, 2, 'guvenlik', 1);
