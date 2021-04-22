// -- This lives in our routes.js --
'use strict';
//const express = require('express');
const router = require('express').Router();

router.get('/', getRoot);

function getRoot(req, res) {
  res.status(200);
  res.send('hello express');
}

module.exports = router;
