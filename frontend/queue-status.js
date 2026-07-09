let position = 5;

const positionEl = document.getElementById("position");
const statusEl = document.getElementById("status");
const simulateBtn = document.getElementById("simulateBtn");

simulateBtn.addEventListener("click", function() {
    if (position > 0) {
        position = position - 1;
        positionEl.textContent = position;
        if (position === 0) {
            statusEl.textContent = "Served";
        }
    }
});