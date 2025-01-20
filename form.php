<?php
$serverName = 'localhost';
$username = 'root';
$password = '';
$dbname = 'testdb';

// Connexion à la base de données
$conn = mysqli_connect($serverName, $username, $password, $dbname);
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Vérifier si le formulaire a été soumis
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['data']) && isset($_POST['data']['btn']) && $_POST['data']['btn'] == 'SEND REGESTRATION') {
    $data = $_POST['data'];

    // Sanitize et récupérer les données du formulaire
    $nom = trim($data['nom']);
    $mail = trim($data['mail']);
    $phone = trim($data['phone']);
    $college = trim($data['college']);
    $skills = trim($data['skills']);
    $msg = trim($data['msg']);

    // Traiter les cases à cocher (option) : Si plusieurs options sont sélectionnées, elles seront combinées en une seule chaîne
    $interest = isset($data['option']) ? implode(', ', $data['option']) : ''; // Si aucune option n'est sélectionnée, cela sera vide

    // Requête préparée pour insérer les données dans la table 'contact'
    $query = "INSERT INTO contact (nom, mail, phone, college, skills, msg, interest) VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Préparer la requête
    if ($stmt = $conn->prepare($query)) {
        // Lier les paramètres à la requête
        $stmt->bind_param("sssssss", $nom, $mail, $phone, $college, $skills, $msg, $interest);

        // Exécuter la requête
        if ($stmt->execute()) {
            //echo "Form submission successful!";
            echo require ('reponse.html');
        } else {
            echo "Error: " . $stmt->error;
        }

        // Fermer la requête préparée
        $stmt->close();
    } else {
        echo "Error preparing statement: " . $conn->error;
    }
}

// Fermer la connexion à la base de données
mysqli_close($conn);
?>
