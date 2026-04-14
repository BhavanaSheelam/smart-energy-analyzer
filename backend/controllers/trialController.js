const User = require("../models/User");

exports.startTrial = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.trialActive) {
      return res.status(400).json({ message: "Trial already active" });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 14);

    user.trialActive = true;
    user.trialStartDate = startDate;
    user.trialEndDate = endDate;
    user.selectedPlan = "trial";
    user.subscriptionStatus = "trial";

    await user.save();

    res.json({
      message: "14-day free trial started successfully",
      trialStartDate: startDate,
      trialEndDate: endDate
    });
  } catch (error) {
    res.status(500).json({ message: "Could not start trial" });
  }
};

exports.getTrialStatus = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const today = new Date();
    let trialActive = user.trialActive;

    if (user.trialEndDate && today > user.trialEndDate) {
      trialActive = false;
      user.trialActive = false;
      await user.save();
    }

    res.json({
      plan: user.selectedPlan,
      trialActive,
      trialStartDate: user.trialStartDate,
      trialEndDate: user.trialEndDate,
      subscriptionStatus: user.subscriptionStatus
    });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch trial status" });
  }
};