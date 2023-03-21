const express = require('express');
const updatePatient = require('./updatePatient');
const deletePatient = require('./deletePatient');
const updatePill = require('./updatePill');
const deletePill = require('./deletePill');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '..' ,'public')));

app.post('/patient', updatePatient)
app.post('/patientDelete', deletePatient)
app.post('/pill', updatePill)
app.post('/pillDelete', deletePill)

module.exports = app;