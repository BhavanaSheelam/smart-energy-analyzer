import React, { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

function ChartsSection({ appliances }) {
  const [tab, setTab] = useState("daily");

  const totalDaily = useMemo(() => {
    return appliances.reduce((sum, item) => sum + Number(item.dailyKwh || 0), 0);
  }, [appliances]);

  const dailyData = [
    { time: "00:00", consumption: +(totalDaily * 0.12).toFixed(2) },
    { time: "03:00", consumption: +(totalDaily * 0.12).toFixed(2) },
    { time: "06:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "09:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "12:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "15:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "18:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "21:00", consumption: +(totalDaily * 0.80).toFixed(2) },
    { time: "23:00", consumption: +(totalDaily * 0.12).toFixed(2) }
  ];

  const weeklyData = [
    { name: "Mon", consumption: +(totalDaily * 1.00).toFixed(2) },
    { name: "Tue", consumption: +(totalDaily * 1.00).toFixed(2) },
    { name: "Wed", consumption: +(totalDaily * 1.00).toFixed(2) },
    { name: "Thu", consumption: +(totalDaily * 1.00).toFixed(2) },
    { name: "Fri", consumption: +(totalDaily * 1.00).toFixed(2) },
    { name: "Sat", consumption: +(totalDaily * 0.85).toFixed(2) },
    { name: "Sun", consumption: +(totalDaily * 0.85).toFixed(2) }
  ];

  const monthlyData = [
    { name: "Week 1", consumption: +(totalDaily * 7 * 0.95).toFixed(2) },
    { name: "Week 2", consumption: +(totalDaily * 7 * 1.00).toFixed(2) },
    { name: "Week 3", consumption: +(totalDaily * 7 * 0.95).toFixed(2) },
    { name: "Week 4", consumption: +(totalDaily * 7 * 1.02).toFixed(2) }
  ];

  const chartData =
    tab === "daily" ? dailyData : tab === "weekly" ? weeklyData : monthlyData;

  const pieColors = ["#a62dd8", "#d9a126", "#31c7c7", "#35d823", "#57707f", "#3b82f6"];

  const pieData = appliances.map((item, index) => ({
    name: item.name,
    value: Number(item.dailyKwh),
    color: pieColors[index % pieColors.length]
  }));

  return (
    <>
      <div className="full-card" style={{ marginTop: "22px" }}>
        <h3>Consumption Patterns</h3>

        <div className="chart-tabs">
          <button
            className={`chart-tab ${tab === "daily" ? "active" : ""}`}
            onClick={() => setTab("daily")}
          >
            Daily
          </button>
          <button
            className={`chart-tab ${tab === "weekly" ? "active" : ""}`}
            onClick={() => setTab("weekly")}
          >
            Weekly
          </button>
          <button
            className={`chart-tab ${tab === "monthly" ? "active" : ""}`}
            onClick={() => setTab("monthly")}
          >
            Monthly
          </button>
        </div>

        <div style={{ width: "100%", height: 420 }}>
          <ResponsiveContainer>
            {tab === "daily" ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="#1bb57c"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="consumption" fill="#1bb57c" radius={[10, 10, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            fontSize: "18px",
            marginTop: "12px"
          }}
        >
          {tab === "daily" && "Hourly energy consumption pattern for today"}
          {tab === "weekly" && "Daily energy consumption for this week"}
          {tab === "monthly" && "Weekly energy consumption for this month"}
        </p>
      </div>

      <div className="full-card" style={{ marginTop: "22px" }}>
        <h3>Energy Distribution by Device</h3>

        {pieData.length === 0 ? (
          <div className="empty-card">
            <h3>Add appliances to view the pie chart</h3>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 0.7fr",
              gap: "20px",
              alignItems: "center"
            }}
          >
            <div style={{ width: "100%", height: 380 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={125}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              {pieData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "28px",
                    fontSize: "18px",
                    fontWeight: "600"
                  }}
                >
                  <div
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: item.color
                    }}
                  ></div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <div>
              {pieData.map((item, index) => {
                const percent = totalDaily ? (item.value / totalDaily) * 100 : 0;

                return (
                  <div key={index} style={{ marginBottom: "24px", textAlign: "right" }}>
                    <h4 style={{ fontSize: "18px", marginBottom: "6px" }}>
                      {item.value.toFixed(2)} kWh
                    </h4>
                    <p style={{ color: "#64748b", fontSize: "16px" }}>
                      {percent.toFixed(1)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ChartsSection;