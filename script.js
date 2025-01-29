document.addEventListener("DOMContentLoaded", function() {

  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
   
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

  
    let valid = true;

   
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";


    if (!validateEmail(email)) {
      document.getElementById("emailError").textContent = "Email is invalid";
      valid = false;
    }

    
    if (password.length < 6) {
      document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
      valid = false;
    }

   
    if (valid) {
      alert("Login successful!"); 
    
    }
  });


  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
});
