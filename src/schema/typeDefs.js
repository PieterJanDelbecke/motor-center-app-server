const { gql } = require('apollo-server-express')

const typeDefs = gql`

    # types

    type Customer{
        id: Int!
        uuid: String!
        email: String!
        password: String!
        firstName: String!
        lastName: String!
        phoneNumber: String!
    }

    # Queries

    type Query {
        getAllCustomers: [Customer!]!
    }

    # Mutations

    type Mutation {
        createCustomer(email:String, password: String, firstName: String, lastName: String, phoneNumber: String): Customer
    }

`

module.exports = { typeDefs }