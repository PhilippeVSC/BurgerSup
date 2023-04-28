<?php
$servername = "philipsadmin.mysql.db";
$username = "philipsadmin";
$password = "89wAxT8q5K";
$dbname = "philipsadmin";

// Connexion à la bdd
$bdd = new mysqli($servername, $username, $password, $dbname);

// Vérifiez la connexion
if ($bdd->connect_error) {
    echo("La connexion a échoué: " . $bdd->connect_error);
}

$tables = array("bs_user", "bs_data");

// Exécutez la requête pour vérifier si les tables existent
foreach ($tables as $table) {
    $result = $bdd->query("SELECT 1 FROM $table LIMIT 1");
    if ($result === FALSE) {
        echo "La table $table n'existe pas.<br>";
    } else {
        echo "La table $table existe.<br>";
    }
}
