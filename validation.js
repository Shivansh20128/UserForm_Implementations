function isValidowner_Email(owner_email) {
    // Regular expression for a basic owner_email validation
    const owner_emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  
    // Test the owner_email against the regex
    return owner_emailRegex.test(owner_email);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("userForm");
  
      const validateFormName = () => {
          const form_nameField = document.getElementById("form_name");
          const form_nameError = document.getElementById("form_name-error");
  
          // Reset previous error messages
          form_nameError.textContent = "";
  
          // Validate Name
          if (!form_nameField.value.trim()) {
              form_nameError.textContent = "Form Name is required!";
              form_nameField.style.border = "1px solid red";
          } else {
              form_nameField.style.border = "1px solid green";
          }
      };
  
      const validateowner_Email = () => {
          const owner_emailField = document.getElementById("owner_email");
          const owner_emailError = document.getElementById("owner_email-error");
  
          // Reset previous error messages
          owner_emailError.textContent = "";
  
          // Validate Age
          const owner_email = owner_emailField.value.trim();
          if(owner_email.length==0){
              owner_emailError.textContent = "owner_Email ID is required!";
              owner_emailField.style.border = "1px solid red";
          }
          else if (!isValidowner_Email(owner_email)) {
              owner_emailError.textContent = "Please enter a valid owner_email";
              owner_emailField.style.border = "1px solid red";
          } else {
              owner_emailField.style.border = "1px solid green";
          }
      };
  
  
      const validateQuestions = () => {
          const no_of_questionsField = document.getElementById("no_of_questions");
          const no_of_questionsError = document.getElementById("no_of_questions-error");
  
          // Reset previous error messages
          no_of_questionsError.textContent = "";
          const numberRegex = /^(0*[1-9]|1[0-9]|20)$/;
          // Validate Weight
          const no_of_questions = parseInt(no_of_questionsField.value);
          if (!numberRegex.test(no_of_questions)) {
              no_of_questionsError.textContent = "Please enter a valid number of employees";
              no_of_questionsField.style.border = "1px solid red";
          } else {
              no_of_questionsField.style.border = "1px solid green";
          }
      };
  
      // Add live validation on input
      form.addEventListener("input", function (event) {
          if (event.target.id === "form_name") {
              validateFormName();
          } else if (event.target.id === "owner_email") {
              validateowner_Email();
          } else if (event.target.id === "no_of_questions") {
              validateQuestions();
          }
      });
  
      // Add final validation on form submission
      form.addEventListener("submit", function (event) {
          validateFormName();
          validateowner_Email();
          validateQuestions();
          // Check if there are any error messages
          const errorMessages = form.querySelectorAll(".error-message");
          for (const errorMessage of errorMessages) {
              if (errorMessage.textContent !== "") {
                  event.preventDefault();
                  return;
              }
          }
          const formData = new FormData(form);
  
      // Send data to the Google Apps Script
      window.alert("hello ji");
      
      fetch(form.action, {
          method: "POST",
          body: formData,
        })
        
          .then((response) => response.text())
          .then((message) => {
              
              
            if (message.trim() === 'Form submitted successfully!') {
                // Redirect to another HTML page
                // window.alert("heloo hello");
                window.alert("hello shivansh before");
                window.location.href = "public/form_creation.html;";
                window.alert("hello shivansh after");
            } else {
              // Display an error message
              alert(message);
            }
          })
          .catch((error) => {
            console.error("Error submitting form:", error);
            window.alert("An error occurred while submitting the form.");
          });
      });
  });
  