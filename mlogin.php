<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session to store the manager's session data

// Path to the manager.txt file
$managerFile = '../../data/manager.txt';

if (isset($_POST['manager_id']) && isset($_POST['password'])) {
    $managerId = $_POST['manager_id'];
    $password = $_POST['password'];

    // Read the manager.txt file and check each line
    $lines = file($managerFile, FILE_IGNORE_NEW_LINES);

    foreach ($lines as $line) {
        // Split the line into manager ID and password
        list($storedManagerId, $storedPassword) = explode(',', $line);

        // Trim extra spaces
        $storedManagerId = trim($storedManagerId);
        $storedPassword = trim($storedPassword);

        // Check if the provided manager ID and password match
        if ($storedManagerId === $managerId && $storedPassword === $password) {
            $_SESSION['manager_id'] = $managerId;  // Store the manager ID in the session
            echo 'success';
            exit;
        }
    }

    // If the login fails, return a failure message
    echo 'failure';
}
?>