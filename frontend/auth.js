//Login Function
function handleLogin() {

  // grab what the user typed
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var errorBox = document.getElementById("error-message");

  errorBox.style.display = "none";
  errorBox.innerText = "";

  if (email === "") {
    errorBox.innerText = "Retry email.";
    errorBox.style.display = "block";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    errorBox.innerText = "Try a vaild email.";
    errorBox.style.display = "block";
    return;
  }

if (email.length > 100) {
    errorBox.innerText = "Email must be under 100 characters.";
    errorBox.style.display = "block";
    return;
  }

  if (password === "") {
    errorBox.innerText = "Retry password.";
    errorBox.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorBox.innerText = "Password must be at least 6 characters.";
    errorBox.style.display = "block";
    return;
  }

  alert("Login successful! Welcome to QueueSmart.");
}


//Register Function
function handleRegister() {

  // grab what the user typed
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var role = document.getElementById("role").value;
  var errorBox = document.getElementById("error-message");
  var successBox = document.getElementById("success-message");

  errorBox.style.display = "none";
  errorBox.innerText = "";
  successBox.style.display = "none";
  successBox.innerText = "";

  if (email === "") {
    errorBox.innerText = "Email is required.";
    errorBox.style.display = "block";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    errorBox.innerText = "Please enter a valid email address.";
    errorBox.style.display = "block";
    return;
  }

if (email.length > 100) {
    errorBox.innerText = "Email must be under 100 characters.";
    errorBox.style.display = "block";
    return;
  }

  if (password === "") {
    errorBox.innerText = "Password is required.";
    errorBox.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorBox.innerText = "Password must be at least 6 characters.";
    errorBox.style.display = "block";
    return;
  }

  if (role === "") {
    errorBox.innerText = "Please select a role.";
    errorBox.style.display = "block";
    return;
  }

  successBox.innerText = "Registration successful! You can now log in.";
  successBox.style.display = "block";
}