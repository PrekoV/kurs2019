const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
var mongo = require('mongodb');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './server/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const uploads = multer({ storage })

router.post('/media/download', uploads.single('file'), function (req, res) {
    let media = req.app.locals.media;
    let token = req.headers['authorization']
    let id = req.body.id
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        media.updateOne({ _id: Number(id) }, { $push: { pics: req.file.filename } }, (err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            media.findOne({ _id: Number(id) }, (err, re) => {
                if (err) return res.status(500).send({ message: 'No album' })
                res.send(re)
            })
        })
    })
})

router.post('/create/media/download', uploads.single('file'), function (req, res) {
    let media = req.app.locals.media;
    let token = req.headers['authorization']
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        media.find({}).toArray((err, r) => {
            let len = r.length
            media.insertOne({ _id: len + 1, name: req.body.name, pics: [req.file.filename] }, (err, r) => {
                if (err) return res.status(500).send({ message: 'Failed to connect' })
                r.pics = r.pics[0]
                res.send(r.ops[0])
            })
        })
    })
})

router.put("/purchases", (req,res) => {
    let token = req.headers['authorization']
    const purchases = req.app.locals.purchases;
    var o_id = new mongo.ObjectID(req.body._id);

    console.log(req.body._id)
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        purchases.updateOne({_id: o_id}, {$set: {name: req.body.name, tel:req.body.tel, address:req.body.address, size:req.body.size,}}, (err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            // console.log(r)
            res.send({message: "OK"})
        })
    })
})

router.delete("/purchases", (req,res) => {
    let token = req.headers['authorization']
    const purchases = req.app.locals.purchases;
    var o_id = new mongo.ObjectID(req.body._id);
    console.log(req.body)
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        purchases.deleteOne({_id: o_id}, (err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            console.log(r)
            res.send({message: "OK"})
        })
    })
})

module.exports = router