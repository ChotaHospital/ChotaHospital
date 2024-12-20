<?php
session_start(); // Start the session
session_unset(); // Unset all session variables
session_destroy(); // Destroy the session

// Redirect to landing page
header("Location: http://localhost/hospitalmanagementsystem/LandingPage");
exit();
?>
