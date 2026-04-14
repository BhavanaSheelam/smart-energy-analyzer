import React, { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import AuthModal from "../components/AuthModal";
import useAppliances from "../hooks/useAppliances";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import {
  FaChartBar,
  FaBolt,
  FaCalendarDays,
  FaArrowTrendUp
} from "react-icons/fa";

function AdvancedAnalytics({ user, onLogin }) {
  const [showModal, setShowModal] = useState(false);
  const { appliances, loading, totals } = useAppliances();

  const totalDaily = Number(totals.dailyUsage || 0);
  const totalMonthlyBill = Number(totals.monthlyBill || 0);

  const dailyPatternData = useMemo(() => {
    return [
      { time: "00:00", consumption: +(totalDaily * 0.08).toFixed(2) },
      { time: "04:00", consumption: +(totalDaily * 0.06).toFixed(2) },
      { time: "08:00", consumption: +(totalDaily * 0.18).toFixed(2) },
      { time: "12:00", consumption: +(totalDaily * 0.24).toFixed(2) },
      { time: "16:00", consumption: +(totalDaily * 0.20).toFixed(2) },
      { time: "20:00", consumption: +(totalDaily * 0.28).toFixed(2) }
    ];
  }, [totalDaily]);

  const weeklyTrendData = useMemo(() => {
    return [
      { day: "Mon", consumption: +(totalDaily * 0.95).toFixed(2) },
      { day: "Tue", consumption: +(totalDaily * 0.90).toFixed(2) },
      { day: "Wed", consumption: +(totalDaily * 1.00).toFixed(2) },
      { day: "Thu", consumption: +(totalDaily * 0.94).toFixed(2) },
      { day: "Fri", consumption: +(totalDaily * 1.05).toFixed(2) },
      { day: "Sat", consumption: +(totalDaily * 1.12).toFixed(2) },
      { day: "Sun", consumption: +(totalDaily * 1.02).toFixed(2) }
    ];
  }, [totalDaily]);

  const monthlyTrendData = useMemo(() => {
    const monthlyUnits = totalDaily * 30;

    return [
      { month: "Jan", consumption: +(monthlyUnits * 0.82).toFixed(0), cost: +(totalMonthlyBill * 0.82).toFixed(0) },
      { month: "Feb", consumption: +(monthlyUnits * 0.78).toFixed(0), cost: +(totalMonthlyBill * 0.78).toFixed(0) },
      { month: "Mar", consumption: +(monthlyUnits * 0.90).toFixed(0), cost: +(totalMonthlyBill * 0.90).toFixed(0) },
      { month: "Apr", consumption: +(monthlyUnits * 0.98).toFixed(0), cost: +(totalMonthlyBill * 0.98).toFixed(0) },
      { month: "May", consumption: +(monthlyUnits * 1.05).toFixed(0), cost: +(totalMonthlyBill * 1.05).toFixed(0) },
      { month: "Jun", consumption: +(monthlyUnits * 1.00).toFixed(0), cost: +(totalMonthlyBill * 1.00).toFixed(0) }
    ];
  }, [totalDaily, totalMonthlyBill]);

  const categoryBreakdownData = useMemo(() => {
    const major = appliances.reduce((sum, item) => {
      const power = Number(item.power || 0);
      return power >= 500 ? sum + Number(item.dailyKwh || 0) : sum;
    }, 0);

    const misc = appliances.reduce((sum, item) => {
      const power = Number(item.power || 0);
      return power < 200 ? sum + Number(item.dailyKwh || 0) : sum;
    }, 0);

    const medium = appliances.reduce((sum, item) => {
      const power = Number(item.power || 0);
      return power >= 200 && power < 500 ? sum + Number(item.dailyKwh || 0) : sum;
    }, 0);

    return [
      { slot: "6-9 AM", lighting: +(misc * 0.18).toFixed(2), hvac: +(medium * 0.14).toFixed(2), major: +(major * 0.18).toFixed(2) },
      { slot: "9-12 PM", lighting: +(misc * 0.22).toFixed(2), hvac: +(medium * 0.12).toFixed(2), major: +(major * 0.14).toFixed(2) },
      { slot: "12-3 PM", lighting: +(misc * 0.12).toFixed(2), hvac: +(medium * 0.22).toFixed(2), major: +(major * 0.16).toFixed(2) },
      { slot: "3-6 PM", lighting: +(misc * 0.14).toFixed(2), hvac: +(medium * 0.24).toFixed(2), major: +(major * 0.18).toFixed(2) },
      { slot: "6-9 PM", lighting: +(misc * 0.20).toFixed(2), hvac: +(medium * 0.20).toFixed(2), major: +(major * 0.22).toFixed(2) },
      { slot: "9-12 AM", lighting: +(misc * 0.14).toFixed(2), hvac: +(medium * 0.08).toFixed(2), major: +(major * 0.12).toFixed(2) }
    ];
  }, [appliances]);

  const keyInsights = useMemo(() => {
    if (!appliances.length) return [];

    const topAppliance = [...appliances].sort(
      (a, b) => Number(b.dailyKwh || 0) - Number(a.dailyKwh || 0)
    )[0];

    return [
      {
        color: "#f97316",
        text: `Your peak usage appears strongest during evening hours, and ${topAppliance?.name || "your top appliance"} is one of the biggest contributors.`
      },
      {
        color: "#2563eb",
        text: `Your current daily usage is ${totalDaily.toFixed(
          2
        )} kWh, with higher consumption likely during active household hours.`
      },
      {
        color: "#16a34a",
        text: `Your estimated monthly cost is ₹${totalMonthlyBill.toFixed(
          0
        )}. Better appliance scheduling can improve savings significantly.`
      }
    ];
  }, [appliances, totalDaily, totalMonthlyBill]);

  const opportunities = useMemo(() => {
    if (!appliances.length) return [];

    const topAppliance = [...appliances].sort(
      (a, b) => Number(b.monthlyCost || 0) - Number(a.monthlyCost || 0)
    )[0];

    return [
      {
        title: `Shift ${topAppliance?.name || "Peak"} Usage`,
        text: `Move part of ${topAppliance?.name || "high-consumption appliance"} usage to lower-demand periods for better savings.`,
        savings: `Save ₹${Math.max(80, Number(topAppliance?.monthlyCost || 0) * 0.18).toFixed(0)}/month`,
        className: "aa-opportunity green"
      },
      {
        title: "Weekend Optimization",
        text: "Reduce unnecessary appliance overuse during weekends and idle periods.",
        savings: `Save ₹${Math.max(50, totalMonthlyBill * 0.08).toFixed(0)}/month`,
        className: "aa-opportunity blue"
      },
      {
        title: "Appliance Efficiency Improvement",
        text: "Optimize the settings and runtime of your top energy-consuming appliances.",
        savings: `Save ₹${Math.max(70, totalMonthlyBill * 0.12).toFixed(0)}/month`,
        className: "aa-opportunity purple"
      }
    ];
  }, [appliances, totalMonthlyBill]);

  if (loading) {
    return (
      <>
        <Navbar onOpenModal={() => setShowModal(true)} user={user} />
        <div className="aa-page">
          <div className="container" style={{ padding: "60px 0" }}>
            <div className="empty-card">
              <h3>Loading analytics...</h3>
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
        <div className="aa-page">
          <div className="container">
            <div className="aa-hero">
              <div className="aa-badge">
                <FaChartBar />
                <span>Advanced Analytics</span>
              </div>

              <h1>Comprehensive Consumption Analytics</h1>

              <p>
                Add appliances in your dashboard first to unlock your personalized
                advanced analytics.
              </p>
            </div>

            <div className="empty-card">
              <h3>No Appliances Added Yet</h3>
              <p>Please go to Dashboard and add appliances to view analytics.</p>
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

      <div className="aa-page">
        <div className="container">
          <div className="aa-hero">
            <div className="aa-badge">
              <FaChartBar />
              <span>Advanced Analytics</span>
            </div>

            <h1>Comprehensive Consumption Analytics</h1>

            <p>
              Dive deep into your energy consumption patterns with advanced visualizations and
              insights. Understand your usage trends across daily, weekly, and monthly timeframes.
            </p>
          </div>

          <div className="aa-stat-grid">
            <div className="aa-stat-card">
              <div className="aa-stat-top">
                <p>Today's Usage</p>
                <span className="aa-stat-icon orange"><FaBolt /></span>
              </div>
              <h3>{totalDaily.toFixed(2)} kWh</h3>
              <small className="green">based on current appliance data</small>
            </div>

            <div className="aa-stat-card">
              <div className="aa-stat-top">
                <p>This Week</p>
                <span className="aa-stat-icon blue"><FaCalendarDays /></span>
              </div>
              <h3>{(totalDaily * 7).toFixed(1)} kWh</h3>
              <small className="green">estimated weekly usage</small>
            </div>

            <div className="aa-stat-card">
              <div className="aa-stat-top">
                <p>This Month</p>
                <span className="aa-stat-icon purple"><FaArrowTrendUp /></span>
              </div>
              <h3>{(totalDaily * 30).toFixed(0)} kWh</h3>
              <small className="red">estimated monthly trend</small>
            </div>

            <div className="aa-stat-card">
              <div className="aa-stat-top">
                <p>Avg. Daily</p>
                <span className="aa-stat-icon green"><FaChartBar /></span>
              </div>
              <h3>{totalDaily.toFixed(2)} kWh</h3>
              <small>based on entered appliances</small>
            </div>
          </div>

          <div className="aa-card">
            <h2>Daily Consumption Pattern</h2>

            <div className="aa-chart-wrap">
              <ResponsiveContainer width="100%" height={430}>
                <AreaChart data={dailyPatternData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="time" />
                  <YAxis label={{ value: "Consumption (kWh)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="consumption"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.35}
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="aa-daily-bottom-grid">
              <div className="aa-mini-box orange">
                <p>Peak Hours</p>
                <h4>6 PM - 9 PM</h4>
              </div>

              <div className="aa-mini-box green">
                <p>Off-Peak Hours</p>
                <h4>12 AM - 6 AM</h4>
              </div>

              <div className="aa-mini-box blue">
                <p>Average Hourly</p>
                <h4>{(totalDaily / 24).toFixed(2)} kWh</h4>
              </div>
            </div>
          </div>

          <div className="aa-card">
            <h2>Weekly Consumption Trend</h2>

            <div className="aa-chart-wrap">
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="day" />
                  <YAxis label={{ value: "Consumption (kWh)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#4a82e8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <p className="aa-note">Your weekly pattern is generated from the appliances you entered in dashboard.</p>
          </div>

          <div className="aa-card">
            <h2>6-Month Consumption & Cost Trend</h2>

            <div className="aa-chart-wrap">
              <ResponsiveContainer width="100%" height={430}>
                <LineChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="month" />
                  <YAxis
                    yAxisId="left"
                    label={{ value: "Consumption (kWh)", angle: -90, position: "insideLeft" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{ value: "Cost (₹)", angle: 90, position: "insideRight" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="consumption"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Consumption (kWh)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="cost"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    name="Cost (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="aa-insight-banner">
              <strong>Insight:</strong> This trend is dynamically generated from your current appliance usage and monthly bill estimates.
            </div>
          </div>

          <div className="aa-card">
            <h2>Consumption Breakdown by Category</h2>

            <div className="aa-chart-wrap">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryBreakdownData}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="slot" />
                  <YAxis label={{ value: "Power (kW)", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lighting" stackId="a" fill="#8b5cf6" name="Lighting & Misc" />
                  <Bar dataKey="hvac" stackId="a" fill="#f59e0b" name="Medium Appliances" />
                  <Bar dataKey="major" stackId="a" fill="#10b981" name="Major Appliances" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="aa-bottom-grid">
            <div className="aa-card aa-small-card">
              <h2>Key Insights</h2>

              <div className="aa-insight-list">
                {keyInsights.map((item, index) => (
                  <div className="aa-insight-item" key={index}>
                    <span
                      className="aa-bullet"
                      style={{ background: item.color }}
                    ></span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="aa-card aa-small-card">
              <h2>Optimization Opportunities</h2>

              <div className="aa-opportunity-list">
                {opportunities.map((item, index) => (
                  <div className={item.className} key={index}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <h4>{item.savings}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default AdvancedAnalytics;