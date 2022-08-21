const express = require('express')
const app = express()
const port = 8000

const cropRouter = require("./src/routes/crop")

app.use(cropRouter)

app.listen(port, () => {
    console.log(`testServer listening on port ${port}`)
})