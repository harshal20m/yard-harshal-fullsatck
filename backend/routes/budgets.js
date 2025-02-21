const express = require("express");
const { getBudgets, addBudget, updateBudget, deleteBudget } = require("../controllers/budgetController");

const router = express.Router();

router.get("/", getBudgets);
router.post("/", addBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

module.exports = router;
