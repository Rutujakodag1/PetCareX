import React from "react";
import { useNavigate } from "react-router-dom";
import success from '../../assets/success.png';

const OrderSuccess = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <img
        src={success}
        alt="Order Success"
        className="w-48 h-48 mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-lg mb-8 text-center">
        Thank you for shopping with us! Your furry friend will love the items you’ve chosen.  
        We’re preparing your order and will update you soon!
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
        onClick={() => navigate("/orders")}
      >
        View My Orders
      </button>
      <button
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition"
        onClick={() => navigate("/")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
