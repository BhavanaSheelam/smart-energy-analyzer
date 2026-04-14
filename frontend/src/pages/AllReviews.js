import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AllReviews({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const { data } = await API.get("/reviews");
      setReviews(data);
    } catch (error) {
      console.log("Fetch reviews error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((item) => item._id !== id));
      alert("Review deleted successfully");
    } catch (error) {
      console.log("Delete review error:", error);
      alert("Failed to delete review");
    }
  };

  return (
    <>
      <Navbar user={user} />

      <div className="all-reviews-page">
        <div className="container">
          <div className="all-reviews-hero">
            <h1>What Our Users Say</h1>
            <p>Read all feedback and ratings shared by our users</p>
          </div>

          {loading ? (
            <div className="empty-card">
              <h3>Loading reviews...</h3>
            </div>
          ) : reviews.length === 0 ? (
            <div className="empty-card">
              <h3>No reviews yet</h3>
              <p>Be the first one to share your feedback.</p>
            </div>
          ) : (
            <div className="all-reviews-grid">
              {reviews.map((item) => (
                <div className="testimonial-card review-card-with-delete" key={item._id}>
                  <div>{"⭐".repeat(item.rating)}</div>

                  <div className="testimonial-text">
                    "{item.message}"
                  </div>

                  <div className="user-row">
                    <div className="user-avatar">
                      {(item.userName || "U").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4>{item.userName}</h4>
                      <p>{item.userEmail}</p>
                    </div>
                  </div>

                  <button
                    className="delete-review-btn"
                    onClick={() => handleDeleteReview(item._id)}
                  >
                    Delete Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllReviews;