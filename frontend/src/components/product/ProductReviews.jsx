import React, { useState, useEffect } from 'react';

const ProductReviews = ({ productId, theme }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(1);

  // Fetch reviews for the product
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/api/products/${productId}/reviews`);
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, [productId]);

  // Handle submitting a review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ review: newReview, rating }),
    });

    if (response.ok) {
      setNewReview('');
      setRating(1);
      alert('Review submitted successfully!');
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <div className={`mt-6 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} p-4 rounded-lg shadow-lg`}>
      <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
      
      {/* Reviews */}
      <div className="mb-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                <span className="ml-2 text-gray-500">{review.username}</span>
              </div>
              <p className="mt-2 text-gray-600">{review.review}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
      </div>

      {/* Submit Review */}
      <form onSubmit={handleSubmitReview}>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review here"
          className={`w-full p-2 mb-4 rounded-md border ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          rows="4"
        ></textarea>
        
        <div className="flex items-center mb-4">
          <span className="mr-2">Rating:</span>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 && 's'}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ProductReviews;
