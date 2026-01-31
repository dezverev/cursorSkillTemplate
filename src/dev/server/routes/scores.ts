import { Router } from 'express';

const router = Router();

// In-memory storage for high scores (would use a database in production)
interface HighScore {
  id: string;
  name: string;
  score: number;
  level: number;
  lines: number;
  date: string;
}

let highScores: HighScore[] = [];

// Get top 10 high scores
router.get('/', (_req, res) => {
  const topScores = [...highScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(topScores);
});

// Submit a new high score
router.post('/', (req, res) => {
  const { name, score, level, lines } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Name and score are required' });
  }

  const newScore: HighScore = {
    id: Date.now().toString(),
    name: name.slice(0, 20), // Limit name length
    score,
    level: level || 0,
    lines: lines || 0,
    date: new Date().toISOString(),
  };

  highScores.push(newScore);

  // Keep only top 100 scores in memory
  highScores = highScores
    .sort((a, b) => b.score - a.score)
    .slice(0, 100);

  res.status(201).json(newScore);
});

export default router;
