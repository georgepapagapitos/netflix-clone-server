const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verifyToken = require("../verifyToken");

// UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {

    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString();
    }

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can only modify your account");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can only delete your own account");
  }
});

// GET
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get("/", verifyToken, async (req, res) => {
  const query = req.query.new;
  if (req.user.isAdmin) {
    try {
      const users = query ? await User.find({}).sort({ _id: -1 }).limit(10) : await User.find({});
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not authorized to view users");
  }
});

// GET USER STATS

module.exports = router;