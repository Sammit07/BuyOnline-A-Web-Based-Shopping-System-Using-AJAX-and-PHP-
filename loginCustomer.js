// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Function to handle customer login using XMLHttpRequest
function loginCustomer() {
    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Get the email and password values from the form
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMsg = document.getElementById('errorMsg'); // Error message container

    // Clear any previous error messages
    errorMsg.innerHTML = '';

    // Prepare the data to be sent in the request (POST parameters)
    var params = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);

    // Open a POST request to the login PHP script
    xhr.open("POST", "loginCustomer.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define the function that will be called when the server responds
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Check if the login was successful
            if (xhr.responseText === 'success') {
                // Redirect the customer to the buying page
                window.location.href = 'buying.htm';
            } else {
                // Display an error message if the login failed
                errorMsg.innerHTML = 'Invalid email or password.';
            }
        }
    };

    // Send the request with the email and password parameters
    xhr.send(params);

    // Prevent the form from submitting normally
    return false;
}