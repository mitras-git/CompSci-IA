const db = require('../database/db-config');
const express = require('express');
const app = express();

const getUsers = (req, res, next) => {
    try {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const usersToRender = result
                req.usersToRender = usersToRender
                return next();
                }
            });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getUsers;