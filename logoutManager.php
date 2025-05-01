<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session

// Check if the manager is logged in
if (isset($_SESSION['manager_id'])) {
    // Destroy the manager session
    session_destroy();

    // Return a response indicating successful logout
    echo "Manager logged out successfully.";
} else {
    // If no manager is logged in, return an error message
    echo "Error: No manager is currently logged in.";
}
?>