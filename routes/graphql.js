const express = require('express')

const useGraphRouter = express.Router()

useGraphRouter.use('/graphql', (req, res) => {
    res.send("GraphQl endpoint")
})

module.exports = useGraphRouter