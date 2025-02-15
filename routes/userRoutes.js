const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, email, designation } = req.body;
    const newUser = new User({ username, email, designation });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Error creating user" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const { username, email, designation } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, designation },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
