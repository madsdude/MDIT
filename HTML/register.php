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
    $email = $_POST['email'];
    $telefonnummer = $_POST['telefonnummer'];
    $fuldtNavn = $_POST['fuldtNavn'];

    $hashedPassword = password_hash($adgangskode, PASSWORD_DEFAULT);

    $sql = "INSERT INTO Users (Username, PasswordHash, Email, PhoneNumber, FullName)
            VALUES ('$brugernavn', '$hashedPassword', '$email', '$telefonnummer', '$fuldtNavn')";

    if ($conn->query($sql) === TRUE) {
        echo "Bruger oprettet succesfuldt!";
    } else {
        echo "Fejl ved oprettelse af bruger: " . $conn->error;
    }
}

$conn->close();
?>
