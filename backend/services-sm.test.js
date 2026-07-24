const {
  createService,
  updateService,
  listServices,
  estimateWaitTime,
  clearServices,
} = require("./services-sm");

beforeEach(() => {
  clearServices();
});

describe("createService", () => {

  test("should create a service successfully", () => {
    const result = createService("General Checkup", "Routine medical checkup", 10, "medium");
    expect(result.success).toBe(true);
    expect(result.service.name).toBe("General Checkup");
    expect(result.service.priority).toBe("medium");
  });

  test("should fail if name is empty", () => {
    const result = createService("", "some description", 10, "low");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Service name is required :|.");
  });

  test("should fail if name exceeds 100 characters", () => {
    const longName = "a".repeat(101);
    const result = createService(longName, "some description", 10, "low");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Service name must be under 100 characters please.");
  });

  test("should fail if description is empty", () => {
    const result = createService("Lab Work", "", 10, "high");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Description is required.");
  });

  test("should fail if duration is missing", () => {
    const result = createService("Pharmacy Pickup", "Prescription pickup", "", "low");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Expected duration is required.");
  });

  test("should fail if duration is not a positive number", () => {
    const result = createService("Pharmacy Pickup", "Prescription pickup", -5, "low");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Expected duration must be a positive (+) number.");
  });

  test("should fail if priority is invalid", () => {
    const result = createService("X-Ray Imaging", "Diagnostic imaging", 20, "urgent");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Priority must be low, medium, or high.");
  });

  test("should assign incrementing ids to services", () => {
    const first = createService("Service A", "desc", 5, "low");
    const second = createService("Service B", "desc", 5, "low");
    expect(first.service.id).toBe(1);
    expect(second.service.id).toBe(2);
  });

});

describe("updateService", () => {

  beforeEach(() => {
    createService("General Checkup", "Routine medical checkup", 10, "medium");
  });

  test("should update an existing service", () => {
    const result = updateService(1, "General Checkup", "Updated description", 15, "high");
    expect(result.success).toBe(true);
    expect(result.service.description).toBe("Updated description");
    expect(result.service.duration).toBe(15);
    expect(result.service.priority).toBe("high");
  });

  test("should fail if service id does not exist", () => {
    const result = updateService(999, "Ghost Service", "desc", 10, "low");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Service not found.");
  });

  test("should fail validation when updating with invalid priority", () => {
    const result = updateService(1, "General Checkup", "desc", 10, "urgent");
    expect(result.success).toBe(false);
    expect(result.error).toBe("Priority must be low, medium, or high.");
  });

});

describe("listServices", () => {

  test("should return an empty list when no services exist", () => {
    const result = listServices();
    expect(result.success).toBe(true);
    expect(result.services.length).toBe(0);
  });

  test("should return all created services", () => {
    createService("Service A", "desc", 5, "low");
    createService("Service B", "desc", 5, "high");
    const result = listServices();
    expect(result.services.length).toBe(2);
  });

});

describe("estimateWaitTime", () => {

  test("should calculate wait time as position times duration", () => {
    const result = estimateWaitTime(3, 5);
    expect(result.success).toBe(true);
    expect(result.waitMinutes).toBe(15);
  });

  test("should return 0 minutes when position is 0", () => {
    const result = estimateWaitTime(0, 5);
    expect(result.success).toBe(true);
    expect(result.waitMinutes).toBe(0);
  });

  test("should fail if position is negative", () => {
    const result = estimateWaitTime(-1, 5);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Position must be a non-negative number.");
  });

  test("should fail if duration is not positive", () => {
    const result = estimateWaitTime(3, 0);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Duration must be a positive number.");
  });
});
