// noinspection JSUnresolvedFunction

const db = require('../database/db-config');
const express = require('express');
const app = express();

const getHighAlertList = (req, res, next) => {
    try {
        db.query('SELECT name FROM patients WHERE on_high_alert = "true"' , async (err, results) => {
            if (err) throw err

            for (let i = 0; i < results.length; i++) {
                console.log("High alert name is " + results[i].name);
            }

            const highAlertList = results;
            req.highAlertList = highAlertList;
            return next();
        })
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

module.exports = getHighAlertList;