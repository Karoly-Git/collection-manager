const express = require("express");
const customerRouter = express.Router();
const {
    getAllCustomers,
    getCustomerById,
} = require("../controllers/customers");

customerRouter.get("/", getAllCustomers);
customerRouter.get("/:id", getCustomerById);

module.exports = customerRouter;
