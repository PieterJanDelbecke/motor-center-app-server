const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");

const { sequelize, customer, customer_info } = require("./models");
const { RootMutationType, RootQueryType } = require("./graphql/gqlCustomers");

// const useRestRouter = require("./routes/rest-api");
// const useRestRouter = require("./routes/rest-api");
// const useRestRouter = require("./routes/rest-api");

const app = express();
const port = 3200;

app.use(express.json());

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(port, async () => {
  console.log(`+++ server running on port ${port} +++`);
  // await sequelize.sync({force: true})
  await sequelize.authenticate();
  console.log("+++ DB synced +++");
});
