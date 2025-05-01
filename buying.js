// Name: Sammit Rajaram Raut
// Student ID: 104691259

var catalog = [];  // Array to store catalog items
var cart = [];  // Array to store cart items

// Function to load available items from the server periodically
function loadCatalog() {
    var xhr = new XMLHttpRequest();

    // Open a GET request to the PHP script that retrieves the catalog
    xhr.open("GET", "getCatalog.php", true);

    // Function to handle the server's response
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Update the catalog table with the server's response
            document.getElementById('catalogTable').innerHTML = xhr.responseText;
        }
    };

    // Send the request
    xhr.send(null);
}

// Function to add an item to the shopping cart
function addToCart(itemNumber, price) {
    var xhr = new XMLHttpRequest();

    // Check availability and update the XML for quantity available and quantity on hold
    xhr.open("POST", "confirmPurchase.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            if (response.includes("Error")) {
                alert("Sorry, this item is not available for sale.");  // Show error if stock is unavailable
            } else {
                // Check if the item is already in the cart
                var itemInCart = cart.find(item => item.itemNumber === itemNumber);

                if (itemInCart) {
                    // If the item is already in the cart, increase the quantity
                    itemInCart.quantity += 1;
                } else {
                    // Otherwise, add the item to the cart with quantity 1
                    cart.push({ itemNumber: itemNumber, price: price, quantity: 1 });
                }

                // Update the cart display
                updateCart();
            }
        }
    };

    // Send the itemNumber and action to the PHP script to update the XML
    xhr.send("itemNumber=" + itemNumber + "&action=addToCart");
}

// Function to remove an item from the shopping cart
function removeFromCart(itemNumber) {
    var xhr = new XMLHttpRequest();

    // Open the request to handle removing an item from the cart
    xhr.open("POST", "confirmPurchase.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = xhr.responseText;
            if (response.includes("Error")) {
                alert("There was an error processing your request.");  // Show error if any
            } else {
                // Find the item in the cart
                var itemInCart = cart.find(item => item.itemNumber === itemNumber);

                if (itemInCart) {
                    // If the quantity is greater than 1, reduce the quantity
                    if (itemInCart.quantity > 1) {
                        itemInCart.quantity -= 1;
                    } else {
                        // If the quantity is 1, remove the item from the cart completely
                        cart = cart.filter(item => item.itemNumber !== itemNumber);
                    }

                    // Update the cart display after making the changes
                    updateCart();
                }
            }
        }
    };

    // Send the request to update the XML with the action to remove from the cart
    xhr.send("itemNumber=" + itemNumber + "&action=removeFromCart");
}

// Function to update the cart display
function updateCart() {
    var cartTable = document.getElementById('cartTable');
    var totalPrice = 0;

    // Reset the cart table
    cartTable.innerHTML = `
        <tr>
            <th>Item Number</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Remove</th>
        </tr>
    `;

    // Loop through each item in the cart and add it to the table
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        // Add a row for each cart item
        cartTable.innerHTML += `
            <tr>
                <td>${item.itemNumber}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td><button onclick="removeFromCart('${item.itemNumber}')">Remove</button></td>
            </tr>
        `;
    });

    // Update the total price display
    document.getElementById('totalPrice').innerText = totalPrice.toFixed(2);
}

// Function to confirm the purchase
function confirmPurchase() {
    var xhr = new XMLHttpRequest();

    // Open a POST request to confirm the purchase
    xhr.open("POST", "confirmPurchase.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Send the cart data to the server as a JSON string
    var params = "cart=" + JSON.stringify(cart);
    xhr.send(params);

    // Function to handle the server's response
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);

            // Clear the cart and update the display
            cart = [];
            updateCart();
            loadCatalog();  // Reload the catalog to reflect the updated stock
        }
    };
}

// Function to cancel the purchase and clear the cart
function cancelPurchase() {
    var xhr = new XMLHttpRequest();

    // Send a request to update the XML and revert quantities (cancel the purchase)
    xhr.open("POST", "cancelPurchase.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Send the cart data with the action to cancel
    xhr.send("cart=" + JSON.stringify(cart) + "&action=cancelPurchase");

    // Function to handle the server's response
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Your purchase request has been cancelled. Welcome to shop next time.");

            // Clear the cart
            cart = [];
            updateCart();  // Update the cart display
            loadCatalog();  // Reload the catalog to show available items again
        }
    };
}

// Load the catalog every 2 seconds (AJAX polling)
setInterval(loadCatalog, 2000);

// Load the catalog immediately when the page loads
loadCatalog();