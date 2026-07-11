const joinButtons = document.querySelectorAll(".join-button");

const messageBox = document.getElementById("messageBox");

function joinQueue(event) {
    const button = event.target;

    const existingQueue = localStorage.getItem("currentQueue");

    if (existingQueue !== null) {
        messageBox.textContent =
            "You are already in a queue. Leave your current queue before joining another.";

        messageBox.className = "message-box error-message";

        return;
    }

    const service = button.dataset.service;

    const position = Number(button.dataset.position);

    const waitTime = Number(button.dataset.wait);

    const queueData = {
        service: service,
        position: position,
        waitTime: waitTime
    };

    localStorage.setItem(
        "currentQueue",
        JSON.stringify(queueData)
    );

    messageBox.textContent =
        "You successfully joined the " + service + " queue.";

    messageBox.className = "message-box success-message";

    button.textContent = "Queue Joined";

    button.disabled = true;

    setTimeout(function() {
        window.location.href = "queue-status.html";
    }, 1000);
}

for (let i = 0; i < joinButtons.length; i++) {
    joinButtons[i].addEventListener("click", joinQueue);
}
