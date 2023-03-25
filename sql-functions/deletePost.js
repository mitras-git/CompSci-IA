// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require('express');
const app = express();

const deletePost = (req, res) => {
    try {
        const idToDelete = req.body.deleteID;
        const typeToDelete = req.body.deleteType;

        if (typeToDelete == 'general') {
            db.query('DELETE FROM general_announcements WHERE _id = ?', idToDelete, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie('message', 'Post deleted successfully', { maxAge: 1000 });
                    return res.redirect('/');
                }
            });
        } else {
            db.query('DELETE FROM admin_announcements WHERE _id = ?', idToDelete, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie('message', 'Post deleted successfully', { maxAge: 1000 });
                    return res.redirect('/');
                }
            });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = deletePost;