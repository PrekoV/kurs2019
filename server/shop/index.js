const express = require("express");
const router = express.Router();

router.get("/one", (req, res) => {
    const products = req.app.locals.products;
    let name = req.query.name
    console.log(name)
    products.findOne({ name }, (err, r) => {
        if (err) return res.status(500).send({ message: 'Failed to get' + name })
        if (!r) return res.status(404).send({ message: "Not found" })
        res.send(r)
    })
})

router.get("/", (req, res) => {
    const products = req.app.locals.products;
    products.find({}, { projection: { list: 0 } }).toArray((err, r) => {
        if (err) return res.status(500).send({ message: 'Failed to get products' })
        if (!r) return res.status(404).send({ message: "Not found" })
        res.send(r)
    })
})
module.exports = router