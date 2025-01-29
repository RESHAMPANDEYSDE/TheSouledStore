document.addEventListener("DOMContentLoaded", function() {
  // Select the form element
  const loginForm = document.getElementById("loginForm");

  // Add event listener for form submit
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from being submitted traditionally

    // Get the input values
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Initialize a flag to check if the form is valid
    let valid = true;

    // Clear previous error messages
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";

    // Validate Email
    if (!validateEmail(email)) {
      document.getElementById("emailError").textContent = "Email is invalid";
      valid = false;
    }

    // Validate Password
    if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
      valid = false;
    }

    // If everything is valid, show a success message or proceed with login
    if (valid) {
      alert("Login successful!"); // You can replace this with actual login logic (e.g., API request)
      // Redirect to dashboard or homepage
      // window.location.href = "dashboard.html"; // Example redirect
    }
  });

  // Helper function to validate email
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
});
