<?php
// Connexion à la bdd
$bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

// récupération des données envoyées depuis le JavaScript
$user_name = $_POST['user_name'];
$user_id = $_POST['user_id'];
$action = $_POST['action'];

// traitement de l'action correspondante
if ($action == 'add') {
  // insertion des données dans la table bs_user
  $sql = "INSERT INTO bs_user (user_name, user_id) VALUES ('$user_name', '$user_id')";
  $result = $bdd->query($sql);
} else if ($action == 'delete') {
  // suppression des données de la table bs_user
  $sql = "DELETE FROM bs_user WHERE user_id = '$user_id'";
  $result = $bdd->query($sql);
} else {
  // action non reconnue
  echo 'Action non reconnue.';
}

// redirection vers index.php
header("Location: index.php");
exit;
?>
