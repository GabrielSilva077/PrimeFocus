const express = require("express");
const { sendBudgetRequest } = require("../controllers/budget.controller.js");

const router = express.Router();

router.post("/send-budget", sendBudgetRequest);

module.exports = router;
