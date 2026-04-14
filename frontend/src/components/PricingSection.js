import React, { useState } from "react";
import PaymentModal from "./PaymentModal";
import { Link } from "react-router-dom";

function PricingSection() {
  const plans = [
    {
      id: 1,
      name: "Starter",
      subtitle: "Perfect for individual homes",
      price: "₹50",
      buttonType: "filled",
      popular: false,
      features: [
        "Real-time monitoring",
        "Basic analytics",
        "Mobile app access",
        "Email support",
        "Up to 10 devices"
      ],
      specs: [
        "Monitor up to 10 appliances simultaneously",
        "Daily consumption reports via email",
        "Basic energy-saving tips",
        "Standard customer support (48h response)",
        "Access to mobile and web apps"
      ]
    },
    {
      id: 2,
      name: "Professional",
      subtitle: "Best for families and small offices",
      price: "₹70",
      buttonType: "filled",
      popular: true,
      features: [
        "Everything in Starter",
        "AI-powered insights",
        "Advanced analytics",
        "Priority support",
        "Unlimited devices",
        "Custom alerts",
        "Energy reports"
      ],
      specs: [
        "Unlimited appliance monitoring",
        "Advanced AI-powered recommendations",
        "Real-time alerts and notifications",
        "Priority customer support (24h response)",
        "Detailed weekly and monthly reports",
        "Custom consumption goals and tracking",
        "Carbon footprint analysis"
      ]
    },
    {
      id: 3,
      name: "Enterprise",
      subtitle: "For large properties and businesses",
      price: "₹100",
      buttonType: "filled",
      popular: false,
      features: [
        "Everything in Professional",
        "Multi-location support",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "White-label options",
        "SLA guarantee"
      ],
      specs: [
        "Multi-location energy monitoring",
        "Full API access for custom integrations",
        "Dedicated account manager",
        "Custom white-label branding options",
        "99.9% uptime SLA guarantee",
        "Custom reporting and analytics",
        "Priority phone and email support",
        "Quarterly energy audit reports"
      ]
    }
  ];

  const [activePlan, setActivePlan] = useState(2);
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section className="section" id="pricing">
      <div className="container">
        <h2 className="section-title">Simple, Transparent Pricing</h2>
        <p className="section-subtitle">
          Choose the plan that fits your needs. All plans include a 14-day free trial.
        </p>

        <div className="pricing-top-btn">
          <Link to="/start-free-trial" className="pricing-trial-btn">Start Free Trial</Link>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const isActive = activePlan === plan.id;

            return (
              <div
                key={plan.id}
                className={`pricing-card ${isActive ? "active" : ""}`}
                onMouseEnter={() => setActivePlan(plan.id)}
                onClick={() => setActivePlan(plan.id)}
              >
                {plan.popular && <div className="popular-badge">Most Popular</div>}

                <h3>{plan.name}</h3>
                <p className="pricing-subtitle">{plan.subtitle}</p>

                <div className="pricing-price-row">
                  <span className="price-main">{plan.price}</span>
                  <span className="price-month">/month</span>
                </div>

                <button
                  className={
                    plan.buttonType === "filled"
                      ? "pricing-btn-filled"
                      : "pricing-btn-outline"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPlan(plan);
                  }}
                >
                  Get Started
                </button>

                <ul className="pricing-feature-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>✓ {feature}</li>
                  ))}
                </ul>

                {isActive && (
                  <div className="pricing-specs">
                    <h4>Plan Specifications:</h4>
                    <ul>
                      {plan.specs.map((spec, index) => (
                        <li key={index}>• {spec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </div>
    </section>
  );
}

export default PricingSection;