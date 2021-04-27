// -- This lives in our routes.js --
'use strict';
//const express = require('express');
const router = require('express').Router();
const {
  sendUnconfirmedReports,
  saveNewReport,
  deleteNewReport,
  approveNewReport
} = require('./controllers/unverifiedReports');
const { getCategories } = require('./controllers/categories');
const { isSuperUser } = require('./controllers/checkAdminStatus');

// Verify if the user has admin permissions
router.post('/authorise', isSuperUser);

router.get('/categories', getCategories);

// router.get('/categories/:categoryName', )

router.post('/newReport', saveNewReport);

router.get('/newReport', sendUnconfirmedReports);

router.post('/deleteReport', deleteNewReport);

router.post('/approveReport', approveNewReport);

module.exports = router;
