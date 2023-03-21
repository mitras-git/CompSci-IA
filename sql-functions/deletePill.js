// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require("express");
const app = express();

const deletePill = (req, res) => {
    try {
        const nameToDelete = req.body.deleteName;
        db.query('DELETE FROM pills WHERE name = ?', nameToDelete, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie("message", "Pill deleted successfully", { maxAge: 1000 });
                return res.redirect('/pill');
            }
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = deletePill;