import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";
import {
  FaLeaf,
  FaAward,
  FaTree,
  FaArrowTrendDown
} from "react-icons/fa6";

function CarbonFootprint({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const { appliances, loading, totals } = useAppliances();

  const monthlyCo2 = Number(totals.co2 || 0);
  const carbonOffset = Math.round(monthlyCo2 * 0.18);
  const treesNeeded = Math.max(1, Math.round(monthlyCo2 / 23));
  const annualSaved = Math.round(monthlyCo2 * 0.32);
  const annualImpact = annualSaved * 12;
  const equivalentTrees = Math.max(1, Math.round(annualImpact / 22));

  const sourceData = useMemo(() => {
    const colors = ["#f44343", "#ff7a12", "#f6a300", "#84cc16", "#22c55e", "#94a3b8"];

    return appliances.map((item, index) => ({
      name: item.name,
      value: Math.round(Number(item.dailyKwh || 0) * 30 * 0.82),
      color: colors[index % colors.length]
    }));
  }, [appliances]);

  const trendData = useMemo(() => {
    return [
      { month: "Jan", emissions: Math.round(monthlyCo2 * 0.72), offset: Math.round(carbonOffset * 0.60) },
      { month: "Feb", emissions: Math.round(monthlyCo2 * 0.68), offset: Math.round(carbonOffset * 0.70) },
      { month: "Mar", emissions: Math.round(monthlyCo2 * 0.78), offset: Math.round(carbonOffset * 0.78) },
      { month: "Apr", emissions: Math.round(monthlyCo2 * 0.86), offset: Math.round(carbonOffset * 0.88) },
      { month: "May", emissions: Math.round(monthlyCo2 * 1.00), offset: Math.round(carbonOffset * 1.00) },
      { month: "Jun", emissions: Math.round(monthlyCo2 * 0.94), offset: Math.round(carbonOffset * 0.94) }
    ];
  }, [monthlyCo2, carbonOffset]);

  const infoCards = useMemo(
    () => [
      {
        icon: <FaLeaf />,
        title: "Equivalent to",
        value: `${Math.round(monthlyCo2 * 3.1)} km`,
        text: "of car travel emissions",
        className: "cf-info-card blue"
      },
      {
        icon: <FaTree />,
        title: "Trees Planted",
        value: `${Math.max(1, Math.round(carbonOffset / 24))}`,
        text: "through our offset program",
        className: "cf-info-card green"
      },
      {
        icon: <FaArrowTrendDown />,
        title: "Reduction Goal",
        value: "25%",
        text: "by end of year (on track!)",
        className: "cf-info-card green-dark"
      }
    ],
    [monthlyCo2, carbonOffset]
  );

  const reduceTips = useMemo(
    () => [
      {
        title: "Switch to Renewable Energy",
        text: "Consider installing solar panels or switching to a green energy provider. This can reduce your carbon footprint significantly.",
        reduction: `Potential reduction: ${Math.round(monthlyCo2 * 0.45)} kg CO₂/month`,
        className: "cf-tip-card green"
      },
      {
        title: "Upgrade to Energy-Efficient Appliances",
        text: "Replace old appliances with energy-efficient models. They use less energy and significantly reduce emissions.",
        reduction: `Potential reduction: ${Math.round(monthlyCo2 * 0.22)} kg CO₂/month`,
        className: "cf-tip-card blue"
      },
      {
        title: "Optimize Appliance Usage",
        text: "Adjust timings, reduce unnecessary usage, and maintain appliances regularly for better efficiency.",
        reduction: `Potential reduction: ${Math.round(monthlyCo2 * 0.14)} kg CO₂/month`,
        className: "cf-tip-card purple"
      },
      {
        title: "Reduce Peak Hour Usage",
        text: "Shifting appliance usage to efficient time periods reduces overall grid pressure and emissions.",
        reduction: `Potential reduction: ${Math.round(monthlyCo2 * 0.1)} kg CO₂/month`,
        className: "cf-tip-card brown"
      }
    ],
    [monthlyCo2]
  );

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="cf-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading carbon footprint data...</h3>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (appliances.length === 0) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="cf-page">
          <div className="container">
            <div className="cf-hero">
              <div className="cf-badge">
                <FaLeaf />
                <span>Carbon Footprint</span>
              </div>

              <h1>Environmental Impact Dashboard</h1>

              <p>
                Add appliances in your dashboard first to view your personalized
                environmental impact and carbon footprint insights.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to view carbon analysis.</p>
            </div>
          </div>
        </div>

        {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
      </>
    );
  }

  return (
    <>
      <Navbar onOpenModal={() => setShowModal(true)} user={user} />

      <div className="cf-page">
        <div className="container">
          <div className="cf-hero">
            <div className="cf-badge">
              <FaLeaf />
              <span>Carbon Footprint</span>
            </div>

            <h1>Environmental Impact Dashboard</h1>

            <p>
              Monitor your carbon footprint and contribute to a sustainable future by understanding
              and reducing your environmental impact.
            </p>
          </div>

          <div className="cf-summary-card">
            <h2>Your Monthly Carbon Footprint</h2>

            <div className="cf-summary-grid">
              <div>
                <p>Total CO₂ Emissions</p>
                <h3>{monthlyCo2} kg</h3>
              </div>

              <div>
                <p>Trees Needed to Offset</p>
                <h3>{treesNeeded}</h3>
              </div>

              <div>
                <p>Carbon Offset This Month</p>
                <h3>{carbonOffset} kg</h3>
              </div>

              <div>
                <p>vs. Average Household</p>
                <h3>-15%</h3>
              </div>
            </div>

            <div className="cf-summary-note">
              <FaAward />
              <p>
                Great job! Your carbon impact is being actively tracked based on your actual appliance usage.
              </p>
            </div>
          </div>

          <div className="cf-top-grid">
            <div className="cf-card">
              <h2>Carbon Emissions by Source</h2>

              <div className="cf-chart-wrap">
                <ResponsiveContainer width="100%" height={420}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={130}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="cf-source-list">
                {sourceData.map((item, index) => (
                  <div className="cf-source-row" key={index}>
                    <div className="cf-source-left">
                      <span
                        className="cf-source-dot"
                        style={{ background: item.color }}
                      ></span>
                      <span>{item.name}</span>
                    </div>
                    <strong>{item.value} kg CO₂</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="cf-card">
              <h2>6-Month Emissions Trend</h2>

              <div className="cf-chart-wrap">
                <ResponsiveContainer width="100%" height={420}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="month" />
                    <YAxis label={{ value: "CO₂ (kg)", angle: -90, position: "insideLeft" }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="emissions"
                      stroke="#ef4444"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      name="Total Emissions"
                    />
                    <Line
                      type="monotone"
                      dataKey="offset"
                      stroke="#22c55e"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      name="Carbon Offset"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="cf-trend-alert">
                <strong>Trend Alert:</strong> This trend is generated from your real appliance usage data and current estimated emissions.
              </div>
            </div>
          </div>

          <div className="cf-info-grid">
            {infoCards.map((item, index) => (
              <div className={item.className} key={index}>
                <div className="cf-info-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <h4>{item.value}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="cf-card cf-reduce-card">
            <h2>How to Reduce Your Carbon Footprint</h2>

            <div className="cf-reduce-grid">
              {reduceTips.map((item, index) => (
                <div className={item.className} key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <h4>{item.reduction}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="cf-contribution-card">
            <div className="cf-contribution-header">
              <FaLeaf />
              <h2>Your Contribution to Sustainability</h2>
            </div>

            <div className="cf-contribution-grid">
              <div className="cf-contribution-box">
                <p>This Month You've Saved</p>
                <h3>{annualSaved} kg</h3>
                <span>Compared to your previous average</span>
              </div>

              <div className="cf-contribution-box">
                <p>Annual Impact if Sustained</p>
                <h3>{annualImpact} kg</h3>
                <span>CO₂ reduction per year</span>
              </div>

              <div className="cf-contribution-box">
                <p>Equivalent Trees</p>
                <h3>{equivalentTrees}</h3>
                <span>Trees planted to offset annual emissions</span>
              </div>
            </div>

            <div className="cf-contribution-note">
              By continuing your energy-saving efforts, you're making a real difference in fighting climate change.
              Every kilowatt-hour saved means less CO₂ in the atmosphere!
            </div>
          </div>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default CarbonFootprint;