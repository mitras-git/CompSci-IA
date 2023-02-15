// noinspection JSUnresolvedFunction

const db = require('../database/db-config');
const jwt = require('jsonwebtoken');
const secrets = require('../secrets');

const loggedIn = (req, res, next) => {
    // noinspection JSUnresolvedVariable
    if (!req.cookies.userSave) return next();
    try {
        const decoded = jwt.verify(req.cookies.userSave, secrets.cookiekey);
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (!result) return next();
            req.user = result[0];
            console.log('User is logged in');
            console.log(req.user);
            return next();
        }); 
    } catch (err) {
        if (err) {
            console.log(err);
            console.log('Error connecting to database');
        } return next();
    }
}

module.exports = loggedIn;