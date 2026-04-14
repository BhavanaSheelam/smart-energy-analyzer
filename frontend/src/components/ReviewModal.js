import React, { useState } from "react";
import { FaStar, FaXmark } from "react-icons/fa";
import API from "../services/api";

function ReviewModal({ user, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !message.trim()) {
      alert("Please select rating and write your review");
      return;
    }

    try {
      setSubmitting(true);

      await API.post("/reviews", {
        userName: user?.name || user?.email?.split("@")[0] || "User",
        userEmail: user?.email || "user@example.com",
        rating,
        message
      });

      setSuccess("Your review is submitted successfully");
      setMessage("");
      setRating(0);

      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (error) {
      console.log("Submit review error:", error);
      alert("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="review-overlay">
      <div className="review-modal">
        <button className="review-close-btn" onClick={onClose}>
          <FaXmark />
        </button>

        <h2>Do you like this website?</h2>
        <p>Tell us with your review and ratings</p>

        {success ? (
          <div className="review-success-box">
            <h3>{success}</h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="review-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className="star-btn"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar
                    className={
                      star <= (hover || rating) ? "star-filled" : "star-empty"
                    }
                  />
                </button>
              ))}
            </div>

            <textarea
              className="review-textarea"
              rows="5"
              placeholder="Write your review here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="review-submit-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ReviewModal;