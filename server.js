// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let leaderboard = [];

// Save score
app.post("/api/score", (req, res) => {
  const { name, moves, winner } = req.body;
  if (!name || !moves || typeof winner === "undefined") {
    return res.status(400).json({ message: "Invalid data" });
  }
  const playerData = { name, moves, winner, date: new Date() };
  leaderboard.push(playerData);
  leaderboard = leaderboard.slice(-10);
  res.json({ message: "Score saved", data: playerData });
});

// Get leaderboard
app.get("/api/leaderboard", (req, res) => {
  res.json(leaderboard.sort((a, b) => a.moves - b.moves));
});

// Root
app.get("/", (req, res) => res.send("🐍 Snake & Ladder API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ API on port ${PORT}`));
