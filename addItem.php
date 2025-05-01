<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session

// Ensure the manager is logged in before adding an item
if (!isset($_SESSION['manager_id'])) {
    echo 'error: You must log in to add items.';
    exit;
}

// Path to the goods.xml file where items will be stored
$xmlFile = '../../data/goods.xml';

// Get form data
$itemName = $_POST['item_name'];
$price = $_POST['price'];
$quantityAvailable = $_POST['quantity'];
$description = $_POST['description'];

// Validate the input data
if (empty($itemName) || empty($price) || empty($quantityAvailable) || empty($description)) {
    echo 'error: All fields are required.';
    exit;
}

// Load or create the XML document to store items
if (!file_exists($xmlFile)) {
    $xml = new DOMDocument('1.0', 'UTF-8');
    $xml->formatOutput = true;
    $items = $xml->createElement('items');
    $xml->appendChild($items);
} else {
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    $items = $xml->documentElement;
}

// Generate a new item number
$newItemNumber = 'ITEM' . str_pad($items->childNodes->length + 1, 5, '0', STR_PAD_LEFT);

// Create a new item element
$newItem = $xml->createElement('item');

// Add the item details to the XML
$newItem->appendChild($xml->createElement('item_number', $newItemNumber));
$newItem->appendChild($xml->createElement('name', $itemName));
$newItem->appendChild($xml->createElement('price', $price));
$newItem->appendChild($xml->createElement('quantity_available', $quantityAvailable));
$newItem->appendChild($xml->createElement('description', $description));
$newItem->appendChild($xml->createElement('quantity_on_hold', 0));
$newItem->appendChild($xml->createElement('quantity_sold', 0));

// Append the new item to the items list
$items->appendChild($newItem);

// Save the XML document
$xml->save($xmlFile);

// Output success message with the new item number
echo "The item has been listed in the system, and the item number is: " . $newItemNumber;
?>