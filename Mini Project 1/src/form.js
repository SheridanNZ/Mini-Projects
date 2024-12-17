// Function to get cat ID from the URL
function getCatIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('catId');
}

document.addEventListener('DOMContentLoaded', function() {
    populateCatId();  // ensures catId is populated after the page loads
});


// Function to populate Cat ID into the form
function populateCatId() {
    const catIdField = document.getElementById('catIdField');
    const selectedCatId = getCatIdFromUrl();
    
    if (selectedCatId) {
        catIdField.value = selectedCatId; // Set catId into hidden field
        document.getElementById('displayCatId').value = selectedCatId; 
    }
}
// Show or hide additional cats section based on selection
additionalCatsSelect.addEventListener('change', function () {
    if (this.value === 'yes') {
        moreCatsSection.style.display = 'block'; // Show extra section
    } else {
        moreCatsSection.style.display = 'none'; // Hide extra section
    }
});

// Form submission logic
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop form submission for validation

    const requiredFields = form.querySelectorAll('[required]');
    let isFormValid = true;
    let firstInvalidField = null;

    // Check if all required fields are filled
    requiredFields.forEach((field) => {
        if (!field.value.trim()) {
            isFormValid = false;
            firstInvalidField = firstInvalidField || field; // Keep track of first invalid field to show user

            // Show invalid field
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    if (!isFormValid) {
        alert('Please fill in all required fields.');
        firstInvalidField.focus(); // Focus first invalid field
        return; // Stop submission
    }

    const formData = new FormData(form);
    const formDetails = {};
    formData.forEach((value, key) => {
        formDetails[key] = value;
    });

    console.log('Form Submitted:', formDetails);

    alert(
        'Congrats! You have successfully submitted your Cat Adoption form.\n' + // \n used to make it easier to read
        'We will be in touch shortly, once we have processed your request ' +
        'to discuss further and arrange a meet and greet.\n' +
        'If you have any queries, please contact us on: 123-456-789.\n\nThank you!'
    );
});
