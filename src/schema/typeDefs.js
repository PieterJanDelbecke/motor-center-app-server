const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # types

  type Customer {
    id: Int!
    uuid: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
  }

  type CustomerInfo {
    id: Int!
    customerId: Int!
    streetNumber: String!
    streetName: String!
    suburb: String!
    postcode: Int!
    state: String!
  }

  # Queries

  type Query {
    getAllCustomers: [Customer!]!
  }

  # Mutations

  type Mutation {
    createCustomer(
      email: String
      password: String
      firstName: String
      lastName: String
      phoneNumber: String
    ): Customer

    createCustomerInfo (
      streetNumber: Int
      streetName: String
      suburb: String
      postcode: Int
      state: String
    ): CustomerInfo
  }
`;

module.exports = { typeDefs };
