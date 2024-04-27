const timelogData = require("../models/db/timelog.json");

const getAllTimelog = (req, res) => {
    try {
        res.status(200).json(timelogData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTimelogById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const timelog = timelogData.find(
            (timelog) => timelog.collection_id === Number(id)
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

        if (timelog.check_in_time) {
            collectionStatus = "Waiting";
        }
        if (timelog.loading_start_time) {
            collectionStatus = "Being loaded";
        }
        if (timelog.loading_finish_time) {
            collectionStatus = "Loading finished";
        }
        if (timelog.check_out_time) {
            collectionStatus = "Completed";
        }
        if (timelog.check_out_time && !timelog.loading_finish_time) {
            collectionStatus = "Left site unloaded";
        }
        //******************* */

        if (!timelog) {
            res.status(404).json({ error: "Product not found" });
        } else {
            res.status(200).json({ ...timelog, status: collectionStatus });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getAllTimelog, getTimelogById };
