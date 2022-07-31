const express = require('express')

const { sequelize, customer, customer_info} = require('./models')

const useRestRouter = require('./routes/rest-api')
const useGraphRoute = require('./routes/graphql')

const app = express()
const port = 4000

app.use(express.json())
app.use("/api",useRestRouter)
app.use("/api", useGraphRoute)

app.listen(port, async () => {
    console.log(`+++ server running on port ${port} +++`)
    // await sequelize.sync({force: true})
    await sequelize.authenticate()
    console.log("+++ DB synced +++")
})