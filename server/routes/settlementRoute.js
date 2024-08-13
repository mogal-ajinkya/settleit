const router = require("express").Router();
const Expense = require("../models/expenseModel");
const authMiddleware = require("../middlewares/authMiddleware" );
const settleDebts = require("../services/settlementService");

router.get("/get-settlement/:id",  authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({groupId:req.params.id});
    const settlements = settleDebts(expenses);

    res.send({
      success: true,
      data: settlements,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



module.exports = router;

