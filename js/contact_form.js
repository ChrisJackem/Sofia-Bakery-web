// open calendar when date input is focused
/* const dateInput = document.getElementById('date');
if (dateInput) {
    dateInput.addEventListener('focus', () => {
        dateInput.showPicker?.();
    });
} */

function resetForm() {
    let allValidation = document.querySelectorAll('.validation-text');
    allValidation.forEach(element => element.textContent = "");

    let allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(element => {
        element.classList.remove('invalid');
        element.value = "";
    });
}

// Validation Helper
// sets messages for a specific field and marks it as invalid if there are errors
// Also sets focus on the input field if there are validation errors
// * Make sure to validate from bottom up to focus on top invalid field
function setValidationMessage(fieldId, messages ) {
    const validationElement = document.getElementById(`${fieldId}-validation`);
    const inputElement = document.getElementById(fieldId);
    if (!validationElement){
        console.warn(`Validation element for field "${fieldId}" not found.`);
        return;
    };
    if (messages.length > 0) {
        validationElement.textContent = messages.join("\n");
        inputElement.classList.add('invalid');
        inputElement.focus();
    } else {
        validationElement.textContent = "";
        inputElement.classList.remove('invalid');
    }
}

function validateForm(event) {
    event.preventDefault();
    // Add form validation and submission logic here
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const item = document.getElementById('item').value.trim();
    const date = document.getElementById('date').value.trim();
    const requestType = document.getElementById('request-type').value.trim();
    let date_errors = [];
    let item_errors = [];
    let message_errors = [];
    let email_errors = [];
    let name_errors = [];

    if (!date && requestType === 'preorder'){
        date_errors.push("Please select a pickup date.");
    }
    setValidationMessage('date', date_errors);

    // Only check item if we have a pre-order (CAN inquire about item, but MUST pre-order one)
    if (requestType === 'preorder' && item.length < 3){
        item_errors.push("Item must be at least 3 characters long.");
    }
    setValidationMessage('item', item_errors);

    // Only check message if the request type is inquiry
    if (message.length < 10 && requestType === 'inquiry'){
        message_errors.push("Message must be at least 10 characters long.");
    }
    setValidationMessage('message', message_errors);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        email_errors.push("Please enter a valid email address.");
    }
    setValidationMessage('email', email_errors);

    if (name.length < 3){
        name_errors.push("Name must be at least 3 characters long.");
    }
    setValidationMessage('name', name_errors);

    // Check if there are any errors before submitting the form
    if (name_errors.length === 0 && 
        email_errors.length === 0 && 
        message_errors.length === 0 && 
        item_errors.length === 0 && 
        date_errors.length === 0
    ) {
        // Submit the form
        //document.getElementById('contact-form').submit();
        alert("Form submitted successfully!");
        resetForm();
    }
}

// Listeners

document.querySelector('button[type="reset"]').addEventListener('click', resetForm);
document.querySelector('#contact-form').addEventListener('submit', validateForm);

// Toggle date picker visibility based on request type selection
var selectedRequestElement = document.getElementById('request-type');
var datePickerContainer = document.querySelector('#date-container');
selectedRequestElement.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected == 'inquiry'){
        datePickerContainer.classList.add('hidden');
    }else{
        datePickerContainer.classList.remove('hidden');
    }
});

