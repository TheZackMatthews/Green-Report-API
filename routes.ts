const router = require("express").Router();

const {
  sendUnconfirmedReports,
  saveNewReport,
  deleteNewReport,
  approveNewReport,
} = require("./controllers/unverifiedReports");

const {
  getCategories,
  getSingleCategory,
} = require("./controllers/categories");

const { isSuperUser } = require("./controllers/checkAdminStatus");

const { searchReports } = require("./controllers/searchReports");

// Verify if the user has admin permissions
router.post("/authorise", isSuperUser);

router.get("/categories", getCategories);

router.get("/categories/:categoryName", getSingleCategory);

router.post("/newReport", saveNewReport);

router.get("/newReport", sendUnconfirmedReports);

router.post("/deleteReport", deleteNewReport);

router.post("/approveReport", approveNewReport);

router.post("/search", searchReports);

module.exports = router;
