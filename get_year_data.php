<?php
// Connexion à la base de données
$bdd = new mysqli("localhost", "root", "", "burger_sup");

// Vérifier la connexion
if ($bdd->connect_error) {
  die("Connexion échouée: " . $bdd->connect_error);
}

// Récupérer les paramètres de la requête
$user_id = $_POST['user_id'];
$year = $_POST['year'];

// Préparer la requête SQL
$sql = "SELECT SUM(value) AS total_value FROM bs_data WHERE user_id = 1 AND YEAR(date) = $year";

// Exécuter la requête SQL
$result = $bdd->query($sql);

// Vérifier si la requête a retourné des résultats
if ($result->num_rows > 0) {
  // Récupérer le résultat de la requête
  $row = $result->fetch_assoc();
  // Retourner la somme des valeurs
  echo $row["total_value"];
} else {
  echo "Aucun résultat trouvé.";
}
?>