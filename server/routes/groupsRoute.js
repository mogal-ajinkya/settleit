const router = require("express").Router();
const Group = require("../models/groupsModel");
const authMiddleware = require("../middlewares/authMiddleware" );

router.post("/add-group", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Group(req.body);
    await newProduct.save();
    
    res.send({
      success: true,
      message: "Group added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// get all products
router.post("/get-groups",  authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({
      owner: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: groups,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get a product by id
router.get("/get-group-by-id/:id", async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("owner");
    res.send({
      success: true,
      data: group,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// edit a product
router.put("/edit-group/:id", authMiddleware, async (req, res) => {
    try {
      await Group.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        success: true,
        message: "Group updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  // delete a product
router.delete("/delete-group/:id", authMiddleware, async (req, res) => {
  try {
    await Group.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Group deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;

