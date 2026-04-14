const EnergyUsage = require("../models/EnergyUsage");

exports.addEnergyUsage = async (req, res) => {
  try {
    const { appliance, power, hours } = req.body;

    const energy = (power * hours) / 1000;
    const cost = energy * 7;

    let suggestion = "Good usage.";
    if (energy > 8) suggestion = "High consumption. Try reducing usage.";
    else if (energy > 4) suggestion = "Moderate usage. Consider optimization.";

    const entry = await EnergyUsage.create({
      userId: req.userId,
      appliance,
      power,
      hours,
      energy,
      cost,
      suggestion
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: "Could not add usage data" });
  }
};

exports.getAllEnergyUsage = async (req, res) => {
  try {
    const data = await EnergyUsage.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch usage data" });
  }
};