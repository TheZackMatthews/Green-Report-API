import { Request, Response } from "express";
import { newReport } from "../models/newReport";
import { superList } from "../models/adminStatus";
import { confirmedReport } from "../models/confirmedReport";

async function sendUnconfirmedReports(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const allReports = await newReport.findAll();
    res.status(200).json(allReports);
  } catch (err) {
    console.log("SendUnconfirmedReports errored:", err);
    res.sendStatus(400);
  }
}

async function saveNewReport(req: Request, res: Response): Promise<void> {
  const reportFromClient = req.body;
  newReport.sync().then(() => {
    return newReport.create({
      productName: reportFromClient.productName,
      productCompany: reportFromClient.productCompany,
      productCategory: reportFromClient.productCategory,
      reasonForFlagging: reportFromClient.reasonForFlagging,
      contributedBy: reportFromClient.contributedBy,
    });
  });
  res.sendStatus(201);
}

async function deleteNewReport(req: Request, res: Response): Promise<void> {
  // Verify the user that made the request has sufficient permissions
  try {
    const foundUser = await superList.findOne({
      where: {
        email: req.body.emailAddress,
      },
    });
    if (!foundUser) res.sendStatus(401);
  } catch (err) {
    console.log("DeleteNewReport errored during authentication:", err);
    res.sendStatus(500);
  }
  // Perform the delete operation
  try {
    await newReport.destroy({
      where: {
        id: req.body.id,
      },
      force: true,
    });
    res.sendStatus(200);
  } catch (err) {
    console.log("DeleteNewReport errored during deletion:", err);
    res.sendStatus(500);
  }
}

async function approveNewReport(req: Request, res: Response): Promise<void> {
  console.log("approveNewReport", req, res);
  // Verify the user that made the request has sufficient permissions
  try {
    const foundUser = await superList.findOne({
      where: {
        email: req.body.emailAddress,
      },
    });
    if (!foundUser) res.sendStatus(401);
  } catch (err) {
    console.log("ApproveNewReport errored during authentication:", err);
    res.sendStatus(500);
  }
  // Move the entry from newReport table to confirmedReport table
  try {
    const reportToMigrate = await newReport.findOne({
      where: {
        id: req.body.id,
      },
    });
    await newReport.destroy({
      where: {
        id: req.body.id,
      },
    });
    confirmedReport.sync().then(() => {
      return confirmedReport.create({
        productName: reportToMigrate!.productName,
        productCompany: reportToMigrate!.productCompany,
        productCategory: reportToMigrate!.productCategory,
        reasonForFlagging: reportToMigrate!.reasonForFlagging,
        contributedBy: reportToMigrate!.contributedBy,
      });
    });
    res.sendStatus(201);
  } catch (err) {
    console.log("approveNewReport errored during migration of data", err);
    res.sendStatus(500);
  }
}

export {
  sendUnconfirmedReports,
  saveNewReport,
  deleteNewReport,
  approveNewReport,
};
