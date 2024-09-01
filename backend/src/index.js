"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var outcomes_1 = require("./outcomes");
var app = express();
app.use(cors());
var TOTAL_DROPS = 16;
var MULTIPLIERS = {
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
app.post("/game", function (req, res) {
    var outcome = 0;
    var pattern = [];
    for (var i = 0; i < TOTAL_DROPS; i++) {
        if (Math.random() > 0.5) {
            pattern.push("R");
            outcome++;
        }
        else {
            pattern.push("L");
        }
    }
    var multiplier = MULTIPLIERS[outcome];
    var possiblieOutcomes = outcomes_1.outcomes[outcome];
    res.send({
        point: possiblieOutcomes[Math.floor(Math.random() * possiblieOutcomes.length || 0)],
        multiplier: multiplier,
        pattern: pattern,
    });
});
app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
