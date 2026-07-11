// Mock Data for Admin Screens
const mockServices = [
    { id: 'general', name: 'General Checkup', length: 12, isOpen: true },
    { id: 'financial', name: 'Financial Aid', length: 5, isOpen: false },
    { id: 'advising', name: 'Academic Advising', length: 0, isOpen: true }
];

let mockQueue = [
    { id: 1, name: 'Alex Johnson' },
    { id: 2, name: 'Sam Smith' },
    { id: 3, name: 'Taylor Doe' }
];

// --- Admin Dashboard Logic ---
function loadDashboard() {
    const dashboardBody = document.getElementById('dashboardBody');
    if (!dashboardBody) return;
    
    dashboardBody.innerHTML = '';
    mockServices.forEach((service, index) => {
        const row = document.createElement('tr');
        const statusText = service.isOpen ? "Open" : "Closed";
        const actionText = service.isOpen ? "Close Queue" : "Open Queue";
        
        row.innerHTML = `
            <td>${service.name}</td>
            <td>${service.length}</td>
            <td>${statusText}</td>
            <td>
                <button class="action-btn" onclick="toggleService(${index})">${actionText}</button>
            </td>
        `;
        dashboardBody.appendChild(row);
    });
}

function toggleService(index) {
    mockServices[index].isOpen = !mockServices[index].isOpen;
    loadDashboard(); 
}

// --- Service Management Logic ---
function handleServiceSubmit() {
    const name = document.getElementById('serviceName').value.trim();
    const desc = document.getElementById('serviceDesc').value.trim();
    const duration = document.getElementById('serviceDuration').value;
    const priority = document.getElementById('servicePriority').value;

    const errorBox = document.getElementById('service-error');
    const successBox = document.getElementById('service-success');

    errorBox.style.display = 'none';
    successBox.style.display = 'none';

    // Client-Side Validation Rules
    if (!name || name.length > 100) {
        errorBox.innerText = "Service Name is required and must be under 100 characters.";
        errorBox.style.display = 'block';
        return;
    }
    if (!desc) {
        errorBox.innerText = "Description is required.";
        errorBox.style.display = 'block';
        return;
    }
    if (!duration || duration <= 0) {
        errorBox.innerText = "Please enter a valid expected duration in minutes.";
        errorBox.style.display = 'block';
        return;
    }
    if (!priority) {
        errorBox.innerText = "Priority Level is required.";
        errorBox.style.display = 'block';
        return;
    }

    successBox.innerText = `Service "${name}" saved successfully!`;
    successBox.style.display = 'block';
    document.getElementById('serviceForm').reset();
}

// --- Queue Management Logic ---
function loadQueue() {
    const queueBody = document.getElementById('queueBody');
    if (!queueBody) return;
    
    queueBody.innerHTML = '';
    mockQueue.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>
                <button class="action-btn" onclick="moveUserUp(${index})" ${index === 0 ? 'disabled' : ''}>Up</button>
                <button class="action-btn" onclick="moveUserDown(${index})" ${index === mockQueue.length - 1 ? 'disabled' : ''}>Down</button>
                <button class="action-btn remove-btn" onclick="removeUser(${index})">Remove</button>
            </td>
        `;
        queueBody.appendChild(row);
    });
}

function serveNextUser() {
    if (mockQueue.length > 0) {
        const servedUser = mockQueue.shift();
        alert(`Served user: ${servedUser.name}`);
        loadQueue();
    } else {
        alert("The queue is currently empty.");
    }
}

function removeUser(index) {
    if (confirm("Are you sure you want to remove this user from the queue?")) {
        mockQueue.splice(index, 1);
        loadQueue();
    }
}

function moveUserUp(index) {
    if (index > 0) {
        const temp = mockQueue[index];
        mockQueue[index] = mockQueue[index - 1];
        mockQueue[index - 1] = temp;
        loadQueue();
    }
}

function moveUserDown(index) {
    if (index < mockQueue.length - 1) {
        const temp = mockQueue[index];
        mockQueue[index] = mockQueue[index + 1];
        mockQueue[index + 1] = temp;
        loadQueue();
    }
}

// Initialize on page load
window.onload = function() {
    loadDashboard();
    loadQueue();
};