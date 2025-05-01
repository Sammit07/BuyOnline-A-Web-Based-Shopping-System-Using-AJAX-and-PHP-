<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session

// Path to the goods.xml file
$xmlFile = '../../data/goods.xml';

// Check if the customer is logged in
if (isset($_SESSION['customer_id'])) {

    // Check if the cart and action are provided
    if (isset($_POST['cart']) && $_POST['action'] === 'cancelPurchase') {
        $cart = json_decode($_POST['cart'], true);

        // If the cart is empty, return an error message
        if (empty($cart)) {
            echo "Error: Your cart is empty.";
            exit;
        }

        // Load the goods.xml file
        if (file_exists($xmlFile)) {
            $xml = simplexml_load_file($xmlFile);
            if ($xml === false) {
                echo "Error: Failed to load goods.xml.";
                exit;
            }

            // Loop through the items in the cart
            foreach ($cart as $cartItem) {
                $itemNumber = $cartItem['itemNumber'];
                $quantity = $cartItem['quantity'];

                // Find the corresponding item in the XML
                foreach ($xml->item as $item) {
                    if ((string)$item->item_number === $itemNumber) {
                        // Revert the quantity on hold back to available
                        $item->quantity_available = (int)$item->quantity_available + $quantity;
                        $item->quantity_on_hold = (int)$item->quantity_on_hold - $quantity;
                        break;  // Break once the item is updated
                    }
                }
            }

            // Save the updated XML
            if ($xml->asXML($xmlFile)) {
                echo "Your purchase request has been cancelled.";
            } else {
                echo "Error: Unable to save updates to the goods.xml file.";
            }
        } else {
            echo "Error: goods.xml file not found.";
        }
    }
} else {
    echo "Error: You must be logged in to cancel your purchase.";
}
?>