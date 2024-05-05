const express = require("express");
const customerRouter = express.Router();
const {
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
} = require("../controllers/customers");

customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id", getCustomerById);
customerRouter.put("/update/:id", updateCustomerById);

module.exports = customerRouter;
