import { Request, Response } from "express";
import confirmedReport from "../models";

async function searchReports(req: Request, res: Response): void {
  try {
    const allReports = await confirmedReport.findAll();
    const key = req.body.key.toLowerCase();

    // type this?
    const matchingReports = allReports.filter((report) => {
      return (
        report.productName.toLowerCase().includes(key) ||
        report.productCompany.toString().toLowerCase().includes(key)
      );
    });
    res.status(200).json(matchingReports);
  } catch (err) {
    console.log("SearchReports errored:", err);
    res.sendStatus(400);
  }
}

export { searchReports };

