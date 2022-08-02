const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList


} = require('graphql')
const { sequelize, customer, customer_info} = require('./models')

const useRestRouter = require('./routes/rest-api')
const useGraphRoute = require('./routes/graphql')

const app = express()
const port = 3100

app.use(express.json())
app.use("/api",useRestRouter)


const users = [
    {id: 1, uuid: "UUID1", email: 'test1@email.com', password: 'password1', firstName: 'Adam', lastName: 'Ant', phoneNumber: "0405666111"},
    {id: 2, uuid: "UUID2", email: 'test2@email.com', password: 'password2', firstName: 'Bob', lastName: 'Builder', phoneNumber: "0405666222"},
    {id: 3, uuid: "UUID3", email: 'test3@email.com', password: 'password3', firstName: 'Charlie', lastName: 'Chan', phoneNumber: "0405666333"},
]


const UserType = new GraphQLObjectType({
    name: 'User',
    description:"These are the login details of an user",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        uuid: {type: GraphQLNonNull(GraphQLString)},
        email: { type: GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLNonNull(GraphQLString)},
        firstName: { type: GraphQLNonNull(GraphQLString)},
        lastName: {type: GraphQLNonNull(GraphQLString)},
        phoneNumber: { type: GraphQLNonNull(GraphQLString)},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'List of All Users',
            resolve: () => users
        },
        user: {
            type: UserType,
            description: 'Gives a single User',
            args: {
                id: { type : GraphQLInt }
            },
            // resolve: (parent, args) => users.find( user => user.id === args.id)
            resolve: async (parent, args) => {
                try {
                    const customerFound = await customer.findOne({
                        where: {
                            id: args.id
                        }
                    })
                    const response = {
                        id: args.id,
                        uuid: customerFound.dataValues.uuid,
                        password: customerFound.dataValues.password,
                        firstName: customerFound.dataValues.first_name,
                        lastName: customerFound.dataValues.last_name,
                        phoneNumber: customerFound.dataValues.phoneNumber,
                    }
                    console.log("+++response: ", response)
                    return response
                } catch (error) {
                    console.error(error)
                }
            }
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'Mutation Query',
    fields: () => ({
        addUser:{
            type: UserType,
            description: "Adding a user",
            args:{
                email: { type: GraphQLNonNull(GraphQLString)},
                password: { type: GraphQLNonNull(GraphQLString)},
                firstName: { type: GraphQLNonNull(GraphQLString)},
                lastName: { type: GraphQLNonNull(GraphQLString)},
                phoneNumber: { type: GraphQLNonNull(GraphQLString)},
            },
            resolve: (package, args) => {
                const user = {
                    id: users.length +1,
                    email: args.email,
                    password: args.password,
                    firstName: args.firstName,
                    lastName: args.lastName,
                    phoneNumber: args.phoneNumber
                }
                users.push(user)
                return user
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(port, async () => {
    console.log(`+++ server running on port ${port} +++`)
    // await sequelize.sync({force: true})
    await sequelize.authenticate()
    console.log("+++ DB synced +++")
})