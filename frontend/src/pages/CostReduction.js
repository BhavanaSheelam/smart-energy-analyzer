import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  FaArrowTrendDown,
  FaBullseye,
  FaPiggyBank,
  FaIndianRupeeSign
} from "react-icons/fa";

function CostReduction({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const { appliances, loading, totals } = useAppliances();

  const currentMonthlyBill = Number(totals.monthlyBill || 0);
  const optimizedBill = Math.max(0, currentMonthlyBill - Number(totals.potentialSavings || 0));
  const monthlySavings = Number(totals.potentialSavings || 0);
  const annualSavings = monthlySavings * 12;

  const chartData = useMemo(() => {
    const current = currentMonthlyBill || 0;
    const optimized = optimizedBill || 0;

    return [
      { month: "Jan", current: +(current * 0.82).toFixed(0), optimized: +(optimized * 0.82).toFixed(0) },
      { month: "Feb", current: +(current * 0.88).toFixed(0), optimized: +(optimized * 0.86).toFixed(0) },
      { month: "Mar", current: +(current * 0.94).toFixed(0), optimized: +(optimized * 0.90).toFixed(0) },
      { month: "Apr", current: +(current * 1.00).toFixed(0), optimized: +(optimized * 0.95).toFixed(0) },
      { month: "May", current: +(current * 1.06).toFixed(0), optimized: +(optimized * 1.00).toFixed(0) },
      { month: "Jun", current: +(current * 1.02).toFixed(0), optimized: +(optimized * 0.98).toFixed(0) }
    ];
  }, [currentMonthlyBill, optimizedBill]);

  const applianceBreakdown = useMemo(() => {
    if (!appliances.length) return [];

    const total = currentMonthlyBill || 1;

    return appliances.map((item) => {
      const monthly = Number(item.monthlyCost || 0);
      const percent = ((monthly / total) * 100).toFixed(0);
      const savings = (monthly * 0.35).toFixed(0);
      const width = `${Math.max(18, Math.min((monthly / total) * 100, 100))}%`;

      return {
        name: item.name,
        contribution: `Contributing ${percent}% to your total bill`,
        currentCost: monthly.toFixed(0),
        savings,
        width
      };
    });
  }, [appliances, currentMonthlyBill]);

  const strategies = useMemo(() => {
    if (!appliances.length) {
      return [
        {
          icon: <FaArrowTrendDown />,
          title: "Time-of-Use Optimization",
          text: "Shift heavy appliance usage to off-peak hours when electricity rates are lower.",
          level: "Easy",
          levelType: "easy",
          saving: "₹0/month"
        }
      ];
    }

    const topAppliance = [...appliances].sort(
      (a, b) => Number(b.monthlyCost || 0) - Number(a.monthlyCost || 0)
    )[0];

    return [
      {
        icon: <FaArrowTrendDown />,
        title: `Optimize ${topAppliance?.name || "Peak Usage"}`,
        text: `Use ${topAppliance?.name || "your high-consumption appliance"} more efficiently and reduce operation during high-cost periods.`,
        level: "Easy",
        levelType: "easy",
        saving: `₹${Math.max(50, Number(topAppliance?.monthlyCost || 0) * 0.2).toFixed(0)}/month`
      },
      {
        icon: <FaBullseye />,
        title: "Appliance Upgrade Program",
        text: "Replace inefficient appliances with energy-efficient models to reduce your monthly electricity bill.",
        level: "Medium",
        levelType: "medium",
        saving: `₹${Math.max(80, monthlySavings * 0.45).toFixed(0)}/month`
      },
      {
        icon: <FaPiggyBank />,
        title: "Smart Automation",
        text: "Use timers, auto shut-off, and smart scheduling to reduce unnecessary energy consumption.",
        level: "Easy",
        levelType: "easy",
        saving: `₹${Math.max(40, monthlySavings * 0.25).toFixed(0)}/month`
      }
    ];
  }, [appliances, monthlySavings]);

  const quickTips = useMemo(
    () => [
      {
        title: "Adjust Thermostat Settings",
        text: "Every degree you raise your AC thermostat in summer saves extra electricity cost on cooling.",
        saving: "Save up to ₹250/month"
      },
      {
        title: "Unplug Idle Electronics",
        text: "Phantom power from standby devices silently increases your electricity bill every month.",
        saving: "Save up to ₹150/month"
      },
      {
        title: "Use Cold Water for Laundry",
        text: "Most washing machine energy goes into heating water. Cold water reduces power usage a lot.",
        saving: "Save up to ₹120/month"
      },
      {
        title: "Schedule High-Use Activities",
        text: "Run heavy appliances during low-demand periods whenever possible for better savings.",
        saving: "Save up to ₹200/month"
      }
    ],
    []
  );

  const getLevelClass = (type) => {
    if (type === "medium") return "cr-level medium";
    return "cr-level easy";
  };

  const handleCelebrateSavings = (savingText) => {
    const amount = savingText.replace("Save up to ", "").replace("/month", "");
    setCelebrationMessage(`Yayy! You saved ${amount}/month 🎉`);
    setShowCelebration(true);

    setTimeout(() => {
      setShowCelebration(false);
      setCelebrationMessage("");
    }, 4000);
  };

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="cr-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading cost reduction insights...</h3>
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
        <div className="cr-page">
          <div className="container">
            <div className="cr-hero">
              <div className="cr-badge">
                <FaArrowTrendDown />
                <span>Cost Reduction</span>
              </div>

              <h1>Reduce Your Energy Bills</h1>

              <p>
                Add appliances in your dashboard first to view your personalized
                cost breakdown and savings strategies.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to unlock cost reduction insights.</p>
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

      <div className="cr-page">
        <div className="container">
          <div className="cr-hero">
            <div className="cr-badge">
              <FaArrowTrendDown />
              <span>Cost Reduction</span>
            </div>

            <h1>Reduce Your Energy Bills</h1>

            <p>
              Discover how much you can save with our intelligent cost reduction strategies.
              Get a detailed breakdown of costs and actionable steps to lower your bills.
            </p>
          </div>

          <div className="cr-summary-card">
            <h2>Your Cost Reduction Potential</h2>

            <div className="cr-summary-grid">
              <div>
                <p>Current Monthly Bill</p>
                <h3>₹{currentMonthlyBill.toFixed(0)}</h3>
              </div>

              <div>
                <p>Optimized Bill</p>
                <h3>₹{optimizedBill.toFixed(0)}</h3>
              </div>

              <div>
                <p>Monthly Savings</p>
                <h3>₹{monthlySavings.toFixed(0)}</h3>
              </div>

              <div>
                <p>Annual Savings</p>
                <h3>₹{annualSavings.toFixed(0)}</h3>
              </div>
            </div>

            <div className="cr-summary-note">
              <span>ⓘ</span>
              <p>Based on your current appliance usage and recommended optimizations</p>
            </div>
          </div>

          <div className="cr-card">
            <h2>Monthly Cost Comparison: Current vs Optimized</h2>

            <div className="cr-chart-wrap">
              <ResponsiveContainer width="100%" height={430}>
                <BarChart data={chartData} barCategoryGap="28%">
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: "Cost (₹)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="current" fill="#ff3b3b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="optimized" fill="#1dbb84" radius={[0, 0, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="cr-chart-legend">
              <span className="legend-item">
                <span className="legend-box red"></span>
                Current Cost
              </span>
              <span className="legend-item">
                <span className="legend-box green"></span>
                Optimized Cost
              </span>
            </div>

            <p className="cr-chart-note">
              By implementing our recommendations, you could reduce your bills by an average of{" "}
              {currentMonthlyBill > 0
                ? Math.round((monthlySavings / currentMonthlyBill) * 100)
                : 0}
              %
            </p>
          </div>

          <h2 className="cr-section-title">Cost Breakdown by Appliance</h2>

          <div className="cr-breakdown-list">
            {applianceBreakdown.map((item, index) => (
              <div className="cr-breakdown-card" key={index}>
                <div className="cr-breakdown-top">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.contribution}</p>
                  </div>

                  <div className="cr-breakdown-price">
                    <h4>₹{item.currentCost}</h4>
                    <span>per month</span>
                  </div>
                </div>

                <div className="cr-bar-info">
                  <span>Current cost</span>
                  <span>₹{item.currentCost}/month</span>
                </div>

                <div className="cr-progress red">
                  <div className="cr-progress-fill red" style={{ width: "100%" }}></div>
                </div>

                <div className="cr-bar-info savings">
                  <span>Potential savings</span>
                  <span>₹{item.savings}/month</span>
                </div>

                <div className="cr-progress green">
                  <div className="cr-progress-fill green" style={{ width: item.width }}></div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="cr-section-title">Recommended Cost Reduction Strategies</h2>

          <div className="cr-strategy-grid">
            {strategies.map((item, index) => (
              <div className="cr-strategy-card" key={index}>
                <div className="cr-strategy-icon">{item.icon}</div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>

                <div className="cr-strategy-bottom">
                  <span className={getLevelClass(item.levelType)}>{item.level}</span>
                  <h4>{item.saving}</h4>
                </div>
              </div>
            ))}
          </div>

          <div className="cr-tips-card">
            <div className="cr-tips-header">
              <FaIndianRupeeSign />
              <h2>Quick Tips to Reduce Bills Immediately</h2>
            </div>

            <div className="cr-tips-grid">
              {quickTips.map((item, index) => (
                <div className="cr-tip-box" key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <button
                    className="cr-saving-btn"
                    onClick={() => handleCelebrateSavings(item.saving)}
                  >
                    {item.saving}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showCelebration && (
          <div className="cr-celebration-wrap">
            <div className="cr-celebration-box">
              <div className="cr-celebration-emojis">
                <span>🎉</span>
                <span>✨</span>
                <span>💸</span>
                <span>🎊</span>
              </div>
              <h3>{celebrationMessage}</h3>
            </div>
          </div>
        )}
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default CostReduction;