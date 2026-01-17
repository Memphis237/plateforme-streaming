<?php

$host = 'localhost';
$dbname = 'plateforme_streaming';
$username = 'root';
$password = '';
$options = array(
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Active les exceptions sur erreurs SQL
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,// Mode de fetch par défaut
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"// Encodage UTF-8
);

try{
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, $options);
}catch(PDOException $e){
    echo 'DB conection error'.$e->getMessage();
}
?>