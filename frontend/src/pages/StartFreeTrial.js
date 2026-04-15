import React from "react";
import Navbar from "../components/Navbar";
import {
  FaBolt,
  FaArrowDown,
  FaLightbulb,
  FaChartBar,
  FaBell,
  FaLeaf,
  FaArrowRight
} from "react-icons/fa";
import { Link } from "react-router-dom";

function StartFreeTrial({ user }) {
  const includedFeatures = [
    "Real-time energy monitoring for unlimited devices",
    "AI-powered insights and personalized recommendations",
    "Advanced analytics with interactive charts and reports",
    "Smart alerts for unusual consumption and potential issues",
    "Carbon footprint tracking and environmental impact analysis",
    "Cost reduction strategies and bill estimation",
    "Mobile app access for monitoring on the go",
    "Email and in-app support during trial period",
    "No credit card required to start",
    "Cancel anytime with no obligations"
  ];

  const premiumFeatures = [
    {
      icon: <FaBolt />,
      title: "Full Platform Access",
      text: "Access all premium features including AI-powered insights, advanced analytics, and smart alerts"
    },
    {
      icon: <FaArrowDown />,
      title: "Unlimited Appliances",
      text: "Add as many appliances as you need to get a complete picture of your energy consumption"
    },
    {
      icon: <FaLightbulb />,
      title: "AI Recommendations",
      text: "Get personalized energy-saving recommendations powered by machine learning algorithms"
    },
    {
      icon: <FaChartBar />,
      title: "Real-Time Monitoring",
      text: "Track your energy consumption in real-time with live updates and instant notifications"
    },
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      text: "Receive alerts for unusual consumption patterns and potential equipment issues"
    },
    {
      icon: <FaLeaf />,
      title: "Carbon Footprint Tracking",
      text: "Monitor your environmental impact and see how your actions contribute to sustainability"
    }
  ];

  const journeySteps = [
    {
      day: "Day 1-3",
      title: "Setup & Onboarding",
      text: "Add your appliances and configure your energy monitoring preferences"
    },
    {
      day: "Day 4-7",
      title: "Data Collection",
      text: "Our system learns your consumption patterns and builds your energy profile"
    },
    {
      day: "Day 8-10",
      title: "Initial Insights",
      text: "Receive your first AI-powered recommendations and identify quick wins"
    },
    {
      day: "Day 11-14",
      title: "Optimization",
      text: "Fine-tune your settings and start seeing real savings on your energy bills"
    }
  ];

  const faqs = [
    {
      question: "Do I need a credit card to start?",
      answer: "No! We don't require any payment information to start your free trial. Just sign up with your email and you're good to go."
    },
    {
      question: "What happens after 14 days?",
      answer: "You can choose to upgrade to a paid plan or continue with our free basic plan. No automatic charges - you're in complete control."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely! There are no contracts or commitments. You can cancel your trial at any time with just one click."
    },
    {
      question: "How accurate is the energy monitoring?",
      answer: "Our system provides highly accurate consumption estimates based on appliance specifications and usage patterns, with 95%+ accuracy."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use bank-level encryption and never share your data with third parties. Your privacy and security are our top priorities."
    },
    {
      question: "Do I get support during the trial?",
      answer: "Yes! You'll have full access to our email support team and comprehensive documentation throughout your trial period."
    }
  ];

  return (
    <>
      <Navbar user={user} />

      <div className="trial-page">
        <div className="container">
          <div className="trial-hero">
            <div className="trial-badge">
              <FaBolt />
              <span>14-Day Free Trial</span>
            </div>

            <h1>Try EnergyAnalyzer Risk-Free</h1>

            <p>
              Experience the power of intelligent energy management for 14 days.
              No credit card required. No commitments.
            </p>

            <Link to="/dashboard" className="trial-hero-btn">
              Start Your Free Trial Now
              <FaArrowRight />
            </Link>

            <div className="trial-users-note">
              Join 10,000+ users already saving on their energy bills
            </div>
          </div>

          <div className="trial-included-card">
            <h2>What's Included in Your Free Trial</h2>

            <div className="trial-included-grid">
              {includedFeatures.map((item, index) => (
                <div key={index} className="trial-included-item">
                  <span className="trial-check">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="trial-section-heading">
            <h2>Discover All Premium Features</h2>
          </div>

          <div className="trial-premium-grid">
            {premiumFeatures.map((item, index) => (
              <div key={index} className="trial-feature-card">
                <div className="trial-feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="trial-section-heading">
            <h2>Your 14-Day Journey to Energy Savings</h2>
            <p>Here's what to expect during your free trial period</p>
          </div>

          <div className="trial-journey-grid">
            {journeySteps.map((item, index) => (
              <div key={index} className="trial-journey-card">
                <div className="trial-step-number">{index + 1}</div>
                <div className="trial-step-day">{item.day}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div className="trial-results-card">
            <h2>What Users Achieve in 14 Days</h2>

            <div className="trial-results-grid">
              <div className="trial-result-box green">
                <div className="trial-result-icon">
                  <FaArrowDown />
                </div>
                <h3>23%</h3>
                <h4>Average Energy Reduction</h4>
                <p>in the first two weeks</p>
              </div>

              <div className="trial-result-box blue">
                <div className="trial-result-icon">
                  <FaChartBar />
                </div>
                <h3>8.5</h3>
                <h4>Actionable Insights</h4>
                <p>per user on average</p>
              </div>

              <div className="trial-result-box purple">
                <div className="trial-result-icon">
                  <FaLightbulb />
                </div>
                <h3>$47</h3>
                <h4>Projected Monthly Savings</h4>
                <p>after implementing recommendations</p>
              </div>
            </div>
          </div>

          <div className="trial-section-heading">
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className="trial-faq-grid">
            {faqs.map((item, index) => (
              <div key={index} className="trial-faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="trial-final-cta">
            <h2>Ready to Start Saving?</h2>

            <p>
              Join thousands of satisfied users who have reduced their energy bills and
              carbon footprint
            </p>

            <Link to="/dashboard" className="trial-final-btn">
              Start Your 14-Day Free Trial
              <FaArrowRight />
            </Link>

            <div className="trial-final-note">
              No credit card required • Full access to all features • Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StartFreeTrial;