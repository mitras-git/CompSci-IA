// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express();

const getPillAssignedCount = (req, res, next) => {
    try {
        db.query('SELECT COUNT(*) AS count_assigned FROM pills WHERE patients_assigned IS NOT NULL AND patients_assigned != \'\'', (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            const pillAssignedCount = result[0].count_assigned;
            console.log('Current pill assigned count is ' + pillAssignedCount);
            req.pillAssignedCount = pillAssignedCount;
            return next();
        });
    } catch (err) {
        console.log(err)
        return next(err)
    }
}

module.exports = getPillAssignedCount;