<?php
// Connexion à la bdd
$bdd = new mysqli("localhost", "root", "", "burger_sup");

// Vérifier la connexion
if ($bdd->connect_error) {
  die("Connexion échouée: " . $bdd->connect_error);
}

// Récupérer le nom entré dans le formulaire
$user_id = $_POST['user_id'];

// Formater la date
$date = date_create_from_format('d/m/Y', $_POST['date']);
$formatted_date = date_format($date, 'Y-m-d');

// Récupérer la valeur entrée dans le formulaire
$value = $_POST['value'];

if($value != 0) {
  // Vérifier si une ligne avec le même id et la même date existe déjà dans la base de données
  $sql_select = "SELECT * FROM bs_data WHERE user_id='$user_id' AND date='$formatted_date'";
  $result = mysqli_query($bdd, $sql_select);

  if (mysqli_num_rows($result) > 0) {
    // Une ligne avec le même id et la même date existe déjà, exécuter une requête UPDATE
    $sql_update = "UPDATE bs_data SET value='$value' WHERE user_id='$user_id' AND date='$formatted_date'";
    if (mysqli_query($bdd, $sql_update)) {
      echo "Les horaires ont été modifiés avec succès !";
    } else {
      echo "Erreur lors de la mise a jour des horaires: " . mysqli_error($bdd);
    }
  } else {
    // Aucune ligne avec le même id et la même date n'existe, exécuter une requête INSERT
    $sql_insert = "INSERT INTO bs_data (user_id, date, value) VALUES ('$user_id', '$formatted_date', '$value')";
    if (mysqli_query($bdd, $sql_insert)) {
      echo "Les horaires ont été ajoutés avec succès!";
    } else {
      echo "Erreur lors de l'ajout des horaires: " . mysqli_error($bdd);
    }
  }
} else {
  // Vérifier si une ligne avec le même id et la même date existe déjà dans la base de données
  $sql_select = "SELECT * FROM bs_data WHERE user_id='$user_id' AND date='$formatted_date'";
  $result = mysqli_query($bdd, $sql_select);

  if (mysqli_num_rows($result) > 0) {
    // Une ligne avec le même id et la même date existe déjà, exécuter une requête DELETE
    $sql_delete = "DELETE FROM bs_data WHERE user_id='$user_id' AND date='$formatted_date'";
    if (mysqli_query($bdd, $sql_delete)) {
      echo "La valeur a été supprimée avec succès!";
    } else {
      echo "Erreur lors de la suppression de la valeur: " . mysqli_error($bdd);
    }
  }
}

// Fermer la connexion
mysqli_close($bdd);

// Rediriger vers la page index.php
// header("Location: index.php");
exit();
?>
