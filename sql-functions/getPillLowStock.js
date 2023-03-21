// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express();

const getPillLowStock = (req, res, next) => {
    try {
        db.query('SELECT name FROM pills WHERE quantity <= 10', async (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            if (result.length === 0) {
                console.log('No pills are low on stock');
                req.pillLowStock = [{name: 'No pills are low on stock'}];
                return next();
            }

            const pillLowStock = result;
            req.pillLowStock = pillLowStock;
            console.log(req.pillLowStock);
            return next();
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getPillLowStock;
