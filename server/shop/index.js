const express = require("express");
const router = express.Router();

router.get("/tshirts", (req, res) => {
    const products = req.app.locals.products;
    products.findOne({ name: "T-Shirts" }, (err, r) => {
        res.send(r)
    })
})

router.get("/sweatshirts", (req, res) => {
    const products = req.app.locals.products;
    products.findOne({ name: "Sweatshirt" }, (err, r) => {
        res.send(r)
    })
})

router.get("/cups", (req, res) => {
    const products = req.app.locals.products;
    products.findOne({ name: "Cups" }, (err, r) => {
        res.send(r)
    })
})

router.get("/backpacks", (req, res) => {
    const products = req.app.locals.products;
    products.findOne({ name: "Backpack" }, (err, r) => {
        res.send(r)
    })
})

router.get("/", (req, res) => {
    const products = req.app.locals.products;
    products.find({}, { projection: { tshirts: 0, cups: 0, backpacks: 0, sweatshirts: 0 } }).toArray((err, r) => {
        res.send(r)
    })
})
module.exports = router