const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const logout = (req, res) => {
    console.log('Cookie destruction initiated');
    res.clearCookie('userSave');
    res.status(200).redirect("/");
}

module.exports = logout;
