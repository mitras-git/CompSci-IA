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

        db.query('SELECT name from patients WHERE name = ?', [patient_name], async (err, results) => {
            if (err) {
                console.log(err)
            } else {
                if (results.length > 0) {
                    res.cookie("message", "A patient with this name already exists", { maxAge:1000 });
                    return res.render('patient', { user: req.user, status: 'loggedIN' });
                }
            }
            //INSERT INTO `patients` (`name`, `pills_assigned`, `family`, `date_of_admission`, `Patient_id`) VALUES ('erty', NULL, 'someone, someone2', '2023-03-01', NULL)

            const sql = 'INSERT INTO patients (name, family, date_of_admission) VALUES ( ? , ? , ?)'
            const values = [patient_name, family, date]

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