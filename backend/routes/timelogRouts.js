const express = require("express");
const timelogRouter = express.Router();
const { getAllTimelog, getTimelogById } = require("../controllers/timelog");

timelogRouter.get("/", getAllTimelog);
timelogRouter.get("/:id", getTimelogById);

module.exports = timelogRouter;
