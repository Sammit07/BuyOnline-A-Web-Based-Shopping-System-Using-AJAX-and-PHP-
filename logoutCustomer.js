// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Assuming `cart` is a global variable or can be accessed to check the cart contents
var cart = [];  // This should be populated with the cart items in your actual code

// Function to handle the logout process
function handleLogout() {
    // Check if there are items in the cart
    if (cart.length > 0) {
        // If there are items in the cart, ask the user if they want to cancel the purchase
        var confirmCancel = confirm("You have items in your cart. Do you want to cancel your purchase before logging out?");
        
        // If the user confirms, cancel the purchase first
        if (confirmCancel) {
            cancelPurchaseBeforeLogout();
        } else {
            // If the user doesn't confirm, don't proceed with logout
            return;
        }
    } else {
        // If no items in the cart, proceed to log out directly
        logoutCustomer();
    }
}

// Function to cancel the purchase before logging out
function cancelPurchaseBeforeLogout() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "cancelPurchase.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Prepare the data to send
    var params = "action=cancelPurchase&cart=" + JSON.stringify(cart);

    // Handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // After the purchase is canceled, log out the customer
            logoutCustomer();
        }
    };

    // Send the cancel request to the server
    xhr.send(params);
}

// Function to log out the customer
function logoutCustomer() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "performLogout.php", true);  // This PHP file will handle logout and return the customer ID

    // Handle the response
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Redirect to logout confirmation page with the customer ID
            var customerId = xhr.responseText; // Get the customer ID from the server
            window.location.href = "logoutCustomer.htm?customer_id=" + customerId;
        }
    };

    // Send the logout request to the server
    xhr.send();
}