const express = require('express');
const statusRouter = express.Router();
const { getAllStatus, getStatusById } = require('../controllers/status');


statusRouter.get("/", getAllStatus);
statusRouter.get("/:id", getStatusById);

module.exports = statusRouter;
