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

// Ajouter un événement
if (isset($_POST['add_event'])) {
    $nameevent = $_POST['nameevent'];
    $description = $_POST['description'];
    $image = $_FILES['image']['name'];

    // Déplacer l'image téléchargée dans le dossier 'images'
    $target_dir = './images/';
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);  // Create the directory if it doesn't exist
}

// Check if the image is uploaded
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    // Get the image file name and target path
    $image = basename($_FILES['image']['name']);
    $target_file = $target_dir . $image;

    // Validate the image file (Optional but recommended: checking for allowed file types)
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    if (in_array($_FILES['image']['type'], $allowed_types)) {
        // Move the uploaded file to the target directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
            echo "Image uploaded successfully.";
        } else {
            echo "Failed to upload image.";
        }
    } else {
        echo "Invalid image file type. Only JPEG, PNG, and GIF are allowed.";
    }
} else {
    echo "No image uploaded or there was an error with the file upload.";
}

    // Requête SQL pour insérer l'événement
    $query = "INSERT INTO events (nameevent, description, image) VALUES ('$nameevent', '$description', '$image')";
    if (mysqli_query($conn, $query)) {
        echo "Event added successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Supprimer un événement
if (isset($_GET['delete_id'])) {
    $id = $_GET['delete_id'];
    $query = "DELETE FROM events WHERE id = $id";
    if (mysqli_query($conn, $query)) {
        echo "Event deleted successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Mettre à jour un événement
if (isset($_POST['update_event'])) {
    $id = $_POST['id'];
    $nameevent = $_POST['nameevent'];
    $description = $_POST['description'];
    $image = $_FILES['image']['name'];

    // Si une nouvelle image est téléchargée
    if (isset($image)) {
        // If an image was uploaded, update the event record with the image
        $query = "UPDATE events SET nameevent='$nameevent', description='$description', image='$image' WHERE id=$id";
    } else {
        // If no image was uploaded, update without the image field
        $query = "UPDATE events SET nameevent='$nameevent', description='$description' WHERE id=$id";
    }
    if (mysqli_query($conn, $query)) {
        echo "Event updated successfully!";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}

// Récupérer les événements pour affichage
$select_event = mysqli_query($conn, "SELECT * FROM events ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Management</title>
    <link rel="stylesheet" href="adminevents.css">
</head>
<body>
    <h1>Event Management</h1>
    
    <!-- Formulaire pour ajouter un événement -->
    <form action="" method="post" enctype="multipart/form-data">
        <h3>Add New Event</h3>
        <input type="text" name="nameevent" placeholder="Event Name" required><br>
        <textarea name="description" placeholder="Event Description" required rows="20"></textarea><br>
        <input  type="file" name="image" required><br>
        <input type="submit" name="add_event" value="Add Event">
    </form>

    <h3 class="all" >All Events</h3>
    <table border="1">
        <thead>
            <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Description</th>
                <th>Image</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if (mysqli_num_rows($select_event) > 0) {
                while ($fetch_event = mysqli_fetch_assoc($select_event)) {
                    echo "<tr>";
                    echo "<td>" . $fetch_event['id'] . "</td>";
                    echo "<td>" . $fetch_event['nameevent'] . "</td>";
                    echo "<td>" . $fetch_event['description'] . "</td>";
                    echo '<td><img src="images/' . $fetch_event['image'] . '" alt="'  . '" width="100px" ></td>';

                    
                    echo "<td>
                            <a href='?edit_id=" . $fetch_event['id'] . "'>Edit</a> |
                            <a href='?delete_id=" . $fetch_event['id'] . "'>Delete</a>
                        </td>";
                    echo "</tr>";
                }
            } else {
                echo "<tr><td colspan='5'>No events found</td></tr>";
            }
            ?>
        </tbody>
    </table>

    <!-- Formulaire pour mettre à jour un événement -->
    <?php
    if (isset($_GET['edit_id'])) {
        $edit_id = $_GET['edit_id'];
        $query = "SELECT * FROM events WHERE id = $edit_id";
        $result = mysqli_query($conn, $query);
        $event = mysqli_fetch_assoc($result);
    ?>
    <form action="" method="post" enctype="multipart/form-data">
        <h3>Edit Event</h3>
        <input type="hidden" name="id" value="<?php echo $event['id']; ?>">
        <input type="text" name="nameevent" value="<?php echo $event['nameevent']; ?>" required><br>
        <textarea name="description" required><?php echo $event['description']; ?></textarea><br>
        <input type="file" name="image"><br>
        <input type="submit" name="update_event" value="Update Event">
    </form>
    <?php
    }
    ?>
</body>
</html>

<?php
// Fermer la connexion à la base de données
mysqli_close($conn);
?>
