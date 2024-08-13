const router = require("express").Router();
const Expense = require("../models/expenseModel");
const authMiddleware = require("../middlewares/authMiddleware" );


router.post("/add-expense", authMiddleware, async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    console.log(newExpense);
    await newExpense.save();
    res.send({
      success: true,
      message: "Expense added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a Expense by id
router.get("/get-expense-by-grpid/:id", async (req, res) => {
  try {
    const expense = await Expense.find({groupId:req.params.id});
    res.send({
      success: true,
      data: expense,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.post("/get-expenses",  authMiddleware, async (req, res) => {
  try {
    const products = await Expense.find({
      groupId:req.body.groupId,
      type:req.body.type
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// edit a Expense
router.put("/edit-expense/:id", authMiddleware, async (req, res) => {
    try {
      await Expense.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        success: true,
        message: "Expense updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  // delete a Expenses
router.delete("/delete-expense/:id", authMiddleware, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

