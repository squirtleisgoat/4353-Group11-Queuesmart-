let position = 5;

const positionEl = document.getElementById("position");
const simulateBtn = document.getElementById("simulateBtn");

simulateBtn.addEventListener("click", function() {
    position = position - 1;
    positionEl.textContent = position;
});