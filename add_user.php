<?php
// Connexion à la base de données
$bdd = new mysqli("localhost", "root", "", "burger_sup");

// Vérifier la connexion
if ($bdd->connect_error) {
  die("Connexion échouée: " . $bdd->connect_error);
}

// Récupérer le nom entré dans le formulaire
$user_name = $_POST['user-creation'];

if ($user_name == '') {
  header("Location: index.php");
  exit();
} else {
  // Vérifier si l'utilisateur existe déjà dans la base de données
  $stmt = $bdd->prepare("SELECT COUNT(*) AS count FROM bs_user WHERE user_name = ?");
  $stmt->bind_param("s", $user_name);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $count = $row['count'];

  if ($count > 0) {
    echo "Cet utilisateur existe déjà dans la base de données";
  } else {
    // Récupérer le dernier user_id de la table bs_user
    $result = mysqli_query($bdd, "SELECT MAX(user_id) as max_id FROM bs_user");
    $row = mysqli_fetch_assoc($result);
    $new_user_id = $row['max_id'] + 1;

    // Insérer les données dans la table bs_user
    $stmt = $bdd->prepare("INSERT INTO bs_user (user_name, user_id) VALUES (?, ?)");
    $stmt->bind_param("si", $user_name, $new_user_id);
    if ($stmt->execute()) {
      echo "Le nouvel utilisateur a été ajouté avec succès!";
    } else {
      echo "Erreur: " . $stmt->error;
    }
  }

  // Fermer la connexion
  $stmt->close();
  mysqli_close($bdd);

  // Rediriger vers la page index.php
  header("Location: index.php");
  exit();
}
?>
