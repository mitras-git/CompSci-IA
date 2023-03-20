// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express();

const getHighAlertCount = (req, res, next) => {
    try {
        db.query('SELECT COUNT(on_high_alert) AS count FROM patients WHERE on_high_alert = "true"', (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            const highAlertCount = result[0].count;
            console.log('Current high alert count is ' + highAlertCount);
            req.highAlertCount = highAlertCount;
            return next();
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getHighAlertCount;