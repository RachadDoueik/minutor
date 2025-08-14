<?php
if (file_exists(__DIR__ . '/public' . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) {
    return false; // serve the requested resource as-is
} else {
    require __DIR__ . '/public/index.php';
}
