const express = require('express');
const updatePatient = require('./updatePatient');
const deletePatient = require('./deletePatient');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '..' ,'public')));

app.post('/patient', updatePatient)
app.post('/patientDelete', deletePatient)
app.post('/pill')

module.exports = app;