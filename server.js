// server.js
const API_URL = "https://snake-ladder-api.onrender.com";

async function saveScore(name, moves, winner) {
  await fetch(`${API_URL}/api/score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, moves, winner })
  });
}

async function loadLeaderboard() {
  const res = await fetch(`${API_URL}/api/leaderboard`);
  const data = await res.json();
  console.table(data);
}

