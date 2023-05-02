<?php
$bdd = new mysqli("localhost", "root", "", "burger_sup");

$user_id = $_POST['user_id'];
$month = $_POST['month'];
$year = $_POST['year'];

// Requête pour récupérer les valeurs pour l'année précisée et calculer leur somme
$sql = "SELECT SUM(value) AS total_value FROM bs_data WHERE user_id = $user_id AND YEAR(date) = $year";
$result = $bdd->query($sql);
$row = $result->fetch_assoc();
$total_year_value = $row['total_value'];

// Requête pour récupérer les valeurs pour le mois précisé
$sql = "SELECT date, SUM(value) AS total_value FROM bs_data WHERE user_id = $user_id AND YEAR(date) = $year AND MONTH(date) = $month GROUP BY date";
$result = $bdd->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = ['date' => $row['date'], 'value' => $row['total_value']];
}

$bdd->close();

// Ajouter la somme des valeurs de l'année au tableau de données
$data[] = ['total_year_value' => $total_year_value];

// Retourner les valeurs en JSON
echo json_encode($data);
?>