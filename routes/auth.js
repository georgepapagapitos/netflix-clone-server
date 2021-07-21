const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const newUser = new User({
    username,
    password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString(),
    email
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err)
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("Wrong password or username");

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: "5d" });

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password && res.status(401).json("Wrong password or username");

    const { password, ...userInfo } = user._doc;

    res.status(200).json(userInfo);

  } catch (err) {
    res.status(500).json()
  }
});

module.exports = router;
