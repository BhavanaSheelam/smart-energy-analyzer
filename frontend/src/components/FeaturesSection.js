import React from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaBrain,
  FaArrowTrendDown,
  FaChartBar,
  FaBell,
  FaLeaf,
  FaArrowRight
} from "react-icons/fa6";

function FeaturesSection() {
  const features = [
    {
      icon: <FaChartLine />,
      bg: "#e9f0ff",
      title: "Real-Time Monitoring",
      text: "Track your energy consumption in real-time with live updates and instant notifications."
    },
    {
      icon: <FaBrain />,
      bg: "#f2eaff",
      title: "AI-Powered Insights",
      text: "Get intelligent recommendations powered by machine learning to optimize your energy usage."
    },
    {
      icon: <FaArrowTrendDown />,
      bg: "#e9f8ef",
      title: "Cost Reduction",
      text: "Identify energy waste and reduce your electricity bills by up to 35% on average."
    },
    {
      icon: <FaChartBar />,
      bg: "#fff1e7",
      title: "Advanced Analytics",
      text: "Visualize consumption patterns with detailed charts and comprehensive reports."
    },
    {
      icon: <FaBell />,
      bg: "#ffecec",
      title: "Smart Alerts",
      text: "Receive instant alerts for unusual consumption patterns or potential issues."
    },
    {
      icon: <FaLeaf />,
      bg: "#e9f8ef",
      title: "Carbon Footprint",
      text: "Monitor your environmental impact and contribute to a sustainable future."
    }
  ];

  return (
    <section className="section" id="features">
      <div className="container">
        <div className="stats-strip">
          <div className="stats-item">
            <h3>35%</h3>
            <p>Average Savings</p>
          </div>
          <div className="stats-item">
            <h3>50k+</h3>
            <p>Active Users</p>
          </div>
          <div className="stats-item">
            <h3>24/7</h3>
            <p>Monitoring</p>
          </div>
        </div>

        <h2 className="section-title">Powerful Features for Smart Energy Management</h2>
        <p className="section-subtitle">
          Everything you need to understand, optimize, and reduce your energy consumption
        </p>

        <div className="feature-grid">
          {features.map((item, index) => {
            if (item.title === "Real-Time Monitoring") {
              return (
                <Link to="/real-time-monitoring" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            if (item.title === "AI-Powered Insights") {
              return (
                <Link to="/ai-insights" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            if (item.title === "Cost Reduction") {
              return (
                <Link to="/cost-reduction" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            if (item.title === "Advanced Analytics") {
              return (
                <Link to="/advanced-analytics" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            if (item.title === "Smart Alerts") {
              return (
                <Link to="/smart-alerts" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            if (item.title === "Carbon Footprint") {
              return (
                <Link to="/carbon-footprint" key={index} className="feature-link">
                  <div className="feature-card">
                    <div className="feature-icon" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <div className="feature-learn-more">
                      Learn More <FaArrowRight />
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <div className="feature-card" key={index}>
                <div className="feature-icon" style={{ background: item.bg }}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="feature-learn-more">
                  Learn More <FaArrowRight />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;