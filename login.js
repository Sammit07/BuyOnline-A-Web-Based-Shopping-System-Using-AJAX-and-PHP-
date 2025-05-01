// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Function to handle manager login using XMLHttpRequest
function loginManager() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Get form inputs
    var managerId = document.getElementById('manager_id').value;
    var password = document.getElementById('password').value;

    // Reference to the error message container
    var errorMsg = document.getElementById('errorMsg');

    // Clear any previous error messages
    errorMsg.innerHTML = '';

    // Prepare the request parameters for the POST request
    var params = 'manager_id=' + encodeURIComponent(managerId) + '&password=' + encodeURIComponent(password);

    // Open the request to send the form data to the server
    xhr.open("POST", "mlogin.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define what should happen when the server responds
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Check if login is successful
            if (xhr.responseText === 'success') {
                window.location.href = 'listing.htm';  // Redirect to the listing page on success
            } else {
                errorMsg.innerHTML = 'Invalid Manager ID or Password.';  // Show error message
            }
        }
    };

    // Send the request with the form data
    xhr.send(params);

    // Prevent the form from submitting normally
    return false;
}