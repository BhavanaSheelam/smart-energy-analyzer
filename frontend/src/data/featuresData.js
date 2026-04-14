export const featureCards = [
  {
    slug: "real-time-monitoring",
    icon: "⚡",
    title: "Real-Time Monitoring",
    description: "Track your energy consumption in real-time with live updates."
  },
  {
    slug: "ai-powered-insights",
    icon: "🧠",
    title: "AI-Powered Insights",
    description: "Get intelligent recommendations to optimize your energy usage."
  },
  {
    slug: "cost-reduction",
    icon: "📉",
    title: "Cost Reduction",
    description: "Identify waste and reduce your electricity bills effectively."
  },
  {
    slug: "advanced-analytics",
    icon: "📊",
    title: "Advanced Analytics",
    description: "Visualize usage patterns with powerful charts and reports."
  },
  {
    slug: "smart-alerts",
    icon: "🔔",
    title: "Smart Alerts",
    description: "Receive alerts for unusual consumption patterns and issues."
  },
  {
    slug: "carbon-footprint",
    icon: "🌿",
    title: "Carbon Footprint",
    description: "Measure your environmental impact and save sustainably."
  }
];

export const featureDetails = {
  "real-time-monitoring": {
    badge: "Real-Time Monitoring",
    title: "Live Energy Consumption Dashboard",
    subtitle:
      "Monitor your energy consumption in real-time with live updates every second.",
    themeClass: "theme-blue",
    stats: [
      { label: "Current Power Usage", value: "3.76 kW" },
      { label: "Today's Total", value: "48.5 kWh" },
      { label: "Estimated Cost", value: "$7.28" },
      { label: "Active Devices", value: "5" }
    ],
    cards: [
      { title: "Air Conditioner", value: "1.5 kW", tag: "active" },
      { title: "Refrigerator", value: "0.8 kW", tag: "active" },
      { title: "Television", value: "0.3 kW", tag: "active" },
      { title: "Washing Machine", value: "1.2 kW", tag: "active" },
      { title: "Lighting", value: "0.4 kW", tag: "active" }
    ],
    infoBlocks: [
      {
        title: "Instant Visibility",
        text: "See exactly how much power you're consuming at any moment."
      },
      {
        title: "Anomaly Detection",
        text: "Detect unusual consumption patterns before they become costly."
      },
      {
        title: "Historical Comparison",
        text: "Compare real-time usage with previous consumption data."
      },
      {
        title: "Cost Tracking",
        text: "Get live cost estimates and stay within budget."
      }
    ]
  },

  "ai-powered-insights": {
    badge: "AI-Powered Insights",
    title: "Smart Recommendations for Energy Optimization",
    subtitle:
      "Our advanced AI analyzes your consumption patterns and gives personalized suggestions.",
    themeClass: "theme-purple",
    stats: [
      { label: "Potential Monthly Savings", value: "$103" },
      { label: "Energy Reduction", value: "28%" },
      { label: "Recommendations Found", value: "7" }
    ],
    cards: [
      { title: "Shift AC Usage to Off-Peak Hours", value: "$45/month", tag: "High Impact" },
      { title: "Replace Old Refrigerator", value: "$28/month", tag: "Medium Impact" },
      { title: "Optimize Washing Machine Settings", value: "$18/month", tag: "Medium Impact" },
      { title: "Install Smart Power Strips", value: "$12/month", tag: "Low Impact" }
    ],
    infoBlocks: [
      {
        title: "Peak Usage Pattern Detected",
        text: "Your consumption peaks between 6 PM - 9 PM, increasing cost."
      },
      {
        title: "Inefficient Appliance Alert",
        text: "Your water heater runs longer than required every day."
      },
      {
        title: "Seasonal Optimization",
        text: "Historical data shows 25% higher usage in warmer months."
      }
    ]
  },

  "cost-reduction": {
    badge: "Cost Reduction",
    title: "Reduce Your Energy Bills",
    subtitle:
      "Discover how much you can save with intelligent cost reduction strategies.",
    themeClass: "theme-green",
    stats: [
      { label: "Current Monthly Bill", value: "$195" },
      { label: "Optimized Bill", value: "$128" },
      { label: "Monthly Savings", value: "$67" },
      { label: "Annual Savings", value: "$804" }
    ],
    cards: [
      { title: "Air Conditioner", value: "$78/month", tag: "Current cost" },
      { title: "Water Heater", value: "$45/month", tag: "Current cost" },
      { title: "Refrigerator", value: "$32/month", tag: "Current cost" },
      { title: "Washing Machine", value: "$22/month", tag: "Current cost" },
      { title: "Lighting", value: "$18/month", tag: "Current cost" }
    ],
    infoBlocks: [
      {
        title: "Time-of-Use Optimization",
        text: "Shift heavy appliance usage to off-peak hours."
      },
      {
        title: "Appliance Upgrade Program",
        text: "Replace inefficient appliances with energy-efficient models."
      },
      {
        title: "Smart Automation",
        text: "Use timers and smart plugs to cut phantom power usage."
      }
    ]
  },

  "advanced-analytics": {
    badge: "Advanced Analytics",
    title: "Comprehensive Consumption Analytics",
    subtitle:
      "Understand your usage trends across daily, weekly and monthly timeframes.",
    themeClass: "theme-orange",
    stats: [
      { label: "Today's Usage", value: "38.5 kWh" },
      { label: "This Week", value: "313 kWh" },
      { label: "This Month", value: "1,620 kWh" },
      { label: "Avg. Daily", value: "44.7 kWh" }
    ],
    infoBlocks: [
      {
        title: "Peak Usage",
        text: "Your peak hours account for 35% of daily usage."
      },
      {
        title: "Weekend Usage",
        text: "Weekend usage is 15% higher than weekdays."
      },
      {
        title: "Optimization Opportunity",
        text: "Shift evening consumption to save $45/month."
      }
    ]
  },

  "smart-alerts": {
    badge: "Smart Alerts",
    title: "Intelligent Alert System",
    subtitle:
      "Stay informed about unusual consumption patterns and potential issues.",
    themeClass: "theme-red",
    stats: [
      { label: "Critical", value: "1" },
      { label: "High", value: "1" },
      { label: "Medium", value: "1" },
      { label: "Resolved", value: "2" }
    ],
    cards: [
      {
        title: "High Power Spike Detected",
        value: "Water Heater",
        tag: "critical"
      },
      {
        title: "Peak Hour Alert",
        value: "Multiple Devices",
        tag: "medium"
      },
      {
        title: "Energy Goal Achieved",
        value: "Overall",
        tag: "resolved"
      }
    ],
    infoBlocks: [
      {
        title: "Continuous High Consumption",
        text: "May indicate appliance wear or end-of-life."
      },
      {
        title: "Sudden Power Spikes",
        text: "Can indicate electrical issues or appliance malfunction."
      },
      {
        title: "Phantom Power Draw",
        text: "Standby devices waste 5-10% of electricity."
      },
      {
        title: "Peak Hour Overconsumption",
        text: "Using heavy appliances during expensive hours increases bills."
      }
    ]
  },

  "carbon-footprint": {
    badge: "Carbon Footprint",
    title: "Environmental Impact Dashboard",
    subtitle:
      "Monitor your carbon footprint and contribute to a sustainable future.",
    themeClass: "theme-eco",
    stats: [
      { label: "Total CO₂ Emissions", value: "407 kg" },
      { label: "Trees Needed to Offset", value: "18" },
      { label: "Carbon Offset This Month", value: "72 kg" },
      { label: "vs. Average Household", value: "-15%" }
    ],
    cards: [
      { title: "Equivalent to", value: "1,284 km", tag: "travel emissions" },
      { title: "Trees Planted", value: "3", tag: "offset program" },
      { title: "Reduction Goal", value: "25%", tag: "on track" }
    ],
    infoBlocks: [
      {
        title: "Switch to Renewable Energy",
        text: "Can reduce your carbon footprint by up to 80%."
      },
      {
        title: "Upgrade to Energy-Efficient Appliances",
        text: "Modern appliances use 25-30% less energy."
      },
      {
        title: "Optimize HVAC Usage",
        text: "Maintain HVAC system and use programmable thermostats."
      },
      {
        title: "Reduce Peak Hour Usage",
        text: "Off-peak usage reduces grid emissions."
      }
    ]
  }
};