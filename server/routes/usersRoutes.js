const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");


// new user registration
router.post("/register", async (req, res) => {
    try {
      // check if user already exists
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new Error("User email already exists");
      }
  
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
      // save user
      const newUser = new User(req.body);
      await newUser.save();
      res.send({
        success: true,
        message: "User created successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });
  

// user login 
router.post("/login",async (req,res)=> {
  try{
    const user = await User.findOne({email : req.body.email});
    if(!user){
      throw new Error("user not found");
    } 
    //  // if user is active
    //  if (user.status !== "active") {
    //   throw new Error("The user account is blocked , please contact admin");
    // }
    // compare pass 
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if(!validPassword){
      throw new Error("Invalid password");
    }

    // create and assign token 

    const token = jwt.sign({userId:user._id},process.env.jwt_secret);
    
    res.send({
      success:true,
      message :"User logged in sucessfully",
      data : token,
    })
  } catch (error){
    res.send({
      sucess : false,
      message : error.message,
    })
  }
})



// get current user
router.get("/get-current-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    console.log(user);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;