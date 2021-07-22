const router = require("express").Router();
const List = require("../models/List");
const verifyToken = require("../verifyToken");

// CREATE
router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Not authorized");
  }
});

// DELETE
router.delete("/:id", verifyToken, async (req, res) => {

});

// GET 