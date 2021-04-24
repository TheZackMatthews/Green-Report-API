// -- This lives in our routes.js --
'use strict';
//const express = require('express');
const router = require('express').Router();
const { sendUnconfirmedReports, saveNewReport } = require('./controllers/newReport');

// Verify if the user has admin permissions
// router.post('/authorise', )

// router.get('/categories', )

// router.get('/categories/:categoryName', )

router.post('/newReport', saveNewReport);

router.get('/newReport', sendUnconfirmedReports);

module.exports = router;
