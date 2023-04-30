<?php
    $bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

    $id = $_GET['id'];

    $sql = "DELETE FROM bs_user WHERE user_id = $id";
    $bdd->query($sql);

    $bdd->close();

    header("Location: index.php");
    exit();
?>