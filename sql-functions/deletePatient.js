// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require("express");
const app = express();

const deletePatient = (req, res) => {
    try {
        const id = req.body.pID;
        db.query('DELETE FROM patients WHERE Patient_id = ?', id, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie("message", "Patient deleted successfully", { maxAge: 1000 });
                return res.redirect('/patient');
            }
        });
    } catch (err) {
        console.log(err)
    }
}

module.exports = deletePatient;