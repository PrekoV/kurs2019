const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
    let media = req.app.locals.media;
    media.findOne({ _id: Number(req.params["id"]) }, (err, r) => {
        res.send(r)
    })
})

router.get("/", (req, res) => {
    let media = req.app.locals.media;
    media.find({}).toArray((err, r) => {
        for (let i = 0; i < r.length; i++) {
            r[i].pics = r[i].pics[0]
        }
        res.send(r)
    })
})
module.exports = router