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

router.post('/messages', (req, res) => {
    let message = req.body.message
    let admin = req.body.admin
    let date = req.body.date
    let messages = req.app.locals.messages;
    let admins = req.app.locals.admin;
    let token = req.headers['authorization']
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        admins.findOne({ login: admin }, (err, r) => {
            messages.insertOne({ admin, message, date, img: r.img }, (err, r) => {
                if (err) return res.status(500).send({ message: "Server Error" })
            })
            messages.find({}).toArray((err, re) => {
                if (err) return res.status(500).send({ message: 'Failed to connect' })
                res.status(200).send(re)
            })
        })
    })
})

module.exports = router