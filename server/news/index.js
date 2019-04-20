const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let messages = req.app.locals.messages;
    messages.find({}).toArray((err, r) => {
        if (err) return res.status(500).send({ message: 'Failed to get messages' })
        res.send(r)
    })
})

module.exports = router