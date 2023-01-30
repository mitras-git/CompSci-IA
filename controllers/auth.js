const express = require('express');
const register = require('./register');
const login = require('./login');
const loggedIn = require('./loggedIn');
const app = express();
const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');

app.post('/register', register);
app.post('/login', login);
// app.get('/logout', userLogout);


module.exports = app;

