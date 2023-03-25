// noinspection JSUnresolvedFunction,EqualityComparisonWithCoercionJS

const db = require('../database/db-config')
const express = require("express")
const app = express()

const addPost = (req, res) => {
    try {
        const postTitle = req.body.post_title;
        const postBody = req.body.post_body;
        const postType = req.body.post_type;

        if (postType === "general") {
            const sql = 'INSERT INTO general_announcements (announce_title, announce_body, sent_by) VALUES ( ? , ? , ? )'
            const values = [postTitle, postBody, "Admin1"]

            db.query(sql, values, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Post created successfully", { maxAge: 1000 });
                    return res.redirect('/');
                }
            });

        } else if (postType === "admin") {
            const sql = 'INSERT INTO admin_announcements (announce_title, announce_body, sent_by) VALUES ( ? , ? , ? )'
            const values = [postTitle, postBody, "Admin1"]

            db.query(sql, values, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.cookie("message", "Post created successfully", { maxAge: 1000 });
                    return res.redirect('/');
                }
            });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = addPost;