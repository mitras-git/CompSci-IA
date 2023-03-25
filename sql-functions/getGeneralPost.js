const db = require('../database/db-config');
const express = require('express');
const app = express();
const router = express.Router();
const _ = require('lodash');
const ejs = require('ejs');

const getGeneralPost = (req, res, next) => {
    try {
        db.query('SELECT * FROM general_announcements', (err, result) => {
            if (err) {
                console.log(err);
            } else {
                const postsToRender = result
                req.postsToRender = postsToRender
                return next();
                }
            });
    } catch (err) {
        console.log(err);
        return next(err);
    }
}

module.exports = getGeneralPost;