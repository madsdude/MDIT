<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Forbindelse mislykkedes: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $brugernavn = $_POST['brugernavn'];
    $adgangskode = $_POST['adgangskode'];

    $sql = "SELECT * FROM Users WHERE Username='$brugernavn' AND PasswordHash='$adgangskode'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "Login succesfuld!";
    } else {
        echo "Forkert brugernavn eller adgangskode.";
    }
}

$conn->close();
?>
