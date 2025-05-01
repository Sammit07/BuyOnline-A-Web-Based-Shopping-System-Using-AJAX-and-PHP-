<?php
// Name: Sammit Rajaram Raut
// Student ID: 104691259

session_start();  // Start the session

// Path to the goods.xml file
$xmlFile = '../../data/goods.xml';

// Check if the customer is logged in
if (isset($_SESSION['customer_id'])) {

    // Handle add to cart and remove from cart actions
    if (isset($_POST['itemNumber']) && isset($_POST['action'])) {
        $itemNumber = $_POST['itemNumber'];
        $action = $_POST['action'];

        // Load the goods.xml file
        if (file_exists($xmlFile)) {
            $xml = simplexml_load_file($xmlFile);

            foreach ($xml->item as $item) {
                if ((string)$item->item_number === $itemNumber) {
                    if ($action == "addToCart") {
                        // Check if quantity available is greater than 0
                        if ((int)$item->quantity_available > 0) {
                            $item->quantity_available = (int)$item->quantity_available - 1;
                            $item->quantity_on_hold = (int)$item->quantity_on_hold + 1;
                        } else {
                            echo "Error: Sorry, this item is not available for sale.";
                            exit;
                        }
                    } elseif ($action == "removeFromCart") {
                        // Revert quantity on hold and available
                        if ((int)$item->quantity_on_hold > 0) {
                            $item->quantity_available = (int)$item->quantity_available + 1;
                            $item->quantity_on_hold = (int)$item->quantity_on_hold - 1;
                        }
                    }
                    break;
                }
            }

            // Save the updated XML
            $xml->asXML($xmlFile);
        }
    }

    // Confirm purchase action
    if (isset($_POST['cart'])) {
        $cart = json_decode($_POST['cart'], true);

        if (empty($cart)) {
            echo "Error: Your cart is empty.";
            exit;
        }

        // Load goods.xml file again
        $xml = simplexml_load_file($xmlFile);
        $totalAmount = 0;

        foreach ($cart as $cartItem) {
            $itemNumber = $cartItem['itemNumber'];
            $quantity = $cartItem['quantity'];
            $price = $cartItem['price'];

            foreach ($xml->item as $item) {
                if ((string)$item->item_number === $itemNumber) {
                    if ((int)$item->quantity_on_hold >= $quantity) {
                        $item->quantity_on_hold = (int)$item->quantity_on_hold - $quantity;
                        $item->quantity_sold = (int)$item->quantity_sold + $quantity;
                        $totalAmount += $price * $quantity;
                    } else {
                        echo "Error: Insufficient stock on hold for item " . htmlspecialchars($itemNumber) . ".";
                        exit;
                    }
                    break;
                }
            }
        }

        // Save the updated XML file
        if ($xml->asXML($xmlFile)) {
            echo "Your purchase has been confirmed. Total amount due is $" . number_format($totalAmount, 2);
        } else {
            echo "Error: Unable to save updates to the goods.xml file.";
        }
    }
}
?>