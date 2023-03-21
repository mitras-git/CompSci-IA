// noinspection JSCheckFunctionSignatures,JSUnresolvedFunction

const express = require('express');
const app = express();
const db = require('./database/db-config');
const loggedIn = require('./controllers/loggedIn');
const addPatient = require('./sql-functions/add-patient')
const getPatientCount = require('./sql-functions/getPatientCount')
const getPillStockCount = require('./sql-functions/getPillStockCount')
const getPillAssignedCount = require('./sql-functions/getPillAssignedCount')
const getPillLowStock = require('./sql-functions/getPillLowStock')
const getHighAlertCount = require('./sql-functions/getHighAlertCount')
const getHighAlertList = require('./sql-functions/getHighAlertList')
const getTable = require('./sql-functions/getTable')
const getTablePill = require('./sql-functions/getTablePill')
const addPill = require('./sql-functions/add-pill')
const cookie = require('cookie-parser');
const path = require("path");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./controllers/auth"));
app.use("/update", require("./sql-functions/update"));
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

app.get('/', [loggedIn, getPatientCount, getPillStockCount, getHighAlertCount, getPillAssignedCount], (req, res) => {
    if (req.user) {
        res.render('index', { user: req.user, status: 'loggedIN', noPatients: req.patientCount, noPills: req.pillStockCount, noHighAlert: req.highAlertCount, noPillsAssigned: req.pillAssignedCount });
    } else {
        res.render('index', { user: "not logged in", status: 'no' });
    }
});

app.get('/patient', [loggedIn, getPatientCount, getHighAlertCount, getHighAlertList, getTable], (req, res) => {
    if (req.user) {
        res.render('patient', { user: req.user, status: 'loggedIN', noPatients: req.patientCount, noHighAlert: req.highAlertCount , patients: req.tableToRender, highAlertList: req.highAlertList });
    } else {
        res.redirect('/')
    }
});

app.get('/pill', [loggedIn, getPillStockCount, getHighAlertList, getTablePill, getPillAssignedCount, getPillLowStock], (req, res) => {
    if (req.user) {
        res.render('pill', { user: req.user, status: 'loggedIN', noPills: req.pillStockCount, noPillsAssigned: req.pillAssignedCount , pills: req.tableToRender, pillsLow: req.pillLowStock , highAlertList: req.highAlertList });
    } else {
        res.redirect('/')
    }
});

app.post('/addpatient', addPatient);
app.post('/addpill', addPill);

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