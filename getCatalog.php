<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Path to goods.xml file
$xmlFile = '../../data/goods.xml';

// Check if the file exists
if (file_exists($xmlFile)) {
    // Load the XML file
    $xml = simplexml_load_file($xmlFile);

    // Start the table rows with the column headers
    $response = '
        <tr>
            <th>Item Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Add</th>
        </tr>
    ';

    // Loop through each item and generate rows for the catalog
    foreach ($xml->item as $item) {
        if ((int)$item->quantity_available > 0) {
            $response .= "
                <tr>
                    <td>{$item->item_number}</td>
                    <td>{$item->name}</td>
                    <td>{$item->description}</td>
                    <td>\${$item->price}</td>
                    <td>{$item->quantity_available}</td>
                    <td><button onclick=\"addToCart('{$item->item_number}', {$item->price})\">Add one to cart</button></td>
                </tr>
            ";
        }
    }

    // Return the generated table rows
    echo $response;
} else {
    echo "Error: goods.xml file not found.";
}
?>