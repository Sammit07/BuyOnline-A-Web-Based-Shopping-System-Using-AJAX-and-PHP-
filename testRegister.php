<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

// XML file location
$xmlfile = '../../data/customer.xml';

// Load or create the XML document
if (!file_exists($xmlfile)) {
    $xml = new DOMDocument('1.0', 'UTF-8');
    $xml->formatOutput = true;
    $customers = $xml->createElement('customers');
    $xml->appendChild($customers);
} else {
    $xml = new DOMDocument();
    $xml->load($xmlfile);
    $customers = $xml->documentElement;
}

// Get data from the GET request
$firstName = $_GET['first_name'];
$lastName = $_GET['last_name'];
$email = $_GET['email'];
$password = $_GET['password'];
$phone = $_GET['phone'];

// Check if email is unique
$isEmailUnique = true;
foreach ($xml->getElementsByTagName('customer') as $customer) {
    if ($customer->getElementsByTagName('email')->item(0)->nodeValue == $email) {
        $isEmailUnique = false;
        break;
    }
}

if ($isEmailUnique) {
    // Generate a new customer ID
    $newCustomerId = 'CUST' . str_pad($customers->childNodes->length + 1, 5, '0', STR_PAD_LEFT);

    // Create new customer element
    $newCustomer = $xml->createElement('customer');
    
    // Add child elements
    $id = $xml->createElement('id', $newCustomerId);
    $newCustomer->appendChild($id);

    $fname = $xml->createElement('first_name', $firstName);
    $newCustomer->appendChild($fname);

    $lname = $xml->createElement('last_name', $lastName);
    $newCustomer->appendChild($lname);

    $customerEmail = $xml->createElement('email', $email);
    $newCustomer->appendChild($customerEmail);

    $customerPassword = $xml->createElement('password', $password);
    $newCustomer->appendChild($customerPassword);

    $customerPhone = $xml->createElement('phone', $phone);
    $newCustomer->appendChild($customerPhone);

    // Append new customer to XML
    $customers->appendChild($newCustomer);
    
    // Save the updated XML file
    $xml->save($xmlfile);

    // Success message
    echo "<h1>Registration Successful!</h1>";
    echo "<p>Your customer ID is: $newCustomerId</p>";
} else {
    // Email already exists
    echo "<h1>Error</h1>";
    echo "<p>This email address is already registered.</p>";
}
?>