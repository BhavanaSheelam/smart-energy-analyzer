import React, { useState } from "react";
import {
  FaXmark,
  FaCreditCard,
  FaLock,
  FaPaypal,
  FaCheck
} from "react-icons/fa6";

function PaymentModal({ plan, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholder, setCardholder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!plan) return null;

  const handleCardPayment = (e) => {
    e.preventDefault();

    if (!cardNumber || !cardholder || !expiry || !cvv) {
      alert("Please fill all card details.");
      return;
    }

    alert(`Payment processed for ${plan.name} plan!`);
    onClose();
  };

  const handlePaypalPayment = () => {
    alert(`Redirecting to PayPal for ${plan.name} plan!`);
    onClose();
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <button className="payment-close" onClick={onClose}>
          <FaXmark />
        </button>

        <h2 className="payment-title">Complete Your Purchase</h2>

        <div className="payment-grid">
          <div className="payment-summary">
            <h3>Order Summary</h3>

            <div className="payment-summary-card">
              <h4>{plan.name} Plan</h4>
              <p className="payment-billed">Billed monthly</p>

              <ul className="payment-feature-list">
                {plan.features.slice(0, 5).map((feature, index) => (
                  <li key={index}>
                    <FaCheck />
                    <span>{feature.replace("✓ ", "")}</span>
                  </li>
                ))}
              </ul>

              <div className="payment-divider"></div>

              <div className="payment-row">
                <span>Subtotal</span>
                <strong>{plan.price}</strong>
              </div>

              <div className="payment-row">
                <span>Tax</span>
                <strong>$0.00</strong>
              </div>

              <div className="payment-divider"></div>

              <div className="payment-total-row">
                <div>
                  <span>Total</span>
                </div>
                <div className="payment-total-right">
                  <h5>{plan.price}</h5>
                  <p>/month</p>
                </div>
              </div>
            </div>

            <div className="payment-guarantee">
              <h4>14-Day Money-Back Guarantee</h4>
              <p>Not satisfied? Get a full refund within 14 days, no questions asked.</p>
            </div>
          </div>

          <div className="payment-method-section">
            <h3>Payment Method</h3>

            <div className="payment-method-tabs">
              <button
                className={`payment-method-btn ${paymentMethod === "card" ? "active" : ""}`}
                onClick={() => setPaymentMethod("card")}
              >
                <FaCreditCard />
                <span>Credit Card</span>
              </button>

              <button
                className={`payment-method-btn ${paymentMethod === "paypal" ? "active" : ""}`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <FaPaypal />
                <span>PayPal</span>
              </button>
            </div>

            {paymentMethod === "card" ? (
              <form onSubmit={handleCardPayment} className="payment-form">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />

                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                />

                <div className="payment-row-grid">
                  <div>
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                  </div>

                  <div>
                    <label>CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>

                <div className="payment-secure-box">
                  <FaLock />
                  <span>Your payment information is encrypted and secure</span>
                </div>

                <button type="submit" className="payment-submit-btn">
                  Complete Payment
                </button>

                <p className="payment-terms">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </form>
            ) : (
              <div className="paypal-box">
                <div className="paypal-icon-circle">
                  <FaPaypal />
                </div>

                <p>
                  You'll be redirected to PayPal to complete your purchase securely.
                </p>

                <button className="paypal-btn" onClick={handlePaypalPayment}>
                  Continue to PayPal
                </button>

                <p className="payment-terms">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;