import React, { useState } from "react";

function AddApplianceForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    power: "",
    hours: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const powerValue = Number(form.power);
    const hoursValue = Number(form.hours);

    if (!form.name.trim()) {
      alert("Please enter appliance name");
      return;
    }

    if (powerValue <= 0) {
      alert("Power rating must be greater than 0");
      return;
    }

    if (hoursValue <= 0 || hoursValue > 24) {
      alert("Hours used per day must be between 1 and 24");
      return;
    }

    onAdd({
      name: form.name,
      power: powerValue,
      hours: hoursValue
    });

    setForm({
      name: "",
      power: "",
      hours: ""
    });
  };

  return (
    <div className="form-card">
      <h3>＋ Add Appliance</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Appliance Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Refrigerator"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Power Rating (Watts)</label>
            <input
              type="number"
              name="power"
              placeholder="e.g., 150"
              value={form.power}
              onChange={handleChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Hours Used/Day</label>
            <input
              type="number"
              name="hours"
              placeholder="e.g., 24"
              min="1"
              max="24"
              step="0.1"
              value={form.hours}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary-btn" style={{ height: "54px" }}>
            Add Appliance
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddApplianceForm;