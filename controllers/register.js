const db = require('../routes/db-config');
const bcrypt = require('bcryptjs');

const register = (req, res) => {
    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT email from users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            if (results.length > 0) {
                return res.json({
                    message: 'The email is already in use'
                })
            } else if (password != passwordConfirm) {
                return res.json({ message: 'Passwords do not match' });
            }
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', { name: name, email: email, password: hashedPassword }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                return res.json({ message: 'User registered' });
            }
        })
    })
}

module.exports = register;