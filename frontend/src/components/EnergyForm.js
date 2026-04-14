import React, { useState } from "react";
import "../App.css";

function EnergyForm() {
  const [appliance, setAppliance] = useState("");
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const energy = (Number(power) * Number(hours)) / 1000;
    const cost = energy * 7;

    let suggestion = "Good usage.";
    if (energy > 10) {
      suggestion = "High consumption. Try reducing usage.";
    } else if (energy > 5) {
      suggestion = "Moderate consumption. You can save more energy.";
    }

    setResult({
      appliance,
      energy: energy.toFixed(2),
      cost: cost.toFixed(2),
      suggestion,
    });
  };

  return (
    <div className="box">
      <div className="form-container">
        <h2>Energy Usage Input</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              required
              value={appliance}
              onChange={(e) => setAppliance(e.target.value)}
            />
            <span>Appliance Name</span>
            <i></i>
          </div>

          <div className="input-box">
            <input
              type="number"
              required
              value={power}
              onChange={(e) => setPower(e.target.value)}
            />
            <span>Power Rating (Watts)</span>
            <i></i>
          </div>

          <div className="input-box">
            <input
              type="number"
              required
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <span>Hours Used</span>
            <i></i>
          </div>

          <input type="submit" value="Analyze Energy" />
        </form>

        {result && (
          <div className="result-box">
            <h3>Analysis Result</h3>
            <p><strong>Appliance:</strong> {result.appliance}</p>
            <p><strong>Energy Consumed:</strong> {result.energy} kWh</p>
            <p><strong>Estimated Cost:</strong> ₹{result.cost}</p>
            <p><strong>Suggestion:</strong> {result.suggestion}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnergyForm;