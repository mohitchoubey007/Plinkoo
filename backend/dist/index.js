"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Use default imports
const cors_1 = __importDefault(require("cors"));
const outcomes_1 = require("./outcomes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const TOTAL_DROPS = 16;
const MULTIPLIERS = {
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
app.get('/', (req, res) => {
    res.json("Server is running fine");
});
app.post("/game", (req, res) => {
    let outcome = 0;
    const pattern = [];
    for (let i = 0; i < TOTAL_DROPS; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R");
            outcome++;
        }
        else {
            pattern.push("L");
        }
    }
    const multiplier = MULTIPLIERS[outcome];
    const possibleOutcomes = outcomes_1.outcomes[outcome] || []; // Safeguard against undefined outcome
    res.json({
        point: possibleOutcomes[Math.floor(Math.random() * possibleOutcomes.length)],
        multiplier,
        pattern,
    });
});
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
