const { sequelize, customer, customer_info } = require("../models");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList,
  } = require("graphql");


const CustomerType = new GraphQLObjectType({
    name: "User",
    description: "These are the login details of an user",
    fields: () => ({
      id: { type: GraphQLNonNull(GraphQLInt) },
      uuid: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
      firstName: { type: GraphQLNonNull(GraphQLString) },
      lastName: { type: GraphQLNonNull(GraphQLString) },
      phoneNumber: { type: GraphQLNonNull(GraphQLString) },
    }),
  });
  
  const RootQueryType = new GraphQLObjectType({
    name: "query",
    description: "Root Query",
    fields: () => ({
      users: {
        type: new GraphQLList(CustomerType),
        description: "List of All Users",
        resolve: async (parent, args) => {
          try {
            const customers = await customer.findAll();
            const clients = [];
            for (const client of customers) {
              const response = {
                id: client.id,
                uuid: client.uuid,
                email: client.email,
                password: client.password,
                firstName: client.first_name,
                lastName: client.last_name,
                phoneNumber: client.phone_number,
              };
              clients.push(response);
            }
            return clients;
          } catch (error) {
            console.error(error);
          }
        },
      },
      user: {
        type: CustomerType,
        description: "Gives a single User",
        args: {
          id: { type: GraphQLInt },
        },
        resolve: async (parent, args) => {
          try {
            const customerFound = await customer.findOne({
              where: {
                id: args.id,
              },
            });
            const response = {
              id: args.id,
              uuid: customerFound.dataValues.uuid,
              password: customerFound.dataValues.password,
              firstName: customerFound.dataValues.first_name,
              lastName: customerFound.dataValues.last_name,
              phoneNumber: customerFound.dataValues.phone_number,
            };
            console.log("+++response: ", response);
            return response;
          } catch (error) {
            console.error(error);
          }
        },
      },
    }),
  });
  
  const RootMutationType = new GraphQLObjectType({
    name: "mutation",
    description: "Mutation Query",
    fields: () => ({
      addCustomer: {
        type: CustomerType,
        description: "Adding a Customer",
        args: {
          email: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
          firstName: { type: GraphQLNonNull(GraphQLString) },
          lastName: { type: GraphQLNonNull(GraphQLString) },
          phoneNumber: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (package, args) => {
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
      },
    }),
  });

  module.exports = {
    RootQueryType,
    RootMutationType
  }