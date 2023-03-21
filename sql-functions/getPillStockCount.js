// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express();

const getPillStockCount = (req, res, next) => {
    try {
        db.query('SELECT SUM(quantity) AS total_quantity FROM pills', (err, result) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            const pillStockCount = result[0].total_quantity;
            console.log('Current pill stock count is ' + pillStockCount);
            req.pillStockCount = pillStockCount;
            return next();
        });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getPillStockCount;