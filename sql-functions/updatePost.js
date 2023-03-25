// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config');
const express = require('express');
const app = express();

const updatePost = (req, res) => {
    try {
        const title = req.body.post_title;
        const content = req.body.post_body;
        const id = req.body.post_id;
        const type = req.body.post_type;

        if (type == 'general') {
            const sql = 'UPDATE general_announcements SET announce_title = ?, announce_body = ? WHERE _id = ?'
            const values = [title, content, id]

            db.query(sql, values, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Post updated successfully", { maxAge: 1000 });
                    return res.redirect('/');
                }
            })
        } else {
            const sql = 'UPDATE admin_announcements SET announce_title = ?, announce_body = ? WHERE _id = ?'
            const values = [title, content, id]

            db.query(sql, values, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Post updated successfully", { maxAge: 1000 });
                    return res.redirect('/');
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = updatePost;