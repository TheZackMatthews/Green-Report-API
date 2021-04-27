'use strict';
const superList = require('../models/adminStatus');

async function isSuperUser(req, res) {
  try {
    const foundUser = await superList.findOne({
      where: {
        email:req.body.emailAddress
      }
    });
    if (foundUser) res.status(200).json('true');
    else res.status(206).json('false');
  } catch (err) {
    console.log('SendUnconfirmedReports errored:', err);
    res.status(500).json('false');
  }
}

async function addNewSuper(req, res) {
  const email = req.body.emailAddress;
  superList.sync().then(() => {
    return superList.create({
      email: email
    });
  });
  res.json(201);
}

module.exports = { isSuperUser, addNewSuper };
