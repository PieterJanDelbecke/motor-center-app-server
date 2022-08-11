const { sequelize, customer, customer_info } = require("../models");

const resolvers = {
  Query: {
    async getAllCustomers() {
      try {
        const customers = await customer.findAll();
        const allCustomers = [];
        for (const oneCustomer of customers) {
          const response = {
            id: oneCustomer.id,
            uuid: oneCustomer.uuid,
            email: oneCustomer.email,
            password: oneCustomer.password,
            firstName: oneCustomer.first_name,
            lastName: oneCustomer.last_name,
            phoneNumber: oneCustomer.phone_number,
          };
          allCustomers.push(response);
        }
        return allCustomers;
      } catch (error) {
        console.error(error);
      }
    },
  },

  Mutation: {
    async createCustomer(parent, args) {
      try {
        const customersCount = await customer.count();
        const newCustomer = await customer.create({
          id: customersCount + 1,
          email: args.email,
          password: args.password,
          first_name: args.firstName,
          last_name: args.lastName,
          phone_number: args.phoneNumber,
        });
        const response = {
          id: newCustomer.dataValues.id,
          uuid: newCustomer.dataValues.uuid,
          email: newCustomer.dataValues.email,
          password: newCustomer.dataValues.password,
          firstName: newCustomer.dataValues.first_name,
          lastName: newCustomer.dataValues.last_name,
          phoneNumber: newCustomer.dataValues.phone_number,
        };
        return response;
      } catch (error) {
        console.log(error);
      }
    },

    async createCustomerInfo(parent, args) {
      try {
        const customerInfoCount = await customer_info.count();
        const newCustomerInfo = await customer_info.create({
          id: customerInfoCount + 1,
          customer_id: 2,
          street_number: args.streetNumber,
          street_name: args.streetName,
          suburb: args.suburb,
          postcode: args.postcode,
          state: args.state,
        });
        console.log("response", newCustomerInfo);
        return {
          streetNumber: 878,
          streetName: "Westminster"
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};

module.exports = { resolvers };
