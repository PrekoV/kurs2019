const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
    const purchases = req.app.locals.purchases;
    let purchase = req.body
    console.log(req.body)
    purchases.insertOne(purchase, (err, r) => {
        if (err) return res.status(500).send({ message: 'Failed to post purchase' })
        if (!r) return res.status(404).send({ message: "Not found" })
        console.log(r)
        res.send({message: "good request", purchase: r.ops[0]})
    })
})
router.get("/", (req, res) => {
    const purchases = req.app.locals.purchases;
    purchases.find({}).toArray((err, r) => {
        if (err) return res.status(500).send({ message: 'Failed to get purchases' })
        if (!r) return res.status(404).send({ message: "Not found" })
        console.log(r)
        res.send(r)
    })
})
module.exports = router