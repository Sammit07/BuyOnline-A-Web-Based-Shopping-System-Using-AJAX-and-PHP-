// Name: Sammit Rajaram Raut
// Student ID: 104691259

// Function to fetch items for processing
window.onload = function() {
    loadProcessingItems();
};

function loadProcessingItems() {
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a GET request to the PHP file that returns the items
    xhr.open("GET", "displayItemsForProcessing.php", true);

    // Set the response type as text
    xhr.responseType = 'text';

    // Define the onload event to handle the response
    xhr.onload = function() {
        if (xhr.status == 200) {
            // Clear existing rows in the processing table before appending new ones
            clearProcessingTable();

            // Update the processing table with the response data
            document.getElementById('processingTableBody').innerHTML = xhr.responseText;  // Populate tbody only
        } else {
            alert("Error loading items for processing: " + xhr.status + " " + xhr.statusText);
        }
    };

    // Send the request to the server
    xhr.send();
}

// Function to process the items
function processItems() {
    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Open a POST request to the PHP file that processes the items
    xhr.open("POST", "processSoldItems.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Define the onload event to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Display the server response (e.g., number of processed items)
            alert(xhr.responseText);

            // Reload the items table after processing
            loadProcessingItems();
        }
    };

    // Send the request to the server
    xhr.send();
}

// Helper function to clear the processing table (keep the header row)
function clearProcessingTable() {
    var tableBody = document.getElementById('processingTableBody');

    // Remove all rows in the tbody
    tableBody.innerHTML = '';
}