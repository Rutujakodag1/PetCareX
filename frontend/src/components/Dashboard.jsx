import React, { useState } from "react";

const UserDashboard = ({ theme, isLoggedIn, handleLogout }) => {
  const [activeTab, setActiveTab] = useState("orders");

  // Dummy data for demonstration
  const orders = [
    {
      id: 1,
      product: "Dog Food",
      status: "Completed",
      date: "2024-12-12",
      total: "$25.00",
    },
    {
      id: 2,
      product: "Cat Toy",
      status: "Processing",
      date: "2024-12-14",
      total: "$12.00",
    },
  ];

  const wishlist = [
    { id: 1, name: "Pet Grooming Kit", price: "$30.00" },
    { id: 2, name: "Pet Bed", price: "$45.00" },
  ];

  const petProfiles = [
    {
      id: 1,
      name: "Buddy",
      type: "Dog",
      age: "2 years",
      lastVisit: "2024-11-28",
    },
    {
      id: 2,
      name: "Mittens",
      type: "Cat",
      age: "1 year",
      lastVisit: "2024-12-05",
    },
  ];

  const tabs = [
    { name: "Orders", key: "orders" },
    { name: "Wishlist", key: "wishlist" },
    { name: "Profile", key: "profile" },
    { name: "Address", key: "address" },
    { name: "Pets", key: "pets" },
  ];

  if (isLoggedIn) {
    tabs.push({ name: "Logout", key: "logout" });
  }

  const handleTabChange = (tab) => {
    if (tab === "logout") {
      handleLogout();
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`flex ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
      {/* Sidebar */}
      <div className={`w-1/4 h-screen p-6 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200"}`}>
        <h2 className="text-xl font-bold mb-4">Dashboard Menu</h2>
        <ul className="space-y-4">
          {tabs.map((tab) => (
            <li
              key={tab.key}
              className={`cursor-pointer p-2 rounded ${
                activeTab === tab.key
                  ? "bg-blue-500 text-white"
                  : `${theme === "dark" ? "text-gray-300" : "text-gray-700"} hover:bg-blue-300`
              }`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>
            {orders.length > 0 ? (
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Product</th>
                    <th className="border border-gray-300 p-2">Status</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="border border-gray-300 p-2">{order.product}</td>
                      <td
                        className={`border border-gray-300 p-2 ${
                          order.status === "Completed" ? "text-green-600" : "text-yellow-500"
                        }`}
                      >
                        {order.status}
                      </td>
                      <td className="border border-gray-300 p-2">{order.date}</td>
                      <td className="border border-gray-300 p-2">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Wishlist</h2>
            {wishlist.length > 0 ? (
              <ul>
                {wishlist.map((item) => (
                  <li key={item.id} className="mb-2">
                    <span className="font-medium">{item.name}</span> - <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">User Profile</h2>
            <p>Name: John Doe</p>
            <p>Email: johndoe@example.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        )}

        {/* Address Tab */}
        {activeTab === "address" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Saved Addresses</h2>
            <p>123 Pet Street, Paw City, 45678</p>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
              Add New Address
            </button>
          </div>
        )}

        {/* Pet Profiles Tab */}
        {activeTab === "pets" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Pet Profiles</h2>
            {petProfiles.length > 0 ? (
              <ul>
                {petProfiles.map((pet) => (
                  <li key={pet.id} className="mb-4">
                    <p>Name: {pet.name}</p>
                      <p>Age: {pet.age}</p>
                    <p>Last Visit: {pet.lastVisit}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pets added. Add your pet's profile now!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
