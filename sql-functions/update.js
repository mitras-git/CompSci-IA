const express = require('express');
const updatePatient = require('./updatePatient');
const deletePatient = require('./deletePatient');
const updatePill = require('./updatePill');
const deletePill = require('./deletePill');
const updatePost = require('./updatePost');
const deletePost = require('./deletePost');
const deleteUser = require('./deleteUser');
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '..' ,'public')));

app.post('/patient', updatePatient)
app.post('/patientDelete', deletePatient)
app.post('/pill', updatePill)
app.post('/pillDelete', deletePill)
app.post('/post', updatePost)
app.post('/postDelete', deletePost)
app.post('/deleteUser', deleteUser)

module.exports = app;