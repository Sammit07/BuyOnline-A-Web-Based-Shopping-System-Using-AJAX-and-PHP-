<?php  
// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Path to the goods.xml file
$xmlFile = '../../data/goods.xml';

// Check if the file exists
if (file_exists($xmlFile)) {
    // Load the XML file
    $xml = simplexml_load_file($xmlFile);
    if ($xml === false) {
        die("Error: Cannot load goods.xml");
    }

    // Counter for processed items
    $processedCount = 0;

    // Loop through items in reverse order to avoid indexing issues when unsetting items
    for ($index = count($xml->item) - 1; $index >= 0; $index--) {
        $item = $xml->item[$index];
        
        if ((int)$item->quantity_sold > 0) {
            // Process the sold item by resetting quantity_sold
            $item->quantity_sold = 0;
            $processedCount++;
        }

        // Check if the item should be removed from the catalog (quantity_available and quantity_on_hold are both 0)
        if ((int)$item->quantity_available === 0 && (int)$item->quantity_on_hold === 0) {
            unset($xml->item[$index]);  // Remove the item from the XML
        }
    }

    // Save the updated XML file
    if ($xml->asXML($xmlFile)) {
        echo "Processed $processedCount items successfully.";
    } else {
        echo "Error: Unable to save updates to the goods.xml file.";
    }
} else {
    echo "Error: goods.xml file not found.";
}
?>