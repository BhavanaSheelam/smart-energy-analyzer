import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  FaBrain,
  FaClock,
  FaBolt,
  FaArrowTrendDown,
  FaLightbulb
} from "react-icons/fa6";

function AIInsights({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const [applied, setApplied] = useState({});
  const { appliances, loading, totals } = useAppliances();

  const recommendations = useMemo(() => {
    if (!appliances.length) return [];

    return appliances.map((item) => {
      const power = Number(item.power || 0);
      const hours = Number(item.hours || 0);
      const dailyKwh = Number(item.dailyKwh || 0);
      const monthlyCost = Number(item.monthlyCost || 0);

      let impact = "Low Impact";
      let impactType = "low";
      let icon = <FaLightbulb />;
      let title = `Optimize ${item.name} Usage`;
      let description = `${item.name} currently consumes ${power}W for ${hours} hours/day. Small usage optimizations can reduce your energy bill.`;
      let savings = `$${Math.max(5, (monthlyCost * 0.15).toFixed(0))}/month`;

      if (dailyKwh >= 3) {
        impact = "High Impact";
        impactType = "high";
        icon = <FaClock />;
        title = `Shift ${item.name} Usage to Efficient Hours`;
        description = `${item.name} is one of your highest-consuming appliances. Running it more efficiently or reducing usage time can significantly lower energy costs.`;
        savings = `$${Math.max(15, (monthlyCost * 0.3).toFixed(0))}/month`;
      } else if (dailyKwh >= 1.5) {
        impact = "Medium Impact";
        impactType = "medium";
        icon = <FaBolt />;
        title = `Improve ${item.name} Efficiency`;
        description = `${item.name} contributes noticeably to your energy usage. Optimizing settings or reducing operating hours can improve overall efficiency.`;
        savings = `$${Math.max(10, (monthlyCost * 0.22).toFixed(0))}/month`;
      } else if (power >= 500) {
        impact = "Medium Impact";
        impactType = "medium";
        icon = <FaArrowTrendDown />;
        title = `Reduce ${item.name} Power Consumption`;
        description = `${item.name} has a high power rating. Using it more carefully or replacing it with an energy-efficient model may save money every month.`;
        savings = `$${Math.max(8, (monthlyCost * 0.2).toFixed(0))}/month`;
      }

      return {
        icon,
        title,
        appliance: item.name,
        impact,
        impactType,
        savings,
        description
      };
    });
  }, [appliances]);

  const insights = useMemo(() => {
    if (!appliances.length) return [];

    const topAppliance = [...appliances].sort(
      (a, b) => Number(b.dailyKwh || 0) - Number(a.dailyKwh || 0)
    )[0];

    const totalDaily = Number(totals.dailyUsage || 0);
    const totalMonthly = Number(totals.monthlyBill || 0);

    return [
      {
        title: "Peak Usage Pattern Detected",
        description: `Your current daily usage is ${totalDaily.toFixed(
          2
        )} kWh. High-consumption appliances are likely contributing most during heavy-use periods.`,
        tip: `Reduce usage of ${topAppliance?.name || "top appliances"} during peak hours to improve savings.`
      },
      {
        title: "Highest Consumption Appliance",
        description: `${topAppliance?.name || "Your appliance"} is currently one of the largest contributors to your daily energy usage.`,
        tip: `Optimizing ${topAppliance?.name || "this appliance"} could reduce your monthly bill by up to 20-30%.`
      },
      {
        title: "Monthly Optimization Opportunity",
        description: `Your estimated monthly bill is $${totalMonthly.toFixed(
          2
        )}. AI analysis suggests that improved appliance scheduling can lower this further.`,
        tip: `Apply the top recommendations to save up to $${Number(
          totals.potentialSavings || 0
        ).toFixed(0)}/month.`
      }
    ];
  }, [appliances, totals]);

  const generalTips = useMemo(
    () => [
      {
        number: 1,
        title: "Set your thermostat to 78°F (26°C) in summer and 68°F (20°C) in winter",
        savings: "Up to 10% on cooling/heating costs"
      },
      {
        number: 2,
        title: "Run dishwasher and washing machine only with full loads",
        savings: "Save 15-20% on water heating costs"
      },
      {
        number: 3,
        title: "Switch to LED bulbs for all lighting fixtures",
        savings: "Reduce lighting costs by 75%"
      },
      {
        number: 4,
        title: "Unplug chargers and devices when not in use",
        savings: "Eliminate 5-10% phantom power consumption"
      },
      {
        number: 5,
        title: "Use ceiling fans to circulate air before turning on AC",
        savings: "Reduce AC usage by 30-40%"
      },
      {
        number: 6,
        title: "Clean appliance filters monthly for optimal efficiency",
        savings: "Improve efficiency by 5-15%"
      }
    ],
    []
  );

  const getImpactClass = (type) => {
    if (type === "high") return "ai-impact high";
    if (type === "medium") return "ai-impact medium";
    return "ai-impact low";
  };

  const handleApply = (index) => {
    setApplied((prev) => ({
      ...prev,
      [index]: true
    }));

    setTimeout(() => {
      setApplied((prev) => ({
        ...prev,
        [index]: false
      }));
    }, 900000);
  };

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="ai-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading AI insights...</h3>
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
        <div className="ai-page">
          <div className="container">
            <div className="ai-hero">
              <div className="ai-badge">
                <FaBrain />
                <span>AI-Powered Insights</span>
              </div>

              <h1>Smart Recommendations for Energy Optimization</h1>

              <p>
                Add appliances in your dashboard first to receive personalized AI
                recommendations and insights.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to unlock AI insights.</p>
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

      <div className="ai-page">
        <div className="container">
          <div className="ai-hero">
            <div className="ai-badge">
              <FaBrain />
              <span>AI-Powered Insights</span>
            </div>

            <h1>Smart Recommendations for Energy Optimization</h1>

            <p>
              Our advanced AI analyzes your consumption patterns and provides personalized
              recommendations to help you save energy and reduce costs.
            </p>
          </div>

          <div className="ai-summary-card">
            <div className="ai-summary-header">
              <div className="ai-summary-icon">
                <FaBrain />
              </div>

              <div>
                <h2>AI Analysis Complete</h2>
                <p>Based on your appliance usage and current energy consumption</p>
              </div>
            </div>

            <div className="ai-summary-stats">
              <div className="ai-summary-stat">
                <p>Potential Monthly Savings</p>
                <h3>${Number(totals.potentialSavings || 0).toFixed(0)}</h3>
              </div>

              <div className="ai-summary-stat">
                <p>Energy Reduction</p>
                <h3>
                  {Number(totals.monthlyBill || 0) > 0
                    ? `${Math.min(
                        35,
                        Math.max(
                          10,
                          Math.round(
                            (Number(totals.potentialSavings) /
                              Number(totals.monthlyBill)) *
                              100
                          )
                        )
                      )}%`
                    : "0%"}
                </h3>
              </div>

              <div className="ai-summary-stat">
                <p>Recommendations Found</p>
                <h3>{recommendations.length}</h3>
              </div>
            </div>
          </div>

          <div className="ai-section-title">Personalized Recommendations</div>

          <div className="ai-recommendation-list">
            {recommendations.map((item, index) => (
              <div className="ai-recommendation-card" key={index}>
                <div className="ai-recommendation-left">
                  <div className="ai-rec-icon">{item.icon}</div>

                  <div className="ai-rec-content">
                    <h3>{item.title}</h3>

                    <div className="ai-rec-meta">
                      <span>Appliance: {item.appliance}</span>
                      <span className={getImpactClass(item.impactType)}>
                        {item.impact}
                      </span>
                    </div>

                    <p>{item.description}</p>

                    <button
                      className={`ai-apply-btn ${applied[index] ? "applied" : ""}`}
                      onClick={() => handleApply(index)}
                    >
                      {applied[index] ? "✔ Applied" : "Apply Recommendation"}
                    </button>

                    {applied[index] && (
                      <p className="ai-success-msg">
                        Recommendation applied successfully
                      </p>
                    )}
                  </div>
                </div>

                <div className="ai-rec-savings">
                  <h4>{item.savings}</h4>
                  <span>potential savings</span>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-section-title" style={{ marginTop: "50px" }}>
            AI-Detected Patterns & Insights
          </div>

          <div className="ai-insight-grid">
            {insights.map((item, index) => (
              <div className="ai-insight-card" key={index}>
                <div className="ai-insight-icon">
                  <FaBrain />
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="ai-insight-tip">{item.tip}</div>
              </div>
            ))}
          </div>

          <div className="ai-tips-card">
            <div className="ai-tips-header">
              <FaLightbulb />
              <h2>General Energy Saving Tips</h2>
            </div>

            <div className="ai-tips-grid">
              {generalTips.map((item) => (
                <div className="ai-tip-box" key={item.number}>
                  <div className="ai-tip-number">{item.number}</div>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.savings}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default AIInsights;