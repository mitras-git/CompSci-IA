const db = require('../routes/db-config');
const jwt = require('jsonwebtoken');

const loggedIn = (req, res) => {
    // TODO: Fix user loggedin status
    if (!req.cookies.userRegistration) return next();
    try {
        const decoded = jwt.verify(req.cookies.userRegistration, 'mitraadvaitgarvsanyam');
        db.query('SELECT * FROM users WHERE id = ?', [decoded.id], (err, result) => {
            if (err) return next();
            req.user = result[0];
            return next();
        }); 
    } catch (err) {
        if (err) {
            console.log(err);
            console.log('Error connecting to database');
        } return next();
    }
}

module.exports = loggedIn;