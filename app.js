const express = require('express');
const app = express();
const db = require('./routes/db-config');
const loggedIn = require('./controllers/loggedIn');
const cookie = require('cookie-parser');
const router = require('./controllers/auth');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./controllers/auth"));
app.set('view engine', 'ejs');
app.use(cookie());
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.log(err);
        console.log('Error connecting to database');
    } else {
        console.log('Connected to MySQL');
    }
});

app.get('/', loggedIn, (req, res) => {
    if (req.user) {
        res.render('index', { user: req.user, status: 'loggedIN' });
    } else {
        res.render('index', { user: "not logged in", status: 'no' });
    }
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/login', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});