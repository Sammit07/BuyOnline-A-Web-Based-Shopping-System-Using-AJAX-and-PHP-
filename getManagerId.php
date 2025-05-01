<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();
if (isset($_SESSION['manager_id'])) {
    echo $_SESSION['manager_id'];
} else {
    echo "Unknown";  // Fallback if session has expired
}
session_destroy();  // End the session after sending the manager ID
?>