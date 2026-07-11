const currentQueue = document.getElementById("currentQueue");

function loadCurrentQueue() {
    const queueData = localStorage.getItem("currentQueue");

    if (queueData === null) {
        return;
    }

    const queue = JSON.parse(queueData);

    currentQueue.innerHTML = `
        <div class="active-queue">
            <h3>${queue.service}</h3>

            <p>
                Position:
                <strong>${queue.position}</strong>
            </p>

            <p>
                Estimated wait:
                <strong>${queue.waitTime} minutes</strong>
            </p>

            <a class="dashboard-button" href="queue-status.html">
                View Queue Status
            </a>
        </div>
    `;
}

loadCurrentQueue();
