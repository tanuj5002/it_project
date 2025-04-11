const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc User registration
//@route POST /user/register
//@access public
const register = asyncHandler(async (req, res) => {
  const { fullName, phone, email, password, listings, savedItems } = req.body;
  if (!fullName || !email || !phone || !password) {
    res.status(401);
    throw new Error("All fields are mandatory");
  } else {
    chk = false;
    iitp = "iitp.ac.in";
    j = 0;
    for (i = 0; i < email.length; i++) {
      if (email[i] == "@") {
        chk = true;
      } else if (chk) {
        if (email[i] != iitp[j]) {
          chk = false;
          break;
        }
        j++;
      }
    }
    if (!chk) {
      res.status(400);
      throw new Error("Use college webmail ends with, @iitp.ac.in");
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(401);
      throw new Error("User already exists");
    }
    invalid_phone = false;
    for (i = 0; i < phone.length; i++) {
      if (!(phone[i] >= "0" && phone[i] <= "9")) {
        invalid_phone = true;
        break;
      }
    }
    if (phone.length != 10 || invalid_phone) {
      res.status(400);
      throw new Error("Phone number is not valid");
    }
    // user verification with OTP should be done here
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
      listings,
      savedItems
    });
    console.log("User registered");
    console.log(user);
    // res.json(user)
    if (user) {
      res.status(200).json({ _id: user._id, email: user.email });
      // res.json({message:"User registered"})
    } else {
      res.status(400);
      throw new Error("User details are invalid");
    }
  }
});

//@desc User login
//@route POST /user/register
//@access public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  }
  else{
    res.status(401)
    res.json({message:"Password invalid"})
  }
});

//@desc GET user details
//@route GET /user/:id
//@access public
const getUser = asyncHandler(async (req,res) =>{
  const user = await User.findById(req.params.id);
  if(!user)
    {
        res.status(404);
        throw new Error("User not found!");
    }
    res.json(user);
    console.log("Request for user details");
})

module.exports = {register, login, getUser};
