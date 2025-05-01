<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session

// Check if the customer is logged in
if (isset($_SESSION['customer_id'])) {
    $customer_id = $_SESSION['customer_id'];

    // Destroy the session to log out the customer
    session_destroy();  // Destroy the session, including customer_id

    // Return the customer ID to the client-side script for use in the logout page
    echo $customer_id;
} else {
    // If the customer is not logged in, redirect to the login page
    header("Location: login.htm");
    exit;
}
?>