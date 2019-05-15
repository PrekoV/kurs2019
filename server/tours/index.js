const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let tour = req.app.locals.tour;
    console.log("im here")
    tour.findOne({}, (err, r) => {
        res.send(r)
    })
})

module.exports = router