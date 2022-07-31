const express = require("express");
const res = require("express/lib/response");
const { append } = require("express/lib/response");
const restRouter = express.Router();

const { sequelize, customer } = require("../models");

restRouter.get("/rest/customers", async (req, res) => {
    try{
        const customers = await customer.findAll()
        return res.status(200).json(customers)
    } catch (error){
        return res.status(500).json(error)
    }
})

restRouter.post("/rest/newcustomer", async (req, res) => {
  const {email, password, first_name, last_name, phone_number } = req.body;
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

module.exports = restRouter;
