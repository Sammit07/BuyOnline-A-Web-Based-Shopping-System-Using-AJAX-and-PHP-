// Name: Sammit Rajaram Raut
// Student ID: 104691259

var xhr = false;
if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

// Function to validate form inputs
function validateForm() {
    var firstName = document.getElementById('first_name').value;
    var lastName = document.getElementById('last_name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm_password').value;
    var phone = document.getElementById('phone').value;
    var errorMessage = "";

    // Check for empty fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !phone) {
        errorMessage += "All fields must be filled. ";
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage += "Passwords do not match. ";
    }

    // Check phone number format
    var phoneRegex = /^0\d{1} \d{8}$|^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        errorMessage += "Phone number must be in 0d dddddddd or 0ddddddddd format. ";
    }

    // If there are any errors, display them and prevent form submission
    if (errorMessage !== "") {
        document.getElementById('msg').innerText = errorMessage;
        return false;  // Prevent form submission
    }

    // If all checks pass, proceed to send the data to the server
    submitForm(firstName, lastName, email, password, phone);
    return false;  // Prevent default form submission
}

// Function to submit form data to the server via AJAX
function submitForm(firstName, lastName, email, password, phone) {
    xhr.open("GET", "testRegister.php?first_name=" + firstName + "&last_name=" + lastName + "&email=" + encodeURIComponent(email) + "&password=" + password + "&phone=" + phone, true);
    xhr.onreadystatechange = handleServerResponse;
    xhr.send(null);
}

// Function to handle server response
function handleServerResponse() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        document.getElementById('msg').innerHTML = xhr.responseText;
    }
}