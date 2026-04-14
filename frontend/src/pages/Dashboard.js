import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import DashboardStats from "../components/DashboardStats";
import AddApplianceForm from "../components/AddApplianceForm";
import ApplianceList from "../components/ApplianceList";
import ChartsSection from "../components/ChartsSection";
import Recommendations from "../components/Recommendations";
import useAppliances from "../hooks/useAppliances";
import API from "../services/api";
function Dashboard({ user, onLogout }) {
  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliances = async () => {
    try {
      const { data } = await API.get("/appliances");
      setAppliances(data);
    } catch (error) {
      console.log("Fetch appliance error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  const handleAddAppliance = async (formData) => {
    try {
      const { data } = await API.post("/appliances", formData);
      setAppliances((prev) => [data, ...prev]);
    } catch (error) {
      console.log("Add appliance error:", error);
      alert("Failed to add appliance");
    }
  };

  const handleDeleteAppliance = async (id) => {
    try {
      await API.delete(`/appliances/${id}`);
      setAppliances((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("Delete appliance error:", error);
      alert("Failed to delete appliance");
    }
  };

  const totals = useMemo(() => {
    const dailyUsage = appliances.reduce(
      (sum, item) => sum + Number(item.dailyKwh || 0),
      0
    );

    const monthlyBill = appliances.reduce(
      (sum, item) => sum + Number(item.monthlyCost || 0),
      0
    );

    const potentialSavings = monthlyBill * 0.35;
    const co2 = dailyUsage * 30 * 0.82;

    return {
      dailyUsage: dailyUsage.toFixed(2),
      monthlyBill: monthlyBill.toFixed(2),
      potentialSavings: potentialSavings.toFixed(2),
      co2: co2.toFixed(0)
    };
  }, [appliances]);

  return (
    <>
      <Navbar user={user} onLogout={onLogout} dashboardMode={true} />

      <div className="container dashboard-page">
        <div className="dashboard-title">
          <h1>Energy Consumption Dashboard</h1>
          <p>Monitor, analyze, and optimize your electricity usage</p>
        </div>

        <DashboardStats totals={totals} />

        <AddApplianceForm onAdd={handleAddAppliance} />

        {loading ? (
          <div className="empty-card" style={{ marginTop: "22px" }}>
            <h3>Loading appliances...</h3>
          </div>
        ) : (
          <ApplianceList
            appliances={appliances}
            onDelete={handleDeleteAppliance}
          />
        )}

        <ChartsSection appliances={appliances} />

        <Recommendations appliances={appliances} totals={totals} />
      </div>
    </>
  );
}

export default Dashboard;