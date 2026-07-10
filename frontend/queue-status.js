let position = 5;
let lastStatus = "waiting"; 

const positionEl = document.getElementById("position");
const statusEl = document.getElementById("status");
const waitTimeEl = document.getElementById("waitTime");
const simulateBtn = document.getElementById("simulateBtn");

function getNotified(message) {
    const oldNotify = document.querySelector(".notify");
    if (oldNotify) oldNotify.remove();
    
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
        waitTimeEl.textContent = "~" + (position * 5) + " min";

        if (position === 0) {
            statusEl.textContent = "Served";
            if (lastStatus !== "served") {
                getNotified("It's your turn!");
                lastStatus = "served";
            }
        } else if (position <=2) {
            statusEl.textContent = "Almost ready";
            if (lastStatus !== "almost") {
                getNotified("Any second now!");
                lastStatus = "almost";
            }
        }      
    }
});