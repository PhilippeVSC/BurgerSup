<?php
$bdd = new mysqli("localhost", "root", "", "burger_sup");

// Vérifiez la connexion
if ($bdd->connect_error) {
    echo("La connexion a échoué: " . $bdd->connect_error);
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BurgerSup</title>
    <link rel="stylesheet" type="text/css" href="style.css"> 
</head>
<body>
    <header>
        <nav>
            <section class="top-part">
                <a href="https://www.philippevivesc.fr/">
                    <img src="src/img/logo.svg" class="pvc-logo" draggable="false">
                </a>
                <h1>BURGERSUP</h1>
                <img src="src/img/icon/setting.svg" class="settings" draggable="false">
            </section>
            <section class="bottom-part">
                <div class="page-selection">
                    <div class="calendar-select selected" onclick="switchSelected()">
                        <img src="src/img/icon/calendar.svg" class="calendar-icon" draggable="false">
                        <h2>Calendrier</h2>
                    </div>
                    <div class="users-select" onclick="switchSelected()">
                        <img src="src/img/icon/users.svg" class="users-icon" draggable="false">
                        <h2>Utilisateurs</h2>
                    </div>
                </div>
                <div class="profil-gestion">
                    <form class="user-create" method="POST" action="add_user.php">
                        <label for="user-creation">Entrez votre prénom :</label>
                        <input class="user-creation" type="text" placeholder="Créer un profil" name="user-creation">
                        <button type="submit">
                            <img src="src/img/icon/plus.svg">
                        </button>
                    </form>
                    <div class="user-select">
                        <label for="dropdown">Sélectionne ton nom:</label>
                        <select id="dropdown" name="dropdown">
                            <option value="" disabled selected hidden>Sélectionner</option>
                            <?php
                                // Connexion à la base de données
                                $bdd = new mysqli("localhost", "root", "", "burger_sup");
                                
                                // Récupération des utilisateurs depuis la base de données
                                $sql = "SELECT * FROM bs_user";
                                $result = $bdd->query($sql);

                                // Génération des options du menu déroulant
                                while ($row = $result->fetch_assoc()) {
                                    echo '<option value="' . htmlspecialchars($row['user_id']) . '">' . htmlspecialchars($row['user_name']) . '</option>';
                                }

                                // Fermeture de la connexion à la base de données
                                $bdd->close();
                            ?>
                        </select>
                    </div>
                </div>                      
            </section>
        </nav>
    </header>
    <main>
        <!-- Calendar Main Page -->
        <div class="calendar-page">
            <section class="left-part">
                <div class="date">
                    <img src="src/img/icon/pin.svg" draggable="false">
                    <p class="date-selector">Lundi 12 février</p>
                </div>
                <div class="hours-input-container">
                    <label for="hours-input">Entre le nombre d'heures</label>
                    <input class="hours-input" type="text" placeholder="Nombre d'heures" name="hours-input">
                    <button id="submit-button" type="submit">
                        <img src="src/img/icon/check.svg" draggable="false">
                    </button>
                </div>
                <div class="recap-container">
                    <table>
                        <tr>
                        <th><img src="src/img/icon/burgersup-icon.svg" alt="BurgerSup Icon" draggable="false"></th>
                        <th>Récapitulatif</th>
                        </tr>
                        <tr>
                        <td class="scoreboard-day">Lundi</td>
                        <td class="scoreboard-day-value">148h</td>
                        </tr>
                        <tr>
                        <td class="scoreboard-month">Février</td>
                        <td class="scoreboard-month-value">148h</td>
                        </tr>
                        <tr>
                        <td class="scoreboard-year">2023</td>
                        <td class="scoreboard-year-value">148h</td>
                        </tr>
                    </table>                  
                </div>
            </section>
            <section class="calendar">
                <div class="month">
                    <button class="precedent-month-btn" onclick="changeMonth('precedent')">
                        <img src="src/img/icon/caret.svg" alt="previous month">
                    </button>
                    <p class="date_info">Avril 2023</p>
                    <button class="next-month-btn" onclick="changeMonth('next')">
                        <img src="src/img/icon/caret.svg" alt="next month">
                    </button>
                </div>
                <div class="calendar-container">
                    <div class="days">
                        <div>Lundi</div>
                        <div>Mardi</div>
                        <div>Mercredi</div>
                        <div>Jeudi</div>
                        <div>Vendredi</div>
                        <div>Samedi</div>
                        <div>Dimanche</div>
                    </div>
                    <div class="first-row">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                        <div>7</div>
                    </div>   
                    <div class="second-row">
                        <div>8</div>
                        <div>9</div>
                        <div>10</div>
                        <div>11</div>
                        <div>12</div>
                        <div>13</div>
                        <div>14</div>
                    </div>
                    <div class="third-row">
                        <div>15</div>
                        <div>16</div>
                        <div>17</div>
                        <div>18</div>
                        <div>19</div>
                        <div>20</div>
                        <div>21</div>
                    </div>
                    <div class="fourth-row">
                        <div>22</div>
                        <div>23</div>
                        <div>24</div>
                        <div>25</div>
                        <div>26</div>
                        <div>27</div>
                        <div>28</div>
                    </div>
                    <div class="thirth-row">
                        <div>29</div>
                        <div>30</div>
                        <div>31</div>
                        <div>32</div>
                        <div>33</div>
                        <div>34</div>
                        <div>35</div>
                    </div>
                    <div class="fifth-row">
                        <div>36</div>
                        <div>37</div>
                        <div>38</div>
                        <div>39</div>
                        <div>40</div>
                        <div>41</div>
                        <div>42</div>
                    </div>            
                </div>
            </section>
        </div>
        <!-- User List Page -->
        <div class="users-page">
            <table class="user-list">
                <tr>
                <th>Nom</th>
                <th>ID</th>
                <th>Action</th>
                </tr>
                <?php
                    $bdd = new mysqli("localhost", "root", "", "burger_sup");

                    // récupération des utilisateurs depuis la base de données
                    $sql = "SELECT * FROM bs_user";
                    $result = $bdd->query($sql);

                    // génération de la table HTML
                    while ($row = $result->fetch_assoc()) {
                    echo '<tr>';
                    echo '<td>' . htmlspecialchars($row['user_name']) . '</td>';
                    echo '<td>' . htmlspecialchars($row['user_id']) . '</td>';
                    echo '<td><a href="delete_user.php?id=' . $row['user_id'] . '">Supprimer</a></td>';
                    echo '</tr>';
                    }
                    echo '</table>';

                    $bdd->close();
                ?>
            </table>
        </div>
    </main>
    <script src="script.js"></script>
</body>
</html>