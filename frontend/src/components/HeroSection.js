import React from "react";
import { Link } from "react-router-dom";

function HeroSection({ onOpenModal }) {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div>
          <div className="hero-badge">⚡ Smart Energy Solutions</div>

          <h1>
            Analyze Your <br />
            <span>Energy Consumption</span> <br />
            Intelligently
          </h1>

          <p>
            Take control of your energy usage with real-time monitoring, AI-powered
            insights, and actionable recommendations. Save money while reducing
            your carbon footprint.
          </p>

          <div className="hero-buttons">
            <Link to="/start-free-trial" className="primary-btn hero-link-btn">
              Get Started Free
            </Link>

            <button className="secondary-btn" onClick={onOpenModal}>
              Watch Demo
            </button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop"
            alt="solar"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;