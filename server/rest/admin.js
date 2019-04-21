const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypts = require('bcryptjs');
const config = require('../config')

router.post('/login', function (req, res) {
    let admin = req.app.locals.admin;
    let login = req.body.login;
    let password = req.body.password;
    admin.findOne({ login }, (err, r) => {
        if (err) return res.status(500).send({ message: "Server Error" })
        if (!r) return res.status(404).send({ message: "No user found" })
        var salt = bcrypts.genSaltSync(10);
        var hash = bcrypts.hashSync(password, salt);
        var passwordIsValid = bcrypts.compareSync(r.password, hash
            //     , (err, valid) => {
            //     if (err) return res.send(err);
            //     res.send(valid)
            // }
        )
        if (!passwordIsValid) return res.status(401).send({ message: "Password not valid" });
        var token = jwt.sign({ id: r._id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token, login: r.login, img: r.img, id: r._id })
    })
})


router.get('/:id', function (req, res) {
    let admin = req.app.locals.admin;
    let id = Number(req.params['id']);
    let token = req.headers['authorization']
    if (!token) return res.status(401).send({ message: "not authorizated" })
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' })
        admin.findOne({ _id: id }, (err, re) => {
            if (err) return res.status(500).send({ message: 'No user' })
            res.status(200).send({ auth: true, token: token, login: re.login, img: re.img, id: re._id })
        })
    })
})

module.exports = router

