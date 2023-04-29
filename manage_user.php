<?php

// Connexion à la bdd
$bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

// récupération des données envoyées depuis le JavaScript
$user_name = $_POST['user_name'];
$user_id = $_POST['user_id'];

// insertion des données dans la table bs_user
$sql = "INSERT INTO bs_user (user_name, user_id) VALUES ('$user_name', '$user_id')";
$result = $bdd->query($sql);