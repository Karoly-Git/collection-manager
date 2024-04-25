const collectionsTable = require("../models/db/collections.json");

const getAllCollections = (req, res) => {
    try {
        res.status(200).json(collectionsTable);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCollectionById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const collection = collectionsTable.find(
            (collection) => collection.id === Number(id)
        );
        if (!collection) {
            res.status(404).json({ error: "Product not found" });
        } else {
            res.status(200).json(collection);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllCollections, getCollectionById };
