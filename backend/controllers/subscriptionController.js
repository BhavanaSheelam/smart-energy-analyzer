const Subscription = require("../models/Subscription");
const User = require("../models/User");

exports.createSubscription = async (req, res) => {
  try {
    const { planId, paymentMethod } = req.body;

    if (!planId || !paymentMethod) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const subscription = await Subscription.create({
      userId: req.userId,
      planId,
      paymentMethod,
      paymentStatus: "paid",
      subscriptionStatus: "active"
    });

    await User.findByIdAndUpdate(req.userId, {
      selectedPlan: planId,
      subscriptionStatus: "active",
      trialActive: false
    });

    res.status(201).json({
      message: "Subscription activated successfully",
      subscription
    });
  } catch (error) {
    res.status(500).json({ message: "Subscription creation failed" });
  }
};