const express = require("express");
const Appliance = require("../models/Appliance");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const COST_PER_UNIT = 6;

router.get("/", protect, async (req, res) => {
  try {
    const appliances = await Appliance.find({ user: req.user }).sort({ createdAt: -1 });
    res.json(appliances);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appliances" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { name, power, hours } = req.body;

    const dailyKwh = ((Number(power) * Number(hours)) / 1000).toFixed(2);
    const monthlyCost = (dailyKwh * 30 * COST_PER_UNIT).toFixed(2);

    const appliance = await Appliance.create({
      user: req.user,
      name,
      power,
      hours,
      dailyKwh,
      monthlyCost
    });

    res.status(201).json(appliance);
  } catch (error) {
    res.status(500).json({ message: "Failed to add appliance" });
  }
});

router.delete("/:id", protect, async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);

    if (!appliance) {
      return res.status(404).json({ message: "Appliance not found" });
    }

    if (appliance.user.toString() !== req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await appliance.deleteOne();
    res.json({ message: "Appliance removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete appliance" });
  }
});

module.exports = router;