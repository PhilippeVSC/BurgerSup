<?php
    $bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

    $id = $_POST['user_id'];
    $day = $_POST['day'];
    $month = $_POST['month'];
    $year = $_POST['year'];

    // Requête pour récupérer la valeur pour le jour précisé
    $sql_day = "SELECT SUM(value) AS value_day FROM bs_data WHERE user_id = $id AND date = '$year-$month-$day'";
    $result_day = $bdd->query($sql_day);
    $row_day = $result_day->fetch_assoc();
    $value_day = $row_day['value_day'];

    // Requête pour récupérer la valeur pour le mois précisé
    $sql_month = "SELECT SUM(value) AS value_month FROM bs_data WHERE user_id = $id AND YEAR(date) = $year AND MONTH(date) = $month";
    $result_month = $bdd->query($sql_month);
    $row_month = $result_month->fetch_assoc();
    $value_month = $row_month['value_month'];

    // Requête pour récupérer la valeur pour l'année précisée
    $sql_year = "SELECT SUM(value) AS value_year FROM bs_data WHERE user_id = $id AND YEAR(date) = $year";
    $result_year = $bdd->query($sql_year);
    $row_year = $result_year->fetch_assoc();
    $value_year = $row_year['value_year'];

    // Vérifier si les valeurs sont nulles et les remplacer par 0
    $value_day = $value_day ?? 0;
    $value_month = $value_month ?? 0;
    $value_year = $value_year ?? 0;

    $bdd->close();

    // Retourner les valeurs en JSON
    echo json_encode(array('value_day' => $value_day, 'value_month' => $value_month, 'value_year' => $value_year));
?>
