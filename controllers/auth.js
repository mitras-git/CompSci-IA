const express = require('express');
const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const app = express();
const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const path = require("path");

app.use(express.static(path.join(__dirname, '..' ,"public")));

app.post('/register', register);
app.post('/login', login);
app.get('/logout', logout);

module.exports = app;

