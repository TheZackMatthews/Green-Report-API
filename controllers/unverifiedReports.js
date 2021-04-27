'use strict';
const newReport = require('../models/newReport');
const superList = require('../models/adminStatus');

async function sendUnconfirmedReports(req, res) {
  try {
    const allReports = await newReport.findAll();
    console.log(allReports)
    res.status(200).json(allReports);
  } catch (err) {
    console.log('SendUnconfirmedReports errored:', err)
    res.sendStatus(400);
  }
}

async function saveNewReport(req, res) {
  const reportFromClient = req.body;
  newReport.sync().then(() => {
    return newReport.create({
      productName: reportFromClient.productName,
      productCompany: reportFromClient.productCompany,
      productCategory: reportFromClient.productCategory,
      reasonForFlagging: reportFromClient.reasonForFlagging,
      contributedBy: reportFromClient.contributedBy
    });
  });
  res.json(201);
}

async function deleteNewReport(req, res) {
  // Verify the user that made the request has sufficient permissions
  try {
    const foundUser = await superList.findOne({
      where: {
        email:req.body.emailAddress
      }
    });
    if (!foundUser) res.sendStatus(401);
  } catch (err) {
    console.log('DeleteNewReport errored during authentication:', err);
    res.sendStatus(500);
  }
  // Perform the delete operation
  try {
    await newReport.destroy({
      where: {
        id: req.body.id
      },
      force: true
    });
    res.sendStatus(200);
  } catch (err) {
    console.log('DeleteNewReport errored during deletion:', err);
    res.sendStatus(500);
  }
}
module.exports = {
  sendUnconfirmedReports,
  saveNewReport,
  deleteNewReport
};
