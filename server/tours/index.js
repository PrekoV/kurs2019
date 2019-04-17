const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let tour = req.app.locals.tour;
    tour.find({}).toArray((err, r) => {
        res.send(r)
    })
})

module.exports = router