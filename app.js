// noinspection JSCheckFunctionSignatures,JSUnresolvedFunction

const express = require('express');
const app = express();
const db = require('./database/db-config');
const loggedIn = require('./controllers/loggedIn');
const addPatient = require('./sql-functions/add-patient')
const getPatientCount = require('./sql-functions/getPatientCount')
const getTable = require('./sql-functions/getTable')
const addPill = require('./sql-functions/add-pill')
const cookie = require('cookie-parser');
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/', [loggedIn, getPatientCount], (req, res) => {
    if (req.user) {
        res.render('index', { user: req.user, status: 'loggedIN', noPatients: req.patientCount });
    } else {
        res.render('index', { user: "not logged in", status: 'no' });
    }
});

app.get('/patient', [loggedIn, getPatientCount, getTable], (req, res) => {
    if (req.user && req.patientCount && req.tableToRender) {
        res.render('patient', { user: req.user, status: 'loggedIN', noPatients: req.patientCount, patients: req.tableToRender });
    } else {
        res.redirect('/')
    }
});

app.post('/addpatient', addPatient);

app.get('/test', loggedIn, (req, res) => {
    if (req.user) {
        res.render('test', { user: req.user, status: 'loggedIN' });
    } else {
        res.render('test', { user: "not logged in", status: 'no' });
    }
});

app.get('/profile', loggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', { user: req.user, status: 'loggedIN' });
    } else {
        res.render('index', { user: "not logged in", status: 'no' });
    }
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.listen(3000, () => {
    console.log('App listening on port 3000');
});