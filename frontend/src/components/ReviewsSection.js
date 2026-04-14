import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackReviews = [
    {
      _id: "1",
      userName: "Sarah Johnson",
      userEmail: "Homeowner",
      rating: 5,
      message:
        "This analyzer helped me reduce my electricity bill by 40%! The insights are incredibly detailed and easy to understand."
    },
    {
      _id: "2",
      userName: "Michael Chen",
      userEmail: "Small Business Owner",
      rating: 5,
      message:
        "Perfect for our office. We identified energy waste we didn't know existed. Already seeing significant cost savings."
    },
    {
      _id: "3",
      userName: "Emily Rodriguez",
      userEmail: "Property Manager",
      rating: 5,
      message:
        "Managing multiple properties is now much easier. The real-time monitoring and alerts are game-changers."
    }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get("/reviews");
        if (data.length > 0) {
          setReviews(data.slice(0, 3));
        } else {
          setReviews(fallbackReviews);
        }
      } catch (error) {
        console.log("Fetch reviews error:", error);
        setReviews(fallbackReviews);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <p className="section-subtitle">
          Join thousands of satisfied customers saving energy and money
        </p>

        {loading ? (
          <div className="empty-card">
            <h3>Loading reviews...</h3>
          </div>
        ) : (
          <>
            <div className="testimonial-grid">
              {reviews.map((item) => (
                <div className="testimonial-card" key={item._id}>
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
                </div>
              ))}
            </div>

            <div className="reviews-see-more-wrap">
              <Link to="/all-reviews" className="reviews-see-more-btn">
                See More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ReviewsSection;