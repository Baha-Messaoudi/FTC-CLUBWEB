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
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['data1']) && isset($_POST['data1']['send']) && $_POST['data1']['send'] == 'SEND MESSAGE') {
    $data1 = $_POST['data1'];
    
    // Nettoyage et sécurisation des données
    $firstname = trim($data1['firstname'] ?? '');
    $lastname = trim($data1['lastname'] ?? '');
    $email = trim($data1['adfressmail'] ?? '');
    $urmessage = trim($data1['urmessage'] ?? '');
    
        // Requête SQL avec des paramètres préparés
        $query = "INSERT INTO `contact-us` (firstname, lastname, adfressmail, urmessage) VALUES (?, ?, ?, ?)";
        
        if ($stmt = $conn->prepare($query)) {
            // Lier les paramètres à la requête préparée
            $stmt->bind_param("ssss", $firstname, $lastname, $email, $urmessage);
            
            // Exécuter la requête
            if ($stmt->execute()) {
                echo require'reponsecontact.html';
            } else {
                echo "Erreur lors de l'envoi du message : " . $stmt->error;
            }
            
            // Fermer la requête préparée
            $stmt->close();
        } else {
            echo "Erreur lors de la préparation de la requête : " . $conn->error;
        }
    }


// Fermer la connexion à la base de données
mysqli_close($conn);
?>
