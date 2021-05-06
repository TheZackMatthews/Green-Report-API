import express from "express";

import {
  sendUnconfirmedReports,
  saveNewReport,
  deleteNewReport,
  approveNewReport,
} from "./controllers/unverifiedReports";

import { getCategories, getSingleCategory } from "./controllers/categories";

import {
  isSuperUser,
  addNewSuper,
  deleteSuper,
} from "./controllers/checkAdminStatus";

import { searchReports } from "./controllers/searchReports";

const router = express.Router();
// Verify if the user has admin permissions
router.post("/authorise", isSuperUser);

//router.get("/categories", getCategories);

//router.get("/categories/:categoryName", getSingleCategory);

router.post("/newReport", saveNewReport);

router.get("/newReport", sendUnconfirmedReports);

router.post("/deleteReport", deleteNewReport);

router.post("/approveReport", approveNewReport);

router.post("/search", searchReports);
router.post("/addNewSuper", addNewSuper);
router.post("/deleteSuper", deleteSuper);

export { router };
