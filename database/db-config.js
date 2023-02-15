const sql = require('mysql');
const db = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sql_login'
});

module.exports = db;
