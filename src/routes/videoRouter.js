const express = require('express')
const videoRouter = express.Router()

videoRouter.get("/video/crop", (req,res) => {
    res.json({received: "video/crop: GET"})
})
videoRouter.post("/video/crop", (req,res) => {
    const data = req.body
    console.log("video/crop: POST +++ ", data)
    res.json({received: "video/crop: POST"})
})

videoRouter.get("/video/trim/:id", (req, res) => {
    const data = req.params.id
    console.log("video/trim id: ", data)
    res.json({received: `param id:${data}`})
})

videoRouter.post("/video/trim", (req, res) => {
    const data = req.body
    console.log("video/trim: POST +++ ", data)
    res.json({received: "video/trim: POST" })

})

module.exports = videoRouter