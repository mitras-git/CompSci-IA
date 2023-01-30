const jwt = require('jsonwebtoken');
const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const login = (req, res) => {
    try {
        const { email, pass } = req.body;
        if (!email || !pass) {
            return res.json({ status: "error", error: "Please provide an email and password" })
        }
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            console.log(results);
            if (!results || !results[0] || !await bcrypt.compare(pass, results[0].password)) {
                res.json({ status: "error", error: "Email or password is incorrect" })
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, "mitrasanyamgarvadavit", {
                    expiresIn: 1
                });

                console.log("the token is " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }
                res.cookie('userSave', token, cookieOptions);
                return res.json({ status: "success", success:"User has been logged in", data: token });
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = login;