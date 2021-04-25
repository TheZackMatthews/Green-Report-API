// -- This lives in our routes.js --
'use strict';
//const express = require('express');
const router = require('express').Router();
const { sendUnconfirmedReports, saveNewReport } = require('./controllers/newReport');
const { getCategories } = require('./controllers/categories');

// Verify if the user has admin permissions
// router.post('/authorise', )

router.get('/categories', getCategories);

// router.get('/categories/:categoryName', )

router.post('/newReport', saveNewReport);

router.get('/newReport', sendUnconfirmedReports);

module.exports = router;
