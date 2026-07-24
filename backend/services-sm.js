const services = [];
let nextId = 1;
const VALID_PRIORITIES = ["low", "medium", "high"];

function createService(name, description, duration, priority) {
  if (!name || name.trim() === "") {
    return { success: false, error: "Service name is required :|." };
  }
  if (name.length > 100) {
    return { success: false, error: "Service name must be under 100 characters please." };
  }
  if (!description || description.trim() === "") {
    return { success: false, error: "Description is required." };
  }
  if (duration === undefined || duration === null || duration === "") {
    return { success: false, error: "Expected duration is required." };
  }
  if (typeof duration !== "number" || duration <= 0) {
    return { success: false, error: "Expected duration must be a positive (+) number." };
  }
  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return { success: false, error: "Priority must be low, medium, or high." };
  }

  const newService = {
    id: nextId,
    name,
    description,
    duration,
    priority,
  };
  services.push(newService);
  nextId = nextId + 1;

  return { success: true, message: "Service created.", service: newService };
}

function updateService(id, name, description, duration, priority) {
  const service = services.find(s => s.id === id);
  if (!service) {
    return { success: false, error: "Service not found." };
  }
  if (!name || name.trim() === "") {
    return { success: false, error: "Service name is required :|." };
  }
  if (name.length > 100) {
    return { success: false, error: "Service name must be under 100 characters please." };
  }
  if (!description || description.trim() === "") {
    return { success: false, error: "Description is required." };
  }
  if (duration === undefined || duration === null || duration === "") {
    return { success: false, error: "Expected duration is required." };
  }
  if (typeof duration !== "number" || duration <= 0) {
    return { success: false, error: "Expected duration must be a positive (+) number." };
  }
  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return { success: false, error: "Priority must be low, medium, or high." };
  }

  service.name = name;
  service.description = description;
  service.duration = duration;
  service.priority = priority;

  return { success: true, message: "Service updated.", service };
}

function listServices() {
  return { success: true, services };
}

function estimateWaitTime(position, duration) {
  if (typeof position !== "number" || position < 0) {
    return { success: false, error: "Position must be a non-negative number." };
  }
  if (typeof duration !== "number" || duration <= 0) {
    return { success: false, error: "Duration must be a positive number." };
  }

  const waitMinutes = position * duration;
  return { success: true, waitMinutes };
}

function clearServices() {
  services.length = 0;
  nextId = 1;
}

module.exports = {
  createService,
  updateService,
  listServices,
  estimateWaitTime,
  clearServices,
};
