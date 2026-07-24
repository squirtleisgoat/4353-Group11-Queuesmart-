const { registerUser, loginUser, clearUsers } = require("../auth");

beforeEach(() => {
  clearUsers();
});


// =============================
// REGISTER TESTS
// =============================

describe("registerUser", () => {

  test("should register a new user successfully", () => {
    const result = registerUser("john@email.com", "password123", "user");
    expect(result.success).toBe(true);
    expect(result.user.email).toBe("john@email.com");
    expect(result.user.role).toBe("user");
  });

  test("should fail if email is empty", () => {
    const result = registerUser("", "password123", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email is required.");
  });

  test("should fail if email format is invalid", () => {
    const result = registerUser("notanemail", "password123", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Please enter a valid email address.");
  });

  test("should fail if email exceeds 100 characters", () => {
    const longEmail = "a".repeat(95) + "@b.com";
    const result = registerUser(longEmail, "password123", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email must be under 100 characters.");
  });

  test("should fail if password is empty", () => {
    const result = registerUser("john@email.com", "", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Password is required.");
  });

  test("should fail if password is less than 6 characters", () => {
    const result = registerUser("john@email.com", "abc", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Password must be at least 6 characters.");
  });

  test("should fail if role is invalid", () => {
    const result = registerUser("john@email.com", "password123", "superuser");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Role must be user or admin.");
  });

  test("should fail if email is already registered", () => {
    registerUser("john@email.com", "password123", "user");
    const result = registerUser("john@email.com", "password456", "user");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email is already registered.");
  });

  test("should register an admin successfully", () => {
    const result = registerUser("admin@email.com", "password123", "admin");
    expect(result.success).toBe(true);
    expect(result.user.role).toBe("admin");
  });

});


// =============================
// LOGIN TESTS
// =============================

describe("loginUser", () => {

  beforeEach(() => {
    registerUser("john@email.com", "password123", "user");
  });

  test("should login successfully with correct credentials", () => {
    const result = loginUser("john@email.com", "password123");
    expect(result.success).toBe(true);
    expect(result.user.email).toBe("john@email.com");
    expect(result.user.role).toBe("user");
  });

  test("should fail if email is empty", () => {
    const result = loginUser("", "password123");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Email is required.");
  });

  test("should fail if password is empty", () => {
    const result = loginUser("john@email.com", "");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Password is required.");
  });

  test("should fail if password is incorrect", () => {
    const result = loginUser("john@email.com", "wrongpassword");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid email or password.");
  });

  test("should fail if email is not registered", () => {
    const result = loginUser("unknown@email.com", "password123");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Invalid email or password.");
  });

});