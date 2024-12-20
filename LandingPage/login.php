<?php
// Database connection
$conn = mysqli_connect("localhost", "root", "", "HMS");
if (!$conn) {
    die("Failed to connect: " . mysqli_connect_error());
}

// Validate and fetch POST data
if (!empty($_POST['username']) && !empty($_POST['password'])) {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    
    // Query to check if username and password exist
    $stmt = $conn->prepare("SELECT * FROM login WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password); // "ss" means two strings

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // User found
        echo "Login successful! Redirecting...";
        header("Location: http://localhost/hospitalmanagementsystem/dashboard/dashboard.html");
        exit(); // Stop script execution after redirection
    } else {
        // Invalid credentials
        echo "Invalid username or password!";
    }
    
    $stmt->close();
} else {
    echo "Username or Password cannot be empty!";
}

mysqli_close($conn);
?>
