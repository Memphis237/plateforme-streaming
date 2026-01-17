<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Répondre à la requête OPTIONS
    http_response_code(200);
    exit();
}

require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\KEY;

//récupération du header autorisation
$headers = getallheaders();
$auth = $headers["Authorization"] ?? "";
if(!str_starts_with($auth, "Bearer")){
    http_response_code(401);
    echo json_encode(["error" => "token manquants"]);
    exit();
}else{
    $token = str_replace('Bearer', "", $auth);
    //decodage du token
    try{
        $decoded = JWT::decode($token, new KEY("SUPER_SECRET_KEY", "HS256"));
    }catch(Exception $e){
        http_response_code(401);
        echo json_encode(["error" => "token invalide"]);
        exit();
    }
}

?>