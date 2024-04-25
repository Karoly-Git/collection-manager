const productsData = require("../models/db/products.json");

const getAllProducts = (req, res) => {
    try {
        res.status(200).json(productsData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getProductById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const product = productsData.find(
            (product) => product.id === Number(id)
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

module.exports = { getAllProducts, getProductById };
