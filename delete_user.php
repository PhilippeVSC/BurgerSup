<?php
    $bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

    $id = $_GET['id'];

    // Supprimer l'utilisateur de la table bs_user
    $sql = "DELETE FROM bs_user WHERE user_id = $id";
    $bdd->query($sql);

    // Supprimer toutes les données de l'utilisateur supprimé de la table bs_data
    $sql = "DELETE FROM bs_data WHERE user_id = $id";
    $bdd->query($sql);

    $bdd->close();

    header("Location: index.php");
    exit();
?>