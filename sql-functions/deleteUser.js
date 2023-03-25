const db = require('../database/db-config');
const express = require('express');
const app = express();

const deleteUser = (req, res) => {
    try {
        var idToDelete = req.body.userSelected;

        if (Array.isArray(idToDelete)) {
            idToDelete.forEach(id => {
                db.query('DELETE FROM users WHERE id = ?', id, (err) => {
                    if (err) {
                        console.log(err);
                    } else {}
                });
            });
            res.cookie('message', 'User deleted successfully', { maxAge: 1000 });
            return res.redirect('/');
        } else {
        db.query('DELETE FROM users WHERE id = ?', idToDelete, (err) => {
            if (err) {
                console.log(err);
            } else {
                res.cookie('message', 'User deleted successfully', { maxAge: 1000 });
                return res.redirect('/');
            }
        });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = deleteUser;