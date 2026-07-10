const history = [
    {date: "Jul 8, 2026", service: "General checkup", outcome: "Served" },
    {date: "Dec 14, 2025", service: "Lab work", outcome: "Left queue" },
    {date: "Aug 20, 2025", service: "Pharmacy pickup", outcome: "Served" },
];

const historyBody = document.getElementById("historyBody");

history.forEach(function(entry) {
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + entry.date + "</td><td>" + entry.service + "</td><td>" + entry.outcome + "</td>";
    historyBody.appendChild(row);
});