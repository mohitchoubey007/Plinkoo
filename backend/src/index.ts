import express, { Request, Response } from 'express'; // Use default imports
import cors from 'cors';
import { outcomes } from './outcomes';

const app = express();
app.use(cors());

const TOTAL_DROPS = 16;

const MULTIPLIERS: { [key: number]: number } = {
  0: 16,
  1: 9,
  2: 2,
  3: 1.4,
  4: 1.4,
  5: 1.2,
  6: 1.1,
  7: 1,
  8: 0.5,
  9: 1,
  10: 1.1,
  11: 1.2,
  12: 1.4,
  13: 1.4,
  14: 2,
  15: 9,
  16: 16,
};

app.get('/', (req: Request, res: Response) => {
  res.json("Server is running fine");
});

app.post("/game", (req: Request, res: Response) => {
  let outcome = 0;
  const pattern: string[] = [];
  for (let i = 0; i < TOTAL_DROPS; i++) {
    if (Math.random() > 0.5) {
      pattern.push("R");
      outcome++;
    } else {
      pattern.push("L");
    }
  }

  const multiplier = MULTIPLIERS[outcome];
  const possibleOutcomes = outcomes[outcome] || []; // Safeguard against undefined outcome

  res.json({
    point: possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)],
    multiplier,
    pattern,
  });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
