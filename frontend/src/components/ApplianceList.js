import React from "react";
import { FaTrash } from "react-icons/fa";

function ApplianceList({ appliances, onDelete }) {
  if (appliances.length === 0) {
    return (
      <div className="empty-card" style={{ marginTop: "22px" }}>
        <div style={{ fontSize: "70px", marginBottom: "20px", color: "#9aa4b2" }}>⚡</div>
        <h3 style={{ fontSize: "26px", marginBottom: "16px", color: "#0f172a" }}>
          No Appliances Added Yet
        </h3>
        <p style={{ fontSize: "18px" }}>
          Start by adding your household appliances to analyze your energy consumption
        </p>
      </div>
    );
  }

  return (
    <div className="list-card" style={{ marginTop: "22px" }}>
      <h3>Your Appliances</h3>

      {appliances.map((item) => (
        <div className="appliance-item" key={item._id}>
          <div className="appliance-left">
            <h4>{item.name}</h4>
            <p>
              {item.power}W • {item.hours}h/day
            </p>
          </div>

          <div className="appliance-right">
            <div className="appliance-energy">
              <h4>{Number(item.dailyKwh).toFixed(2)} kWh/day</h4>
              <p>${Number(item.monthlyCost).toFixed(2)}/month</p>
            </div>

            <button className="delete-btn" onClick={() => onDelete(item._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplianceList;