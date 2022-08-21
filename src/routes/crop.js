const express = require('express')
const cropRouter = express.Router()

cropRouter.get("/crop", (req,res) => {
    res.json({received : "get"})
})
cropRouter.post("/crop", (req,res) => {
    res.json({received : "post"})
})

module.exports = cropRouter