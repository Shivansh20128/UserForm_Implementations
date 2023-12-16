function isValidEmail(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regex
  return emailRegex.test(email);
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");

    const validateBusinessName = () => {
        const business_nameField = document.getElementById("business_name");
        const business_nameError = document.getElementById("business_name-error");

        // Reset previous error messages
        business_nameError.textContent = "";

        // Validate Name
        if (!business_nameField.value.trim()) {
            business_nameError.textContent = "Business Name is required!";
            business_nameField.style.border = "1px solid red";
        } else {
            business_nameField.style.border = "1px solid green";
        }
    };

    const validateEmail = () => {
        const emailField = document.getElementById("email");
        const emailError = document.getElementById("email-error");

        // Reset previous error messages
        emailError.textContent = "";

        // Validate Age
        const email = emailField.value.trim();
        if(email.length==0){
            emailError.textContent = "Email ID is required!";
            emailField.style.border = "1px solid red";
        }
        else if (!isValidEmail(email)) {
            emailError.textContent = "Please enter a valid email";
            emailField.style.border = "1px solid red";
        } else {
            emailField.style.border = "1px solid green";
        }
    };

    const validatePhone = () => {
        const phone_numberField = document.getElementById("phone_number");
        const phone_numberError = document.getElementById("phone_number-error");

        // Reset previous error messages
        phone_numberError.textContent = "";
        const phoneRegex = /^\d{10}$/;

        // Validate Weight
        const phone_number = phone_numberField.value.trim();
        if (phone_number.length==0) {
            phone_numberError.textContent = "Phone number is required!";
            phone_numberField.style.border = "1px solid red";
        }

        else if (!phoneRegex.test(phone_number)) {
            phone_numberError.textContent = "Please enter a valid phone number";
            phone_numberField.style.border = "1px solid red";
        } else {
            phone_numberField.style.border = "1px solid green";
        }
    };

    const validateEmployees = () => {
        const no_of_employeesField = document.getElementById("no_of_employees");
        const no_of_employeesError = document.getElementById("no_of_employees-error");

        // Reset previous error messages
        no_of_employeesError.textContent = "";
        const numberRegex = /^[1-9]\d{0,6}$/;
        // Validate Weight
        const no_of_employees = parseInt(no_of_employeesField.value);
        if (!numberRegex.test(no_of_employees)) {
            no_of_employeesError.textContent = "Please enter a valid number of employees";
            phone_numberField.style.border = "1px solid red";
        } else {
            phone_numberField.style.border = "1px solid green";
        }
    };

    const validateVaccineReceived = () => {
        const vaccine_recieved_boolField = document.getElementById("vaccine_recieved_bool");
        const vaccine_recieved_boolError = document.getElementById("vaccine_recieved_bool-error");

        // Reset previous error messages
        vaccine_recieved_boolError.textContent = "";

        // Validate Weight
//        const vaccine_recieved = vaccine_recieved_boolField.value;
        if (vaccine_recieved_boolField.value=="") {
            vaccine_recieved_boolError.textContent = "Please select an option";
            vaccine_recieved_boolField.style.border = "1px solid red";
        } else {
            vaccine_recieved_boolField.style.border = "1px solid green";
        }
    };

    const validateInventory = () => {
        const items_in_inventoryField = document.getElementById("items_in_inventory");
        const items_in_inventoryError = document.getElementById("items_in_inventory-error");

        // Reset previous error messages
        items_in_inventoryError.textContent = "";

        // Validate Weight
        const numberRegex = /^[1-9]\d{0,8}$/;
        const items = parseInt(items_in_inventoryField.value);
        if (!numberRegex.test(items)) {
            items_in_inventoryError.textContent = "Please enter a valid value";
            items_in_inventoryField.style.border = "1px solid red";
        } else {
            items_in_inventoryField.style.border = "1px solid green";
        }
    };

    const validateVaccinePref = () => {
        const vaccine_prefField = document.getElementById("vaccine_pref");
        const vaccine_prefError = document.getElementById("vaccine_pref-error");

        // Reset previous error messages
        vaccine_prefError.textContent = "";

        // Validate Weight
//        const vaccine = vaccine_prefField.value.trim();
        if (vaccine_prefField.value=="") {
            vaccine_prefError.textContent = "Please select an option";
            vaccine_prefField.style.border = "1px solid red";
        } else {
            vaccine_prefField.style.border = "1px solid green";
        }
    };

    const validateAccessibilityBool = () => {
        const accessibility_boolField = document.getElementById("accessibility_bool");
        const accessibility_boolError = document.getElementById("accessibility_bool-error");

        // Reset previous error messages
        accessibility_boolError.textContent = "";

        // Validate Weight
        const accessibility = accessibility_boolField.value.trim();
        if (accessibility_boolField.value=="") {
            accessibility_boolError.textContent = "Please select an option";
            accessibility_boolField.style.border = "1px solid red";
        } else {
            accessibility_boolField.style.border = "1px solid green";
        }
    };

    // Add live validation on input
    form.addEventListener("input", function (event) {
        if (event.target.id === "business_name") {
            validateBusinessName();
        } else if (event.target.id === "email") {
            validateEmail();
        } else if (event.target.id === "phone_number") {
            validatePhone();
        } else if (event.target.id === "no_of_employees") {
            validateEmployees();
        } else if (event.target.id === "vaccine_recieved_bool") {
            validateVaccineReceived();
        } else if (event.target.id === "items_in_inventory") {
            validateInventory();
        } else if (event.target.id === "vaccine_pref") {
            validateVaccinePref();
        } else if (event.target.id === "accessibility_bool") {
            validateAccessibilityBool();
        }
    });

    // Add final validation on form submission
    form.addEventListener("submit", function (event) {
        validateBusinessName();
        validateEmail();
        validatePhone();
        validateEmployees();
        validateVaccineReceived();
        validateInventory();
        validateVaccinePref();
        validateAccessibilityBool();
        // Check if there are any error messages
        const errorMessages = form.querySelectorAll(".error-message");
        for (const errorMessage of errorMessages) {
            if (errorMessage.textContent !== "") {
                event.preventDefault();
                return;
            }
        }
    });
});
