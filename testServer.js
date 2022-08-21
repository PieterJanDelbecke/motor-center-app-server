const express = require('express')
const app = express()
const cors = require("cors")
const port = 8000

app.use(express.json());
app.use(cors({origin: "*"}))

const videoRouter = require("./src/routes/videoRouter")

app.use(videoRouter)

app.listen(port, () => {
    console.log(`testServer listening on port ${port}`)
})