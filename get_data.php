<?php
// Connexion à la bdd
$bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

// Récupération des données de la table bs_user
$sql = "SELECT * FROM bs_user";
$result = $bdd->query($sql);

$bs_user = array();
while ($row = $result->fetch_assoc()) {
  $bs_user[] = $row;
}

// Récupération des données de la table bs_data
$sql = "SELECT * FROM bs_data";
$result = $bdd->query($sql);

$bs_data = array();
while ($row = $result->fetch_assoc()) {
  $bs_data[] = $row;
}

// Fusion des deux tableaux dans un tableau associatif
$table_data = array(
  "bs_user" => $bs_user,
  "bs_data" => $bs_data
);

// Encodage du tableau associatif en JSON et envoi de la réponse au client
echo json_encode($table_data);
?>
