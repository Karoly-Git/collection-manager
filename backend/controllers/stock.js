const stockData = require("../models/db/stock.json");
const productsData = require("../models/db/products.json");
const collectionsTable = require("../models/db/collections.json");
const statusTable = require("../models/db/status.json");

const getAllStocks = (req, res) => {
    try {
        res.status(200).json(stockData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getStockById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const product = stockData.find((product) => product.id === Number(id));
        if (!product) {
            res.status(404).json({ error: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateAllStock = (req, res) => {
    /*
req.body = [
    { "id": 1,  "stock": 0 },
    { "id": 2,  "stock": 23 },
    { "id": 3,  "stock": 32 },
    { "id": 4,  "stock": 35 },
    { "id": 5,  "stock": 29 },
    { "id": 6,  "stock": 5 },
    { "id": 7,  "stock": 13 },
    { "id": 8,  "stock": 19 },
    { "id": 9,  "stock": 22 },
    { "id": 10, "stock": 61 },
    { "id": 11, "stock": 61 }
]*/
    try {
        const stocksUpdate = req.body;
        if (!stocksUpdate) {
            res.status(400).json({ error: "Update unsuccess" });
        } else {
            for (let obj of stocksUpdate) {
                let stockElement = stockData.find(
                    (element) => element.id === obj.id
                );
                stockElement.stock = obj.stock;
            }
            res.status(200).json(stockData);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateStockById = (req, res) => {
    // req.body = {"stock": 50}
    try {
        const { id } = req.params;
        const { stock } = req.body;
        if (!id || id < 1 || id > 11 || !stock || stock < 0) {
            res.status(400).json({ error: "Invalid inputs" });
        } else {
            let stockElement = stockData.find(
                (element) => element.id === Number(id)
            );
            stockElement.stock = Number(stock);
            res.status(200).json(stockElement);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
};

const getSumCollectionToEndOfWeek = require("./utility/getSumCollectionToEndOfWeek");

const endOfWeek = (req, res) => {
    let endOfWeekStockData = getSumCollectionToEndOfWeek(
        productsData,
        collectionsTable,
        statusTable,
        stockData
    );
    res.status(200).json(endOfWeekStockData);
};

module.exports = {
    getAllStocks,
    getStockById,
    updateAllStock,
    updateStockById,
    endOfWeek,
};
