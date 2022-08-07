const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { sequelize, customer, customer_info } = require("./models");
const { typeDefs } = require("./src/schema/typeDefs");
const { resolvers } = require("./src/schema/resolvers");

const app = express();
app.use(express.json());
const PORT = 8000;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  app.listen(PORT, async () => {
    console.log(`+++ server running on port ${PORT} +++`);
    // await sequelize.sync({force: true})
    await sequelize.authenticate();
    console.log("+++ DB synced +++");
  });
}
startApolloServer(typeDefs, resolvers);
