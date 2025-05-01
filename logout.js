// Name: Sammit Rajaram Raut
// Student ID: 104691259

// logout.js

// Function to load the manager ID using XMLHttpRequest
function loadManagerId() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "getManagerId.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("managerId").innerText = xhr.responseText;
        }
    };

    // Send the request to the server
    xhr.send();
}

// Function to handle manager logout
function handleManagerLogout() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "logoutManager.php", true);  // Assumes there's a PHP file to handle manager session destruction

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Redirect to the logout page after the logout process is successful
            window.location.href = "logout.htm";
        }
    };

    // Send the logout request to the server
    xhr.send();
}

// Call the function when the page loads to load the manager ID
window.onload = loadManagerId;
