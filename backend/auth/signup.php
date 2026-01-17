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
$email = trim(htmlspecialchars($data['email'])) ?? "";
$password = trim(htmlspecialchars($data['password'])) ?? "";

if(!$pdo){
    echo json_encode(["error" => "Impossible de se connecter à la base de données. veuillez contacter l'administrateur!"]);
}
if(empty($email) || empty($password) || empty($user)){
    http_response_code(400);
    echo json_encode(["error" => "veuillez remplir tous les champs !"]);
    exit();
}elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    http_response_code(422);
    echo json_encode(["error" => "l'email est invalide"]);
    exit();
}elseif(strlen($password) < 8){
    http_response_code(422);
    echo json_encode(["error" => "le mot de passe doit contenir au moins 8 caractères!"]);
    exit();
}else{
    try{
        //vérifions si l'utilisateur existe déjà
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $pdo ->prepare($sql);
        $stmt ->bindParam(":email", $email, PDO::PARAM_STR);
        $stmt ->execute();
        $result = $stmt ->fetch(PDO::FETCH_ASSOC);

        if($result){
            echo json_encode(["error" => "cette utilisateur existe déjà!"]);
            exit();
        }else{
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo ->prepare("INSERT INTO users(username, email, password) VALUES(:user, :email, :password)");
            $stmt ->bindParam(":user", $user, PDO::PARAM_STR);
            $stmt ->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt ->bindParam(":password", $hash, PDO::PARAM_STR);
            $stmt ->execute();
        }

        //génération du JWT
        $playload = [
            "id" => $pdo ->lastInsertId(),
            "name" => $user,
            "email" => $email,
            "exp" => time() + 3600 //1heure avant expiration
        ];

        //encodage du JWT 
        $jwt = JWT::encode($playload, "SUPER_SECRET_KEY_THAT_IS_LONG_ENOUGH_FOR_HS256", "HS256");
            echo json_encode(["message" => "Utilisateur créer avec succès", "token" => $jwt]);
    }catch(PDOException $e){
        http_response_code(500);
        echo json_encode(["error" => "Erreur lors de l'inscription: " . $e->getMessage()]);
    }
}


?>