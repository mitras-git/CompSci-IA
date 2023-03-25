// noinspection JSUnresolvedFunction

const db = require('../database/db-config');
const express = require('express');
const app = express();

const getTablePill = (req, res, next) => {
    try {
        db.query('SELECT * FROM pills', (err, results) => {
            if (err) throw err
            const tableToRender = results;
            req.pillTableToRender = tableToRender;
            return next();
        })
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

module.exports = getTablePill;