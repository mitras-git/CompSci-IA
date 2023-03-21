// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require('express');
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, '..', "public")));

const updatePatient = (req, res) => {
    try {
        const name = req.body.patient_fullname;
        const pillsAssigned = req.body.pillsAssigned;
        const family = req.body.family
        const date = req.body.date;
        const onHighAlert = req.body.on_high_alert_select;
        const id = req.body.pID;

        const sql = 'UPDATE patients SET name = ?, pills_assigned = ?, family = ?, date_of_admission = ?, on_high_alert = ? WHERE Patient_id = ?'
        const values = [name, pillsAssigned, family, date, onHighAlert, id ]

        db.query(sql, values, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie("message", "Patient updated successfully", { maxAge: 1000 });
                return res.redirect('/patient');
            }
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = updatePatient;