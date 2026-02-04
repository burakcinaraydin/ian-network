<?php
// Kimlik Doğrulama ve Session Yönetimi
require_once 'config.php';
require_once 'db.php';

// Session başlat
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Kullanıcı giriş kontrolü
function is_logged_in() {
    return isset($_SESSION['user_id']) && isset($_SESSION['username']);
}

// Giriş zorunluluğu kontrolü
function require_login() {
    if (!is_logged_in()) {
        header('Location: index.php');
        exit();
    }
}

// Rol kontrolü
function check_role($allowed_roles) {
    if (!is_logged_in()) {
        return false;
    }

    if (is_array($allowed_roles)) {
        return in_array($_SESSION['role'], $allowed_roles);
    }

    return $_SESSION['role'] === $allowed_roles;
}

// Giriş yapma
function login($conn, $username, $password) {
    $sql = "SELECT id, username, password, full_name, email, country, role, is_active
            FROM users WHERE username = ? LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        return false;
    }

    $user = $result->fetch_assoc();

    // Aktif kullanıcı kontrolü
    if (!$user['is_active']) {
        return false;
    }

    // Şifre kontrolü
    if (password_verify($password, $user['password'])) {
        // Session değişkenlerini ayarla
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['full_name'] = $user['full_name'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['country'] = $user['country'];
        $_SESSION['role'] = $user['role'];

        // Son giriş zamanını güncelle
        $update_sql = "UPDATE users SET last_login = NOW() WHERE id = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("i", $user['id']);
        $update_stmt->execute();

        // Giriş logunu kaydet
        log_activity($conn, $user['id'], 'giris', null, null, "Kullanıcı sisteme giriş yaptı");

        return true;
    }

    return false;
}

// Çıkış yapma
function logout($conn) {
    if (is_logged_in()) {
        log_activity($conn, $_SESSION['user_id'], 'cikis', null, null, "Kullanıcı sistemden çıkış yaptı");
    }

    session_unset();
    session_destroy();
    header('Location: index.php');
    exit();
}

// CSRF token oluştur
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// CSRF token kontrolü
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// XSS koruması
function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}
?>
