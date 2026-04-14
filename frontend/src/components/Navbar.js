import React, { useState } from "react";
import { FaBolt } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReviewModal from "./ReviewModal";

function Navbar({ onOpenModal, user, onLogout, dashboardMode = false }) {
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <>
      <div className="navbar">
        <div className="container navbar-inner">
          <div className="logo-wrap">
            <div className="logo-box">
              <FaBolt />
            </div>
            <div className="logo-text">EnergyAnalyzer</div>
          </div>

          {!dashboardMode ? (
            <>
              <div className="nav-links">
                <a href="/#demo">Demo</a>
                <a href="/#features">Features</a>
                <a href="/#pricing">Pricing</a>
                <a href="/#testimonials">Reviews</a>
              </div>

              <div className="nav-right">
                {user ? (
                  <>
                    <button
                      className="secondary-btn"
                      onClick={() => setShowReviewModal(true)}
                    >
                      Review
                    </button>

                    <Link to="/dashboard" className="primary-btn">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <button className="signin-btn" onClick={onOpenModal}>
                      Sign In
                    </button>

                    <button className="primary-btn" onClick={onOpenModal}>
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="nav-right">
              <button
                className="secondary-btn"
                onClick={() => setShowReviewModal(true)}
              >
                Review
              </button>

              <span style={{ color: "#475569", fontSize: "18px" }}>
                {user?.email}
              </span>

              <button className="secondary-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showReviewModal && user && (
        <ReviewModal
          user={user}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
}

export default Navbar;