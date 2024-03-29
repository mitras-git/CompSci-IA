// noinspection JSUnresolvedFunction

const db = require('../database/db-config');
const express = require('express');
const app = express();

const getTable = (req, res, next) => {
    try {
        db.query('SELECT * FROM patients', (err, results) => {
            if (err) throw err
            const tableToRender = results;
            req.tableToRender = tableToRender;
            return next();
        })
    } catch (err) {
        console.log(err)
        return next(err);
    }
}

module.exports = getTable;
