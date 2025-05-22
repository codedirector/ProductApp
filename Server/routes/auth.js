const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { name, email, password ,role } = req.body;
console.log(role);
  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
   
      const user = new User({ name, email, password, role });
    await user.save();

    res.send("Signup successful");
  } catch (err) {
    res.status(500).send("Error during signup");
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send("Invalid credentials");
    }

  
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).send("Error during login");
  }
});

module.exports = router;
