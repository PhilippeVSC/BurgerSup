<?php
    $bdd = new mysqli("localhost", "root", "", "burger_sup");

    $user_id = $_POST['user_id'];
    $month = $_POST['month'];
    $year = $_POST['year'];

    // Requête pour récupérer les valeurs pour le mois précisé
    $sql = "SELECT date, SUM(value) AS total_value FROM bs_data WHERE user_id = $user_id AND YEAR(date) = $year AND MONTH(date) = $month GROUP BY date";
    $result = $bdd->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = ['date' => $row['date'], 'value' => $row['total_value']];
    }

    $bdd->close();

    // Retourner les valeurs en JSON
    echo json_encode($data);
?>