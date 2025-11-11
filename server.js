// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory leaderboard
let leaderboard = [];

// 🎯 POST: Save score
app.post("/api/score", (req, res) => {
  const { name, moves, winner } = req.body;
  if (!name || !moves || typeof winner === "undefined") {
    return res.status(400).json({ message: "Invalid data" });
  }

  const playerData = { name, moves, winner, date: new Date() };
  leaderboard.push(playerData);

  // Keep only 10 most recent entries
  leaderboard = leaderboard.slice(-10);

  res.json({ message: "Score saved successfully", data: playerData });
});

// 🏆 GET: Leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard.sort((a, b) => a.moves - b.moves));
});

// 🐍 Health check
app.get("/", (req, res) => {
  res.send("🐍 Snake & Ladder API running successfully!");
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
