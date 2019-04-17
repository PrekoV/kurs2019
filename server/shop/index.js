const express = require("express");
const router = express.Router();

router.get("/tshirts", (req, res) => {
    let tshirts = req.app.locals.tshirts;
    tshirts.find({}).toArray((err, r) => {
        console.log(r)
        res.send(r)
    })
})

router.get("/sweatshirts", (req, res) => {
    let sweatshirts = req.app.locals.sweatshirts;
    sweatshirts.find({}).toArray((err, r) => {
        console.log(r)
        res.send(r)
    })
})

router.get("/cups", (req, res) => {
    let cups = req.app.locals.cups;
    cups.find({}).toArray((err, r) => {
        console.log(r)
        res.send(r)
    })
})

router.get("/backpacks", (req, res) => {
    let backpacks = req.app.locals.backpacks;
    backpacks.find({}).toArray((err, r) => {
        console.log(r)
        res.send(r)
    })
})
module.exports = router