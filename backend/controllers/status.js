const statusTable = require("../models/db/status.json");

const getAllStatus = (req, res) => {
    try {
        res.status(200).json(statusTable);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getStatusById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const collection = statusTable.find(
            (collection) => collection.collection_id === Number(id)
        );

        //******************* */
        /*
            - checked in
            - being loaded
            - loading finished
            - checked out
            - checked out unloaded
        */
        let collectionStatus = "Due";

        if (collection.check_in_time) {
            collectionStatus = "Waiting";
        }
        if (collection.loading_start_time) {
            collectionStatus = "Being loaded";
        }
        if (collection.loading_finish_time) {
            collectionStatus = "Loading finished";
        }
        if (collection.check_out_time) {
            collectionStatus = "Completed";
        }
        if (collection.check_out_time && !collection.loading_finish_time) {
            collectionStatus = "Left site unloaded";
        }
        //******************* */

        if (!collection) {
            res.status(404).json({ error: "Product not found" });
        } else {
            res.status(200).json({ ...collection, status: collectionStatus });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllStatus, getStatusById };
