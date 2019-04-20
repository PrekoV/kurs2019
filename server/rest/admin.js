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
        if (err) return res.status(500).send("Server Error")
        if (!r) return res.status(404).send("No user found")
        var salt = bcrypts.genSaltSync(10);
        var hash = bcrypts.hashSync(password, salt);
        var passwordIsValid = bcrypts.compareSync(r.password, hash
            //     , (err, valid) => {
            //     if (err) return res.send(err);
            //     res.send(valid)
            // }
        )
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        var token = jwt.sign({ id: r._id }, config.secret, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token: token, login: r.login, img: r.img })
    })
})

router.get('/logout', function (req, res) {
    res.send({ auth: false, token: 0 })
})



module.exports = router

