const express = require('express');
const productRouter = express.Router();
const { getAllProducts, getProductById } = require('../controllers/products');


productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

module.exports = productRouter;
