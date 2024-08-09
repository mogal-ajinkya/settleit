const router = require("express").Router();
const Product = require("../models/productModels");
const Group = require("../models/groupsModel");
const authMiddleware = require("../middlewares/authMiddleware" );
// const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");
const User = require("../models/userModel");
const Notification = require("../models/notificationsModel");

router.post("/add-product", authMiddleware, async (req, res) => {
  try {
    const newProduct = new Group(req.body);
    await newProduct.save();
    
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// get all products
router.post("/get-products",  authMiddleware, async (req, res) => {
  try {
    console.log("thiw")
    console.log(req.body)
    const products = await Group.find({
      owner: req.body.userId,
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

// get a product by id
router.get("/get-product-by-id/:id", async (req, res) => {
  try {
    const product = await Group.findById(req.params.id).populate("owner");
    res.send({
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// edit a product
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
    try {
      await Group.findByIdAndUpdate(req.params.id, req.body);
      res.send({
        success: true,
        message: "Product updated successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });


  // delete a product
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// handle image upload to cloudinary 
// get image from pc
// const storage = multer.diskStorage({
//   filename: function (req, file, callback) {
//     callback(null, Date.now() + file.originalname);
//   },
// });
// router.post("/upload-image-to-product",authMiddleware, multer({ storage: storage }).single("file"),async (req, res) => {
//       try {
//           // upload image to cloudinary
//           const result = await cloudinary.uploader.upload(req.file.path, {
//             folder: "pictolx",
//           });

//           const productId = req.body.productId;
//           await Product.findByIdAndUpdate(productId, {
//             $push: { images: result.secure_url },
//           });
//           res.send({
//             success: true,
//             message: "Image uploaded successfully",
//             data: result.secure_url,
//           });
//       } catch (error) {
//           res.send({
//             success: false,
//             message: error.message,
//           });
//       }

// });



// update product status
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      status,
    });

    // send notification to seller
    const newNotification = new Notification({
      user: updatedProduct.seller,
      message: `Your product ${updatedProduct.name} has been ${status}`,
      title: "Product Status Updated",
      onClick: `/profile`,
      read: false,
    });

    await newNotification.save();
    res.send({
      success: true,
      message: "Product status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});



module.exports = router;

