// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express();

const getPatientCount = (req, res, next) => {
    try {
        db.query('SELECT COUNT(name) AS count FROM patients', (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            const patientCount = result[0].count;
            console.log('Current patient count is ' + patientCount);
            req.patientCount = patientCount;
            return next();
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}


module.exports = getPatientCount;