const newReport = require('../models/newReport');

async function sendUnconfirmedReports(req, res) {
  try {
    const allReports = await newReport.findAll();
    console.log(allReports)
    res.status(200).json(allReports);
  } catch (err) {
    console.log('SendUnconfirmedReports errored:', err)
  }
}

async function saveNewReport(req, res) {
  const reportFromClient = req.body;
  newReport.sync().then(() => {
    return newReport.create({
      productName: reportFromClient.productName,
      productCategory: reportFromClient.productCategory,
      productCompany: reportFromClient.productCompany,
      reasonForFlagging: reportFromClient.reasonForFlagging,
      contributedBy: reportFromClient.contributedBy
    });
  });
  res.json(201);
}

module.exports = {
  sendUnconfirmedReports,
  saveNewReport
};
