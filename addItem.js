// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Function to handle item addition using XMLHttpRequest
function addItem() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Get form inputs
    var itemName = document.getElementById('item_name').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;
    var description = document.getElementById('description').value;

    // Reference to the success and error message containers
    var successMsg = document.getElementById('successMsg');
    var errorMsg = document.getElementById('errorMsg');

    // Clear previous messages
    successMsg.innerHTML = '';
    errorMsg.innerHTML = '';

    // Prepare the request parameters for the POST request
    var params = 'item_name=' + encodeURIComponent(itemName) + '&price=' + price + '&quantity=' + quantity + '&description=' + encodeURIComponent(description);

    // Open the request to send the form data to the server
    xhr.open("POST", "addItem.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define what should happen when the server responds
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // If the server responds with a success message, show it
            if (xhr.responseText.indexOf('error') === -1) {
                successMsg.innerHTML = xhr.responseText;
            } else {
                errorMsg.innerHTML = xhr.responseText;  // Show error message on failure
            }
        }
    };

    // Send the request with the form data
    xhr.send(params);

    // Prevent the form from submitting normally
    return false;
}