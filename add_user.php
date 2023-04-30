<?php
// Connexion à la bdd
$bdd = new mysqli("philipsadmin.mysql.db", "philipsadmin", "89wAxT8q5K", "philipsadmin");

// Vérifier la connexion
if ($bdd->connect_error) {
  die("Connexion échouée: " . $bdd->connect_error);
}

// Récupérer le nom entré dans le formulaire
$user_name = $_POST['user-creation'];

// Récupérer le dernier user_id de la table bs_user
$result = mysqli_query($bdd, "SELECT MAX(user_id) as max_id FROM bs_user");
$row = mysqli_fetch_assoc($result);
$new_user_id = $row['max_id'] + 1;

// Insérer les données dans la table bs_user
$sql = "INSERT INTO bs_user (user_name, user_id) VALUES ('$user_name', '$new_user_id')";
if (mysqli_query($bdd, $sql)) {
  echo "Le nouvel utilisateur a été ajouté avec succès!";
} else {
  echo "Erreur: " . $sql . "<br>" . mysqli_error($bdd);
}

// Fermer la connexion
mysqli_close($bdd);

// Rediriger vers la page index.php
header("Location: index.php");
exit();
?>
