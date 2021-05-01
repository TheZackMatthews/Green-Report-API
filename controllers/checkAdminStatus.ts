import { Request, Response } from "express";
import { superList } from "../models/adminStatus";

async function isSuperUser(req: Request, res: Response): Promise<void> {
  try {
    const foundUser = await superList.findOne({
      where: {
        email: req.body.emailAddress,
      },
    });
    if (foundUser) res.status(200).json("true");
    else res.status(206).json("false");
  } catch (err) {
    console.log("SendUnconfirmedReports errored:", err);
    res.status(500).json("false");
  }
}

async function addNewSuper(req: Request, res: Response): Promise<void> {
  const email = req.body.emailAddress;
  superList.sync().then(() => {
    return superList.create({
      email: email,
    });
  });
  res.sendStatus(201);
}

export { isSuperUser, addNewSuper };
