<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session to store customer data

// Path to the customer.xml file
$xmlFile = '../../data/customer.xml';

// Check if the email and password were submitted
if (isset($_POST['email']) && isset($_POST['password'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Load the customer.xml file if it exists
    if (file_exists($xmlFile)) {
        $xml = simplexml_load_file($xmlFile);

        // Loop through each customer in the XML file
        foreach ($xml->customer as $customer) {
            // Check if the email and password match
            if ($customer->email == $email && $customer->password == $password) {
                // Store the customer ID in the session
                $_SESSION['customer_id'] = (string) $customer->id;
                echo 'success';
                exit;
            }
        }
    }

    // If no match was found, return a failure message
    echo 'failure';
}
?>