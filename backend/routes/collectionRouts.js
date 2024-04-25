const express = require('express');
const collectionsRouter = express.Router();
const { getAllCollections, getCollectionById } = require('../controllers/collections');


collectionsRouter.get("/", getAllCollections);
collectionsRouter.get("/:id", getCollectionById);

module.exports = collectionsRouter;
