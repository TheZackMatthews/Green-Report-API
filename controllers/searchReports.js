'use strict';
const confirmedReport = require('../models/confirmedReport');

async function searchReports(req, res) {
  try {
    const allReports = await confirmedReport.findAll();
    const key = req.body.key.toLowerCase();
    const matchingReports = allReports.filter(
      report => {
        return report.productName.toLowerCase().includes(key) ||
        report.productCompany.toString().toLowerCase().includes(key)
      }
    );
    console.log(key, matchingReports)
    res.status(200).json(matchingReports);
  } catch (err) {
    console.log('SearchReports errored:', err)
    res.sendStatus(400);
  }
}

module.exports = { searchReports }