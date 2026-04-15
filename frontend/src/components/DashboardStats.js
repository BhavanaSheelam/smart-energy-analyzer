import React from "react";
import { FaBolt, FaDollarSign, FaArrowDown, FaLeaf } from "react-icons/fa";

function DashboardStats({ totals }) {
  const cards = [
    {
      title: "Daily Usage",
      value: `${totals.dailyUsage} kWh`,
      sub: `${totals.dailyUsage} kWh/month`,
      change: "",
      icon: <FaBolt />,
      bg: "#e9f0ff"
    },
    {
      title: "Monthly Bill",
      value: `$${totals.monthlyBill}`,
      sub: `$${(Number(totals.monthlyBill) * 12).toFixed(2)}/year`,
      change: "",
      icon: <FaDollarSign />,
      bg: "#e7f7ed"
    },
    {
      title: "Potential Savings",
      value: `$${totals.potentialSavings}`,
      sub: "Up to 35% reduction",
      change: "",
      icon: <FaArrowDown />,
      bg: "#fff1e7"
    },
    {
      title: "CO₂ Emissions",
      value: `${totals.co2} kg`,
      sub: "per month",
      change: "",
      icon: <FaLeaf />,
      bg: "#e9f8ef"
    }
  ];

  return (
    <div className="dashboard-stats">
      {cards.map((card, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-top">
            <div className="stat-icon" style={{ background: card.bg }}>
              {card.icon}
            </div>
            <span style={{ color: "#64748b", fontSize: "16px" }}>{card.change}</span>
          </div>

          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
          <p>{card.sub}</p>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;