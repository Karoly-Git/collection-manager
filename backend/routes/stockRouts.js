const express = require("express");
const stockRouter = express.Router();
const {
    getAllStocks,
    getStockById,
    updateAllStock,
    updateStockById,
} = require("../controllers/stocks");

stockRouter.get("/", getAllStocks);
stockRouter.get("/:id", getStockById);
stockRouter.put("/update", updateAllStock);
stockRouter.put("/update/:id", updateStockById);

module.exports = stockRouter;
