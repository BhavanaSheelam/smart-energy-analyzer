const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// CREATE REVIEW
router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, rating, message } = req.body;

    if (!userName || !userEmail || !rating || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const review = await Review.create({
      userName,
      userEmail,
      rating,
      message
    });

    res.status(201).json(review);
  } catch (error) {
    console.log("Create review error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL REVIEWS
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.log("Fetch review error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE REVIEW
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("Delete review error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;