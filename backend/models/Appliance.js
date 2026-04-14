const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    power: {
      type: Number,
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    dailyKwh: {
      type: Number,
      required: true
    },
    monthlyCost: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appliance", applianceSchema);