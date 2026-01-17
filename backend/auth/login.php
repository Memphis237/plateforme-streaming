<?php
require '../config/db.php';
require '../vendor/autoload.php';
header("Content-Type: application/json");
use Firebase\JWT\JWT;

$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides"]);
    exit();
}

$user = trim(htmlspecialchars($data['user'])) ?? "";
$password = trim(htmlspecialchars($data['password'])) ?? "";

if(!$pdo){
    echo json_encode(["error" => "Impossible de se connecter à la base de données. veuillez contacter l'administrateur!"]);
}
if(empty($password) || empty($user)){
    http_response_code(400);
    echo json_encode(["error" => "veuillez remplir tous les champs!"]);
    exit();
}

try{
    //vérification de l'utilisateur
    $stmt = $pdo ->prepare("SELECT * FROM users WHERE username = :user");
    $stmt ->bindParam(":user", $user, PDO::PARAM_STR);
    $stmt ->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if(!$result || !password_verify($password, $result['password'])){
        http_response_code(422);
        echo json_encode(["error" => "Identifiants invalides!"]);
        exit();
    }else{
        //génération du JWT
        $playload = [
            "id" => $result['id'],
            "name" => $result['username'],
            "exp" => time() + 3600
        ];

        $jwt = JWT::encode($playload, "SUPER_SECRET_KEY_THAT_IS_LONG_ENOUGH_FOR_HS256", "HS256");
        echo json_encode(["token" =>$jwt, "message" => "connexion réussie"]);
    }
}catch(PDOException $e){
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de la connexion: " . $e->getMessage()]);
}

?>