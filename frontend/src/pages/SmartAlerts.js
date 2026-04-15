import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  FaBell,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaCheckCircle,
  FaLightbulb
} from "react-icons/fa";

function SmartAlerts({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const { appliances, loading, totals } = useAppliances();

  const [settings, setSettings] = useState({
    highConsumption: true,
    malfunction: true,
    peakHour: true,
    budgetThreshold: false,
    phantomPower: true
  });

  const generatedAlerts = useMemo(() => {
    if (!appliances.length) return [];

    const totalDaily = Number(totals.dailyUsage || 0);
    const totalMonthly = Number(totals.monthlyBill || 0);

    const topAppliance = [...appliances].sort(
      (a, b) => Number(b.dailyKwh || 0) - Number(a.dailyKwh || 0)
    )[0];

    const alerts = [];

    if (topAppliance) {
      alerts.push({
        id: 1,
        type: Number(topAppliance.dailyKwh || 0) >= 3 ? "critical" : "high",
        title:
          Number(topAppliance.dailyKwh || 0) >= 3
            ? "High Power Usage Detected"
            : "Unusual Consumption Detected",
        meta: `2 hours ago • ${topAppliance.name}`,
        description: `${topAppliance.name} is one of your highest-consuming appliances and is contributing heavily to your current usage.`,
        solution: `Try reducing usage hours of ${topAppliance.name}, checking its settings, or replacing it with an energy-efficient model.`,
        resolved: false,
        borderClass:
          Number(topAppliance.dailyKwh || 0) >= 3
            ? "sal-alert critical"
            : "sal-alert high"
      });
    }

    if (totalDaily > 8) {
      alerts.push({
        id: 2,
        type: "medium",
        title: "Peak Hour Alert",
        meta: "30 minutes ago • Multiple Devices",
        description: `Your current daily energy usage is ${totalDaily.toFixed(
          2
        )} kWh, which is above average and may be causing a higher bill.`,
        solution: "Move heavy appliance usage to off-peak hours and reduce non-essential devices during busy periods.",
        resolved: false,
        borderClass: "sal-alert medium"
      });
    }

    if (totalMonthly > 2500) {
      alerts.push({
        id: 3,
        type: "high",
        title: "Budget Threshold Alert",
        meta: "1 hour ago • Overall",
        description: `Your estimated monthly electricity bill is ₹${totalMonthly.toFixed(
          0
        )}, which is relatively high.`,
        solution: "Use AI recommendations and cost reduction strategies to lower your monthly bill.",
        resolved: false,
        borderClass: "sal-alert high"
      });
    }

    if (appliances.length > 0) {
      alerts.push({
        id: 4,
        type: "resolved",
        title: "Energy Goal Achieved",
        meta: "1 day ago • Overall",
        description: "You have successfully added and monitored your appliances for smarter energy tracking.",
        solution: "Great job! Continue monitoring and applying the recommended savings tips.",
        resolved: true,
        borderClass: "sal-alert resolved"
      });
    }

    return alerts;
  }, [appliances, totals]);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(generatedAlerts);
  }, [generatedAlerts]);

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const markResolved = (id) => {
    const clickedAlert = alerts.find((item) => item.id === id);

    setAlerts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              resolved: true,
              type: "resolved",
              borderClass: "sal-alert resolved"
            }
          : item
      )
    );

    setTimeout(() => {
      setAlerts((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                resolved: false,
                type:
                  clickedAlert?.type === "resolved"
                    ? "medium"
                    : clickedAlert?.type || "medium",
                borderClass:
                  clickedAlert?.type === "critical"
                    ? "sal-alert critical"
                    : clickedAlert?.type === "high"
                    ? "sal-alert high"
                    : "sal-alert medium"
              }
            : item
        )
      );
    }, 900000); // 15 minutes
  };

  const summary = useMemo(() => {
    const critical = alerts.filter((item) => item.type === "critical").length;
    const high = alerts.filter((item) => item.type === "high").length;
    const medium = alerts.filter((item) => item.type === "medium").length;
    const resolved = alerts.filter((item) => item.resolved).length;

    return { critical, high, medium, resolved };
  }, [alerts]);

  const issues = useMemo(
    () => [
      {
        title: "Continuous High Consumption",
        text: "If an appliance shows consistently high power usage, it may be nearing end of life or have a faulty component.",
        points: [
          "Schedule professional maintenance",
          "Check for visible damage or wear",
          "Consider replacement if over 10 years old"
        ],
        className: "sal-issue purple"
      },
      {
        title: "Sudden Power Spikes",
        text: "Unexpected power spikes often indicate electrical issues or appliance malfunction.",
        points: [
          "Turn off the appliance immediately",
          "Check circuit breaker and connections",
          "Contact electrician if issue persists"
        ],
        className: "sal-issue blue"
      },
      {
        title: "Phantom Power Draw",
        text: "Devices consuming power while in standby mode waste 5-10% of total electricity.",
        points: [
          "Use smart power strips with auto-shutoff",
          "Unplug devices when not in use",
          "Enable power-saving modes on electronics"
        ],
        className: "sal-issue orange"
      },
      {
        title: "Peak Hour Overconsumption",
        text: "Using heavy appliances during peak hours significantly increases costs.",
        points: [
          "Set timers to run appliances during lower usage periods",
          "Reduce heavy appliance use in busy hours",
          "Use delay-start features where available"
        ],
        className: "sal-issue green"
      }
    ],
    []
  );

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="sal-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading smart alerts...</h3>
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
        <div className="sal-page">
          <div className="container">
            <div className="sal-hero">
              <div className="sal-badge">
                <FaBell />
                <span>Smart Alerts</span>
              </div>

              <h1>Intelligent Alert System</h1>

              <p>
                Add appliances in your dashboard first to receive smart alerts and issue detection.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to view smart alerts.</p>
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

      <div className="sal-page">
        <div className="container">
          <div className="sal-hero">
            <div className="sal-badge">
              <FaBell />
              <span>Smart Alerts</span>
            </div>

            <h1>Intelligent Alert System</h1>

            <p>
              Stay informed about unusual consumption patterns, potential issues, and optimization
              opportunities with real-time smart alerts.
            </p>
          </div>

          <div className="sal-summary-grid">
            <div className="sal-summary-card critical">
              <div className="sal-summary-top">
                <FaExclamationCircle />
                <span>Critical</span>
              </div>
              <h3>{summary.critical}</h3>
            </div>

            <div className="sal-summary-card high">
              <div className="sal-summary-top">
                <FaExclamationTriangle />
                <span>High</span>
              </div>
              <h3>{summary.high}</h3>
            </div>

            <div className="sal-summary-card medium">
              <div className="sal-summary-top">
                <FaBell />
                <span>Medium</span>
              </div>
              <h3>{summary.medium}</h3>
            </div>

            <div className="sal-summary-card resolved">
              <div className="sal-summary-top">
                <FaCheckCircle />
                <span>Resolved</span>
              </div>
              <h3>{summary.resolved}</h3>
            </div>
          </div>

          <h2 className="sal-section-title">Active Alerts</h2>

          <div className="sal-alert-list">
            {alerts.map((item) => (
              <div className={item.borderClass} key={item.id}>
                <div className="sal-alert-header">
                  <div className="sal-alert-title-group">
                    <div className="sal-alert-title-row">
                      {item.type === "critical" && <FaExclamationCircle className="sal-icon-critical" />}
                      {item.type === "high" && <FaExclamationTriangle className="sal-icon-high" />}
                      {item.type === "medium" && <FaBell className="sal-icon-medium" />}
                      {item.type === "resolved" && <FaCheckCircle className="sal-icon-resolved" />}
                      <h3>{item.title}</h3>
                    </div>

                    <p className="sal-meta">{item.meta}</p>
                  </div>

                  {item.resolved ? (
                    <div className="sal-resolved-badge">
                      <FaCheckCircle />
                      <span>Resolved</span>
                    </div>
                  ) : (
                    <button className="sal-resolve-btn" onClick={() => markResolved(item.id)}>
                      Mark as Resolved
                    </button>
                  )}
                </div>

                <p className="sal-description">{item.description}</p>

                <div className="sal-solution-box">
                  <div className="sal-solution-title">
                    <FaLightbulb />
                    <span>Recommended Solution:</span>
                  </div>
                  <p>{item.solution}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="sal-card">
            <h2>Alert Settings</h2>

            <div className="sal-settings-list">
              <div className="sal-setting-row">
                <div>
                  <h3>High Consumption Alerts</h3>
                  <p>Get notified when consumption exceeds normal patterns by 25%</p>
                </div>
                <button
                  className={`sal-toggle ${settings.highConsumption ? "active" : ""}`}
                  onClick={() => toggleSetting("highConsumption")}
                >
                  <span></span>
                </button>
              </div>

              <div className="sal-setting-row">
                <div>
                  <h3>Appliance Malfunction Detection</h3>
                  <p>Alert when appliances show signs of inefficiency or failure</p>
                </div>
                <button
                  className={`sal-toggle ${settings.malfunction ? "active" : ""}`}
                  onClick={() => toggleSetting("malfunction")}
                >
                  <span></span>
                </button>
              </div>

              <div className="sal-setting-row">
                <div>
                  <h3>Peak Hour Notifications</h3>
                  <p>Remind you when using energy during expensive peak hours</p>
                </div>
                <button
                  className={`sal-toggle ${settings.peakHour ? "active" : ""}`}
                  onClick={() => toggleSetting("peakHour")}
                >
                  <span></span>
                </button>
              </div>

              <div className="sal-setting-row">
                <div>
                  <h3>Budget Threshold Alerts</h3>
                  <p>Warning when approaching your monthly energy budget</p>
                </div>
                <button
                  className={`sal-toggle ${settings.budgetThreshold ? "active" : ""}`}
                  onClick={() => toggleSetting("budgetThreshold")}
                >
                  <span></span>
                </button>
              </div>

              <div className="sal-setting-row">
                <div>
                  <h3>Phantom Power Detection</h3>
                  <p>Identify devices consuming power while in standby mode</p>
                </div>
                <button
                  className={`sal-toggle ${settings.phantomPower ? "active" : ""}`}
                  onClick={() => toggleSetting("phantomPower")}
                >
                  <span></span>
                </button>
              </div>
            </div>
          </div>

          <div className="sal-card">
            <h2>Common Issues & Quick Solutions</h2>

            <div className="sal-issues-grid">
              {issues.map((item, index) => (
                <div className={item.className} key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>
                    {item.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
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

export default SmartAlerts;