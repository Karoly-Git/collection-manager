const express = require("express");
const calcRouter = express.Router();

const { endOfWeek } = require("../controllers/stocks");

calcRouter.get("/end-of-week", endOfWeek);

module.exports = calcRouter;
