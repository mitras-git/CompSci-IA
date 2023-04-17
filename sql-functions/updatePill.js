// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require('express');
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, '..', "public")));

const updatePill = (req, res) => {
    try {
        console.log(req.body)
        const name = req.body.pill_name;
        const reqQuantity = req.body.quantity;
        const quantity = parseInt(reqQuantity);
        const patients_assigned = req.body.patients_assinged;
        const date = req.body.date;
        const changeBy = req.body.changeMadeBy
        const lot_no = req.body.lot_no;

        const sql = 'UPDATE pills SET quantity = ?, patients_assigned = ?, date_of_purchase = ?, lot_no = ?, last_change = ? WHERE name = ?'
        const values = [quantity, patients_assigned, date, lot_no, changeBy ,name]

        db.query(sql, values, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie("message", "Pill updated successfully", { maxAge: 1000 });
                return res.redirect('/pill');
            }
        });

    } catch (err) {
        console.log(err)
    }
}

module.exports = updatePill;