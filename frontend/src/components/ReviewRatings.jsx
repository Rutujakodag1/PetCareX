import React, { useState } from "react";

// Sample reviews data
const sampleReviews = [
  {
    id: 1,
    username: "JohnDoe",
    rating: 5,
    review: "Excellent product! My pet loved it.",
    date: "2024-12-16",
  },
  {
    id: 2,
    username: "JaneSmith",
    rating: 4,
    review: "Great quality, but the delivery took a bit longer than expected.",
    date: "2024-12-15",
  },
  {
    id: 3,
    username: "Alex99",
    rating: 3,
    review: "Good, but the size was smaller than expected.",
    date: "2024-12-14",
  },
];

const ProductReview = ({ product, theme }) => {
  const [rating, setRating] = useState(0); // Rating value from 1 to 5
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(sampleReviews);

  // Handle rating change
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  // Handle review text change
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  // Submit the review
  const handleSubmitReview = () => {
    if (rating === 0 || reviewText.trim() === "") {
      alert("Please provide both a rating and a review.");
      return;
    }

    const newReview = {
      id: reviews.length + 1,
      username: "CurrentUser", // Replace with actual user data
      rating,
      review: reviewText,
      date: new Date().toLocaleDateString(),
    };

    setReviews([...reviews, newReview]);
    setRating(0);
    setReviewText("");
    alert("Your review has been submitted.");
  };

  return (
    <div
      className={`p-6 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
    >
      <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Leave a Review</h3>
        <div className="mt-2">
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`cursor-pointer text-xl ${
                  star <= rating ? "text-yellow-400" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={reviewText}
            onChange={handleReviewTextChange}
            placeholder="Write your review here..."
            rows="4"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          ></textarea>
          <button
            onClick={handleSubmitReview}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Review
          </button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">All Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className={`p-4 mb-4 rounded-lg shadow-md ${
                theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{review.username}</span>
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= review.rating ? "text-yellow-400" : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-2">{review.review}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
