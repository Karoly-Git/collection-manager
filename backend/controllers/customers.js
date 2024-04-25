const customersData = require("../models/db/customers.json");

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

module.exports = { getAllCustomers, getCustomerById };
