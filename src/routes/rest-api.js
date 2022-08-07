const { Router } = require("express");
const express = require("express");
const res = require("express/lib/response");
const { append } = require("express/lib/response");
const restRouter = express.Router();

const { sequelize, customer, customer_info } = require("../../models");

restRouter.get("/rest/customers", async (req, res) => {
  try {
    const customers = await customer.findAll();
    return res.status(200).json(customers);
  } catch (error) {
    return res.status(500).json(error);
  }
});

restRouter.get("/rest/customer/:id", async (req, res) => {
  const customerId = req.params.id;
  try {
    const foundCustomer = await customer.findOne({
      where: {
        id: customerId,
      },
    });
    return res.status(200).json(foundCustomer);
  } catch (error) {
    return res.status(500).json(error);
  }
});

restRouter.post("/rest/newcustomer", async (req, res) => {
  const { email, password, first_name, last_name, phone_number } = req.body;
  try {
    const newCustomer = await customer.create({
      email,
      password,
      first_name,
      last_name,
      phone_number,
    });
    return res.json(newCustomer);
  } catch (error) {
    return res.status(500).json(error);
  }
});

restRouter.post("/rest/customerinfo/:id", async (req, res) => {
  const customer_id = req.params.id;
  const { street_number, street_name, suburb, postcode, state } = req.body;
  try {
    const customerInfo = await customer_info.create({
      customer_id,
      street_number,
      street_name,
      suburb,
      postcode,
      state,
    });
    return res.json(customerInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
});

restRouter.get("/rest/customerinfo/:id", async (req, res) => {
    const customer_id = req.params.id
    try {
        const customerInfo = await customer_info.findOne({
            where: {
                customer_id
            }
        })
        return res.json(customerInfo)
    } catch (error){
        return res.status(500).json(error)
    }
})

restRouter.get("/rest/customersinfo", async (req, res) => {
    try {
        const customersInfo = await customer_info.findAll()
        return res.json(customersInfo)
    } catch (error){
        return res.status(500).json(error)
    }
})

module.exports = restRouter;
