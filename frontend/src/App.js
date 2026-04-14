import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RealTimeMonitoring from "./pages/RealTimeMonitoring";
import AIInsights from "./pages/AIInsights";
import CostReduction from "./pages/CostReduction";
import AdvancedAnalytics from "./pages/AdvancedAnalytics";
import SmartAlerts from "./pages/SmartAlerts";
import CarbonFootprint from "./pages/CarbonFootprint";
import StartFreeTrial from "./pages/StartFreeTrial";
import AllReviews from "./pages/AllReviews";
import "./App.css";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")));

  const handleLogin = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Home onLogin={handleLogin} user={user} />} />

      <Route
        path="/dashboard"
        element={
          user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />
        }
      />

      <Route
        path="/real-time-monitoring"
        element={<RealTimeMonitoring user={user} onLogin={handleLogin} />}
      />
      <Route
        path="/ai-insights"
        element={<AIInsights user={user} onLogin={handleLogin} />}
        />
      <Route
        path="/cost-reduction"
        element={<CostReduction user={user} onLogin={handleLogin} />}
      />
      <Route
        path="/advanced-analytics"
        element={<AdvancedAnalytics user={user} onLogin={handleLogin} />}
      />
      <Route
        path="/smart-alerts"
        element={<SmartAlerts  user={user} onLogin={handleLogin} />}
      />
      <Route
        path="/carbon-footprint"
        element={<CarbonFootprint  user={user} onLogin={handleLogin} />}
      />
      <Route
        path="/start-free-trial"
        element={<StartFreeTrial user={user} />}
      />
      <Route
        path="/all-reviews"
        element={<AllReviews user={user} />}
      />
    </Routes>
  );
}

export default App;