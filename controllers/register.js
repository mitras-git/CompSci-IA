// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');
const path = require("path");
const express = require("express");
const app = express();

app.use(express.static(path.join(__dirname, '..' ,"public")));
const htmlPath = path.join(__dirname, '..' ,"public");

const register = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                res.cookie("message", "This email already exists", { maxAge: 1000 });
                return res.status(401).sendFile(htmlPath + '/register.html');
            } else if (password != passwordConfirm) {
                res.cookie("message", "Your passwords did not match", { maxAge: 1000 });
                return res.status(401).sendFile(htmlPath + '/register.html');
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie("message", "User registered successfully", { maxAge: 1000 });
                return res.status(200).sendFile(htmlPath + '/register.html');
            }
        })
    })
}

module.exports = register;