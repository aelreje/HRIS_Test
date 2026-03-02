<?php
// api/test_db.php
header('Content-Type: application/json');

// Use absolute path to avoid "No such file or directory" errors
$db_file = __DIR__ . '/config/db.php';

if (!file_exists($db_file)) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Critical file missing: config/db.php",
        "expected_path" => $db_file,
        "current_directory" => __DIR__,
        "files_in_current_dir" => scandir(__DIR__) // This helps us see what was uploaded
    ]);
    exit;
}

require_once $db_file;

try {
    $stmt = $pdo->query("SELECT 1");
    echo json_encode([
        "status" => "success",
        "message" => "Database connection is working!",
        "database" => $db_name,
        "host" => $host,
        "tables" => $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN)
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage(),
        "database" => $db_name,
        "host" => $host,
        "user" => $username
    ]);
}
?>