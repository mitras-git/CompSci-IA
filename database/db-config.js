const sql = require('mysql');
const db = sql.createConnection({
    host: '64.225.104.240',
    user: 'root',
    password: 'Alpha2023!',
    database: 'sql_login'
});

module.exports = db;
