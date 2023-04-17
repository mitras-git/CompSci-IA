// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express()


const add_pill = (req, res) => {
    try {
        const pill_name = req.body.pill_name;
        const quantity = req.body.quantity;
        var assigned_to = req.body.assigned_patients;
        const changeUser = req.body.changeMadeBy;

        if (Array.isArray(assigned_to)) {
            assigned_to = JSON.stringify(assigned_to);
        } else {
            assigned_to = JSON.stringify([assigned_to]);
        }

        const date = req.body.date;
        const lot_no = req.body.lot_no;

        db.query('SELECT name from pills WHERE name = ?', [pill_name], async (err, results) => {
            if (err) {
                console.log(err)
            } else {
                if (results.length > 0) {
                    res.cookie("message", "A pill with this name already exists", { maxAge:1000 });
                    return res.redirect('/pill');
                }
            }

            const sql = 'INSERT INTO pills (name, quantity, patients_assigned, date_of_purchase, lot_no, last_change) VALUES ( ? , ? , ? , ? , ?, ?)'
            const values = [pill_name, quantity, assigned_to, date, lot_no, changeUser]

            db.query(sql, values, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Pill registered successfully", { maxAge: 1000 });
                    return res.redirect('/pill');
                }
            })
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = add_pill;