<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Répondre à la requête OPTIONS
    http_response_code(200);
    exit();
}

require '../config/db.php';
header("Content-Type : application/json");
require 'middleware.php';

$stmt = $pdo ->prepare("SELECT * FROM users WHERE id = ?");
$stmt ->execute([$decoded -> id]);
$user = $stmt ->fetch(PDO::FETCH_ASSOC);

echo json_encode($user);

?>