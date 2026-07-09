let position = 5;

const positionEl = document.getElementById("position");
const statusEl = document.getElementById("status");
const simulateBtn = document.getElementById("simulateBtn");

function getNotified(message) {
    const notify = document.createElement("div")
    notify.className = "notify";
    notify.textContent = message;
    document.body.appendChild(notify);
    setTimeout(function() {
        notify.remove();
    }, 4000);
}

simulateBtn.addEventListener("click", function() {
    if (position > 0) {
        position = position - 1;
        positionEl.textContent = position;
        if (position === 0) {
            statusEl.textContent = "Good to go!";
            getNotified("It's your turn!")
        } else if (position <= 2) {
            statusEl.textContent = "Not far away!";
            getNotified("Any second now!")
        }
    }
});