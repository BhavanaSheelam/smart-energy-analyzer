import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function RealTimeMonitoring({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const { appliances, loading, totals } = useAppliances();

  const activeAppliances = useMemo(() => {
    const colors = ["#3b82f6", "#10b981", "#a855f7", "#f97316", "#eab308", "#ef4444"];

    return appliances.map((item, index) => {
      const dailyKwh = Number(item.dailyKwh || 0);
      const powerKw = (Number(item.power || 0) / 1000).toFixed(2);

      return {
        name: item.name,
        power: powerKw,
        color: colors[index % colors.length],
        width: `${Math.min((dailyKwh / 5) * 100, 100)}%`
      };
    });
  }, [appliances]);

  const [livePower, setLivePower] = useState(0);
  const [todaysTotal, setTodaysTotal] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(0);

  const [chartData, setChartData] = useState([
    { time: "12:00", power: 0 },
    { time: "16:00", power: 0 },
    { time: "20:00", power: 0 },
    { time: "00:00", power: 0 },
    { time: "04:00", power: 0 },
    { time: "08:00", power: 0 }
  ]);

  useEffect(() => {
    const basePower = Number(totals.dailyUsage || 0);
    const baseCost = Number(totals.monthlyBill || 0) / 30;

    setLivePower(basePower > 0 ? +(basePower * 0.18).toFixed(2) : 0);
    setTodaysTotal(basePower > 0 ? +basePower.toFixed(2) : 0);
    setEstimatedCost(baseCost > 0 ? +baseCost.toFixed(2) : 0);

    const dynamicChart = [
      { time: "12:00", power: +(basePower * 0.18).toFixed(2) },
      { time: "16:00", power: +(basePower * 0.22).toFixed(2) },
      { time: "20:00", power: +(basePower * 0.26).toFixed(2) },
      { time: "00:00", power: +(basePower * 0.14).toFixed(2) },
      { time: "04:00", power: +(basePower * 0.10).toFixed(2) },
      { time: "08:00", power: +(basePower * 0.20).toFixed(2) }
    ];

    setChartData(dynamicChart);
  }, [totals]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      const basePower = Number(totals.dailyUsage || 0);
      const baseCost = Number(totals.monthlyBill || 0) / 30;

      const nextPower =
        basePower > 0 ? +(basePower * (0.16 + Math.random() * 0.08)).toFixed(2) : 0;

      const nextTotal =
        basePower > 0 ? +(basePower + Math.random() * 0.4).toFixed(2) : 0;

      const nextCost =
        baseCost > 0 ? +(baseCost + Math.random() * 0.15).toFixed(2) : 0;

      setLivePower(nextPower);
      setTodaysTotal(nextTotal);
      setEstimatedCost(nextCost);

      setChartData((prev) => {
        const updated = [...prev, { time: timeLabel, power: nextPower }];
        return updated.slice(-6);
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totals]);

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="rtm-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading appliance data...</h3>
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
        <div className="rtm-page">
          <div className="container">
            <div className="rtm-hero">
              <div className="rtm-badge">〽 Real-Time Monitoring</div>
              <h1>Live Energy Consumption Dashboard</h1>
              <p>
                Add appliances in your dashboard first to see your personalized
                real-time monitoring page.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to view live data.</p>
            </div>
          </div>
        </div>

        {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
      </>
    );
  }

  return (
    <>
      <Navbar
        onOpenModal={() => setShowModal(true)}
        user={user}
      />

      <div className="rtm-page">
        <div className="container">
          <div className="rtm-hero">
            <div className="rtm-badge">〽 Real-Time Monitoring</div>

            <h1>Live Energy Consumption Dashboard</h1>

            <p>
              Monitor your energy consumption in real-time with live updates every
              second. Track power usage across all appliances and get instant insights.
            </p>
          </div>

          <div className="rtm-summary-card">
            <div className="rtm-summary-left">
              <p className="rtm-summary-label">Current Power Usage</p>

              <div className="rtm-main-power-row">
                <h2>{livePower}</h2>
                <span className="rtm-kw">kW</span>
                <span className="rtm-increasing">↗ Live</span>
              </div>
            </div>

            <div className="rtm-summary-icon">⚡</div>

            <div className="rtm-divider"></div>

            <div className="rtm-bottom-stats">
              <div>
                <p>Today's Total</p>
                <h3>{todaysTotal} kWh</h3>
              </div>

              <div>
                <p>Estimated Cost</p>
                <h3>₹{estimatedCost}</h3>
              </div>

              <div>
                <p>Active Devices</p>
                <h3>{activeAppliances.length}</h3>
              </div>
            </div>
          </div>

          <div className="rtm-card">
            <h2>Real-Time Power Consumption</h2>

            <div className="rtm-chart-wrap">
              <ResponsiveContainer width="100%" height={360}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="time" />
                  <YAxis
                    label={{
                      value: "Power (kW)",
                      angle: -90,
                      position: "insideLeft"
                    }}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="power"
                    stroke="#4f8df7"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <p className="rtm-live-note">● Live updates every 3 seconds</p>
          </div>

          <h2 className="rtm-section-title">Active Appliances</h2>

          <div className="rtm-appliance-grid">
            {activeAppliances.map((item, index) => (
              <div className="rtm-appliance-card" key={index}>
                <div className="rtm-appliance-top">
                  <div className="rtm-appliance-name-row">
                    <span
                      className="rtm-dot"
                      style={{ background: item.color }}
                    ></span>
                    <h3>{item.name}</h3>
                  </div>

                  <span className="rtm-status">active</span>
                </div>

                <div className="rtm-appliance-power">
                  <span className="rtm-appliance-value">{item.power}</span>
                  <span className="rtm-appliance-unit"> kW</span>
                </div>

                <div className="rtm-progress">
                  <div
                    className="rtm-progress-fill"
                    style={{
                      width: item.width,
                      background: item.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="rtm-card rtm-why-card">
            <h2>Why Real-Time Monitoring Matters</h2>

            <div className="rtm-why-grid">
              <div>
                <h3>Instant Visibility</h3>
                <p>
                  See exactly how much power you're consuming at any moment.
                  Identify which appliances are using the most energy and make
                  informed decisions to optimize usage.
                </p>
              </div>

              <div>
                <h3>Anomaly Detection</h3>
                <p>
                  Automatically detect unusual consumption patterns that could
                  indicate malfunctioning appliances or energy waste, helping you
                  address issues before they become costly.
                </p>
              </div>

              <div>
                <h3>Historical Comparison</h3>
                <p>
                  Compare current consumption with historical data to understand
                  trends and track the impact of energy-saving measures you've
                  implemented.
                </p>
              </div>

              <div>
                <h3>Cost Tracking</h3>
                <p>
                  See real-time cost estimates based on your energy rate, helping
                  you stay within budget and avoid bill shock at the end of the month.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default RealTimeMonitoring; 