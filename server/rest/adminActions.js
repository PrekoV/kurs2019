const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config')
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
    console.log('req file', req.file)
    let media = req.app.locals.media;
    let token = req.headers['authorization']
    let name = req.body.name
    console.log(token)
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        media.updateOne({ name: name }, { $push: { pics: req.file.filename } }, (err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            res.send(r)
        })
    })
})

router.post('/create/media/download', uploads.single('file'), function (req, res) {
    console.log('req file', req.file)
    let media = req.app.locals.media;
    let token = req.headers['authorization']
    console.log(token)
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        media.insert({ name: req.body.name, pics: [req.file.filename] }, (err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            res.send(r.ops[0])
        })
    })
})

router.post('/messages', (req, res) => {
    let message = req.body.message
    let admin = req.body.admin
    let date = req.body.date
    let messages = req.app.locals.messages;
    let token = req.headers['authorization']
    console.log(token)
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        messages.insert({ admin, message, date }, (err, r) => {
            if (err) return res.status(500).send("Server Error")
            console.log(r)
        })
        messages.find({}).toArray((err, r) => {
            if (err) return res.status(500).send({ message: 'Failed to connect' })
            res.send(r)
        })
    })
})



module.exports = router