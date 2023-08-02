// noinspection JSCheckFunctionSignatures,JSUnresolvedFunction

const express = require('express');
const app = express();
const db = require('./database/db-config');
const loggedIn = require('./controllers/loggedIn');
const getGeneralPost = require('./sql-functions/getGeneralPost');
const getAdminPost = require('./sql-functions/getAdminPost');
const addPatient = require('./sql-functions/add-patient')
const getPatientCount = require('./sql-functions/getPatientCount')
const getPillStockCount = require('./sql-functions/getPillStockCount')
const getPillAssignedCount = require('./sql-functions/getPillAssignedCount')
const getPillLowStock = require('./sql-functions/getPillLowStock')
const getHighAlertCount = require('./sql-functions/getHighAlertCount')
const getHighAlertList = require('./sql-functions/getHighAlertList')
const getTable = require('./sql-functions/getTable')
const getTablePill = require('./sql-functions/getTablePill')
const getUsers = require('./sql-functions/getUsers')
const addPill = require('./sql-functions/add-pill')
const addPost = require('./sql-functions/addPost')
const cookie = require('cookie-parser');
const path = require("path");
const _ = require('lodash');

const port = 3000;

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
        console.log('Connected to MySQL as ID: ' + db.threadId);
    }
});

app.get('/', [loggedIn, getPatientCount, getPillStockCount, getHighAlertCount, getPillAssignedCount, getGeneralPost, getAdminPost, getUsers], (req, res) => {
    if (req.user) {
        res.render('index', { user: req.user, status: 'loggedIN', noPatients: req.patientCount, noPills: req.pillStockCount, users: req.usersToRender ,noHighAlert: req.highAlertCount, noPillsAssigned: req.pillAssignedCount, posts: req.postsToRender, adminPosts: req.adminPostsToRender });
    } else {
        res.render('index', { user: "not logged in", status: 'no' });
    }
});

app.get('/patient', [loggedIn, getPatientCount, getPillStockCount, getHighAlertCount, getHighAlertList, getTable], (req, res) => {
    if (req.user) {
        res.render('patient', { user: req.user, status: 'loggedIN', noPills: req.pillStockCount, noPatients: req.patientCount, noHighAlert: req.highAlertCount , patients: req.tableToRender, highAlertList: req.highAlertList });
    } else {
        res.redirect('/')
    }
});

app.get('/pill', [loggedIn, getPillStockCount, getHighAlertList, getTablePill, getPillAssignedCount, getPillLowStock, getTable], (req, res) => {
    if (req.user) {
        res.render('pill', { user: req.user, status: 'loggedIN', noPills: req.pillStockCount, noPillsAssigned: req.pillAssignedCount , patients:req.tableToRender, pills: req.pillTableToRender, pillsLow: req.pillLowStock , highAlertList: req.highAlertList });
    } else {
        res.redirect('/')
    }
});

app.get('/post/:postName', [loggedIn, getGeneralPost], (req, res) => {
    if (req.user) {
        res.render('post', { user: req.user, status: 'loggedIN', postTitle: req.postTitle, postBody: req.postBody });
    } else {
        res.redirect('/')
    }
});

app.post('/addpatient', addPatient);
app.post('/addpill', addPill);
app.post('/addpost', addPost);

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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
