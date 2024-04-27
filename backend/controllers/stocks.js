const stockData = require("../models/db/stocks.json");
const productsData = require("../models/db/products.json");
const collectionsData = require("../models/db/collections.json");
const timelogData = require("../models/db/timelog.json");

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
        console.log(id);
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const product = stockData.find(
            (product) => product.product_id === Number(id)
        );
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
    { "id": 1,  "stock": 0, "collections_to_end_of_week": 7 },
    { "id": 2,  "stock": 23, "collections_to_end_of_week": 0 },
    { "id": 3,  "stock": 32, "collections_to_end_of_week": 1 },
    { "id": 4,  "stock": 35, "collections_to_end_of_week": 0 },
    { "id": 5,  "stock": 29, "collections_to_end_of_week": 1 },
    { "id": 6,  "stock": 5 , "collections_to_end_of_week": 0},
    { "id": 7,  "stock": 13, "collections_to_end_of_week": 0 },
    { "id": 8,  "stock": 19, "collections_to_end_of_week": 0 },
    { "id": 9,  "stock": 22, "collections_to_end_of_week": 4 },
    { "id": 10, "stock": 61, "collections_to_end_of_week": 5 },
    { "id": 11, "stock": 61, "collections_to_end_of_week": 2 }
]*/
    try {
        const stocksUpdate = req.body;
        if (!stocksUpdate) {
            res.status(400).json({ error: "Update unsuccess" });
        } else {
            for (let obj of stocksUpdate) {
                let stockElement = stockData.find(
                    (element) => element.product_id === obj.id
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
                (element) => element.product_id === Number(id)
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
        collectionsData,
        timelogData,
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
