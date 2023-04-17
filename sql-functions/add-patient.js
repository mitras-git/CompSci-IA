// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express()

const add_patient = (req, res) => {
    try {
        console.log(req.body)
        const patient_name = req.body.patient_fullname;
        const family = req.body.family;
        const date = req.body.date;
        const changeUser = req.body.changeMadeBy;
        const insurance = req.body.insurance;

        db.query('SELECT name from patients WHERE name = ?', [patient_name], async (err, results) => {
            if (err) {
                console.log(err)
            } else {
                if (results.length > 0) {
                    res.cookie("message", "A patient with this name already exists", { maxAge:1000 });
                    return res.render('patient', { user: req.user, status: 'loggedIN' });
                }
            }

            const sql = 'INSERT INTO patients (name, family, date_of_admission, last_change, insurance_number) VALUES ( ? , ? , ?, ?, ?)'
            const values = [patient_name, family, date, changeUser, insurance]

            db.query( sql, values , (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Patient registered successfully", { maxAge: 1000 });
                    return res.redirect('/patient');
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = add_patient;