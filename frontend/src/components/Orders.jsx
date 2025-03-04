import React, { useState } from "react";

const Orders = () => {
  // Sample order data
  const [orders, setOrders] = useState([
    {
      id: 1,
      petName: "Buddy",
      product: "Pet Food",
      orderDate: "2024-12-15",
      status: "Delivered",
      img: "/assets/pet-food.png",
    },
    {
      id: 2,
      petName: "Milo",
      product: "Chew Toy",
      orderDate: "2024-12-14",
      status: "In Transit",
      img: "/assets/chew-toy.png",
    },
    {
      id: 3,
      petName: "Whiskers",
      product: "Cat Bed",
      orderDate: "2024-12-13",
      status: "Cancelled",
      img: "/assets/cat-bed.png",
    },
  ]);

  // Handle reorder
  const handleReorder = (id) => {
    alert(`Reordered item for Order ID: ${id}`);
  };

  // Handle cancel
  const handleCancel = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "Cancelled" } : order
    ));
    alert(`Order ID: ${id} has been cancelled.`);
  };

  return (
    <div className="bg-gradient-to-b from-[#DEECE1] to-[#FFD5C5] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={order.img}
              alt={order.product}
              className="w-32 h-32 object-cover mb-4"
            />
            <h2 className="text-lg font-semibold">{order.product}</h2>
            <p className="text-sm text-gray-600">For: {order.petName}</p>
            <p className="text-sm text-gray-600">Ordered On: {order.orderDate}</p>
            <p
              className={`text-sm font-medium mb-4 ${
                order.status === "Delivered"
                  ? "text-green-500"
                  : order.status === "In Transit"
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              Status: {order.status}
            </p>
            <div className="flex space-x-4">
              {order.status === "Cancelled" ? (
                <button
                  onClick={() => handleReorder(order.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Reorder
                </button>
              ) : (
                <button
                  onClick={() => handleCancel(order.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
