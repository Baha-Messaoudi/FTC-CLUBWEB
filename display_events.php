<?php
// Connexion à la base de données
$serverName = 'localhost';
$username = 'root';
$password = '';
$dbname = 'testdb';

$conn = mysqli_connect($serverName, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Récupérer les événements pour affichage
$select_event = mysqli_query($conn, "SELECT * FROM events ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event List</title>
    <link rel="stylesheet" href="display_event.css">
    <style>
  
    </style>
</head>
<body>
    <section class="events">
        <h1 class="title">Events</h1>
        <h2 class="title">Next Event</h2>
        <div class="parent">
            <div class="difinition">
                <div class="affichage">
            <?php
                if (mysqli_num_rows($select_event) > 0) {
                while ($fetch_event = mysqli_fetch_assoc($select_event)) {
                echo '<div class="event-card">';
                echo '<h3 >' . $fetch_event['nameevent'] . '</h3>';
                echo '<p>' . $fetch_event['description'] . '</p>';
                echo '<img src="images/' . $fetch_event['image'] . '" alt="' . $fetch_event['nameevent'] . '">';
                echo '</div>';
                }
    } else {
        echo '<p class="no-events">No events found.</p>';
    }
    ?>
                </div>
            </div>
        </div>
    </section>        


</div>

</body>
</html>

<?php
// Fermer la connexion à la base de données
mysqli_close($conn);
?>

