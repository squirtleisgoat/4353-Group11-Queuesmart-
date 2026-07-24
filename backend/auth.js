// ---- IN-MEMORY USER STORAGE ----
const users = [];

// ---- REGISTER FUNCTION ----
function registerUser(email, password, role) {

  if (!email || email.trim() === "") {
    return { success: false, error: "Email is required." };
  }

  if (!email.includes("@") || !email.includes(".")) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (email.length > 100) {
    return { success: false, error: "Email must be under 100 characters." };
  }

  if (!password || password.trim() === "") {
    return { success: false, error: "Password is required." };
  }

  if (password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters." };
  }

  if (!role || (role !== "user" && role !== "admin")) {
    return { success: false, error: "Role must be user or admin." };
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, error: "Email is already registered." };
  }

  const newUser = { email, password, role };
  users.push(newUser);

  return { success: true, message: "Registration successful.", user: { email, role } };
}

// ---- LOGIN FUNCTION ----
function loginUser(email, password) {

  if (!email || email.trim() === "") {
    return { success: false, error: "Email is required." };
  }

  if (!password || password.trim() === "") {
    return { success: false, error: "Password is required." };
  }

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  return { success: true, message: "Login successful.", user: { email: user.email, role: user.role } };
}

// ---- CLEAR USERS (for testing only) ----
function clearUsers() {
  users.length = 0;
}

module.exports = { registerUser, loginUser, clearUsers };