import React from "react";
import { useNavigate } from "react-router-dom";
import failure from '../../assets/failure.png';


const OrderFailure = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <img
        src= {failure}
        alt="Order Failure"
        className="w-38 h-48 mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">Oops! Something Went Wrong</h1>
      <p className="text-lg mb-8 text-center">
        We’re sorry, but we couldn’t process your order. Your pet deserves the 
        best, and we’re here to help you get it right.  
        Please try again or contact support if the issue persists.
      </p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition"
        onClick={() => navigate("/cart")}
      >
        Retry Order
      </button>
      <button
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition"
        onClick={() => navigate("/support")}
      >
        Contact Support
      </button>
    </div>
  );
};

export default OrderFailure;
