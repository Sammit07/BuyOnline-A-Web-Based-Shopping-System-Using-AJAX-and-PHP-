<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Path to the goods.xml file
$xmlFile = '../../data/goods.xml';

// Check if the file exists
if (file_exists($xmlFile)) {
    // Load the XML file
    $xml = simplexml_load_file($xmlFile);

    // Check if XML was successfully loaded
    if ($xml === false) {
        echo "<tr><td colspan='6'>Error: Failed to load goods.xml.</td></tr>";
        exit;
    }

    // Initialize a variable to track if any items are displayed
    $hasItemsToDisplay = false;

    // Loop through each item in the XML and display those with non-zero sold quantities
    foreach ($xml->item as $item) {
        if ((int)$item->quantity_sold > 0) {
            // Flag that there are items to display
            $hasItemsToDisplay = true;

            // Display the item in an HTML table row, with proper escaping for HTML
            echo "<tr>
                    <td>" . htmlspecialchars($item->item_number) . "</td>
                    <td>" . htmlspecialchars($item->name) . "</td>
                    <td>\$" . htmlspecialchars($item->price) . "</td>
                    <td>" . htmlspecialchars($item->quantity_available) . "</td>
                    <td>" . htmlspecialchars($item->quantity_on_hold) . "</td>
                    <td>" . htmlspecialchars($item->quantity_sold) . "</td>
                  </tr>";
        }
    }

    // If no items with sold quantities, display a message
    if (!$hasItemsToDisplay) {
        echo "<tr><td colspan='6'>No items with sold quantities to process.</td></tr>";
    }
} else {
    // File not found error message
    echo "<tr><td colspan='6'>Error: goods.xml file not found.</td></tr>";
}
?>