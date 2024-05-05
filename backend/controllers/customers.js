const fs = require("fs");
const customersData = require("../models/db/customers_test.json");

const getAllCustomers = (req, res) => {
    try {
        res.status(200).json(customersData);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCustomerById = (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({ error: "Invalid ID input" });
            return;
        }
        const customer = customersData.find(
            (customer) => customer.id === Number(id)
        );
        if (!customer) {
            res.status(404).json({ error: "Customer not found" });
        } else {
            res.status(200).json(customer);
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateCustomerById = (req, res) => {
    try {
        const { customer } = req.body;
        const { id } = req.params;

        if (!customer) {
            res.status(400).json({ error: "Invalid object" });
        } else {
            let index = customersData.findIndex((element) => element.id === Number(id));

            if (index === -1) {
                res.status(404).json({ error: "Customer not found" });
            } else {
                customersData[index] = { id: Number(id), ...customer };
                res.status(200).json(customersData[index]);
                const jsonString = JSON.stringify(customersData, null, 2);
                fs.writeFile("./models/db/customers_test.json", jsonString, "utf-8", (err) => {
                    if (err) {
                        console.error("Error writing JSON file:", err);
                        return;
                    }
                    console.log("JSON file written successfully");
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: "Internal Server Error",
            message: error.message,
        });
    }
};


module.exports = { getAllCustomers, getCustomerById, updateCustomerById };
