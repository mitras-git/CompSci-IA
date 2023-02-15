// noinspection JSUnresolvedFunction

const jwt = require('jsonwebtoken');
const db = require('../database/db-config');
const bcrypt = require('bcryptjs');
const path = require('path');
const express = require('express');
const secrets = require('../secrets');
const app = express();

app.use(express.static(path.join(__dirname, '..' ,"public")));
const htmlPath = path.join(__dirname, '..' ,"public");

const login = (req, res) => {
    try {
        const { email, pass } = req.body;
        if (!email || !pass) {
            res.cookie("message", "Please provide an email and password", { maxAge: 1000 });
            return res.status(401).sendFile(htmlPath + '/login.html');
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            console.log(results);
            if (!results || !results[0] || !await bcrypt.compare(pass, results[0].password)) {
                res.cookie("message", "Email or password is incorrect", { maxAge: 1000 });
                res.status(401).sendFile(htmlPath + '/login.html');
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, secrets.cookiekey, {
                    expiresIn: "2d"
                });

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + "2" * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userSave', token, cookieOptions);
                res.status(200).redirect("/");
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = login;
