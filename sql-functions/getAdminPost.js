const db = require('../database/db-config');
const express = require('express');
const app = express();

const getAdminPost = (req, res, next) => {
    try {
        db.query('SELECT * FROM admin_announcements', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const postsToRender = result
                req.adminPostsToRender = postsToRender
                return next();
                }
            });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getAdminPost;