import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import PricingSection from "../components/PricingSection";
import ReviewsSection from "../components/ReviewsSection";
import AuthModal from "../components/AuthModal";

function Home({ onLogin, user }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar onOpenModal={() => setShowModal(true)} user={user} />

      <HeroSection onOpenModal={() => setShowModal(true)} />
      <FeaturesSection />

      <section className="section" id="howitworks">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Start saving energy in four simple steps</p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-circle">
                🔌 <div className="step-number">01</div>
              </div>
              <h4>Register & Login</h4>
              <p>Create your account securely and access your personalized energy dashboard.</p>
            </div>

            <div className="step-card">
              <div className="step-circle">
                📈 <div className="step-number">02</div>
              </div>
              <h4>Enter Usage Data</h4>
              <p>Add your appliances with power ratings and daily usage hours for accurate analysis.</p>
            </div>

            <div className="step-card">
              <div className="step-circle">
                💡 <div className="step-number">03</div>
              </div>
              <h4>Get Smart Insights</h4>
              <p>Receive AI-powered recommendations to optimize your energy usage and reduce waste.</p>
            </div>

            <div className="step-card">
              <div className="step-circle">
                🎖️ <div className="step-number">04</div>
              </div>
              <h4>Save Money & Energy</h4>
              <p>Implement our suggestions and watch your bills decrease while helping the environment.</p>
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection />

      <PricingSection />

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Saving Energy?</h2>
          <p>
            Join thousands of users who are already reducing their energy costs and carbon footprint.
            Start your free trial today—no credit card required.
          </p>
          <Link to="/start-free-trial" className="secondary-btn">Start Free Trial</Link>
          <p style={{ marginTop: "22px" }}>
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo-wrap" style={{ marginBottom: "18px" }}>
                <div className="logo-box">⚡</div>
                <div className="logo-text">EnergyAnalyzer</div>
              </div>
              <p>
                Smart energy consumption analysis powered by AI. Save money, reduce waste,
                and contribute to a sustainable future.
              </p>
            </div>

            <div>
              <h4>Product</h4>
              <ul>
                <li>Features</li>
                <li>Pricing</li>
                <li>Analytics</li>
                <li>Integrations</li>
              </ul>
            </div>

            <div>
              <h4>Company</h4>
              <ul>
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Status</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 EnergyAnalyzer. All rights reserved.</p>
            <p>Privacy Policy &nbsp;&nbsp; Terms of Service &nbsp;&nbsp; Cookie Policy</p>
          </div>
        </div>
      </footer>

      {showModal && <AuthModal onClose={() => setShowModal(false)} onLogin={onLogin} />}
    </>
  );
}

export default Home;