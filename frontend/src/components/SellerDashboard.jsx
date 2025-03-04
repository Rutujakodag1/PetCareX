import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold text-gray-800">Seller Dashboard</h2>
        <ul className="mt-6">
          <li><button onClick={() => handleSectionChange('dashboard')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Dashboard</button></li>
          <li><button onClick={() => handleSectionChange('products')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Products</button></li>
          <li><button onClick={() => handleSectionChange('addProduct')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Add Product</button></li>
          <li><button onClick={() => handleSectionChange('orders')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Orders</button></li>
          <li><button onClick={() => handleSectionChange('customers')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Customers</button></li>
          <li><button onClick={() => handleSectionChange('reports')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Reports</button></li>
          <li><button onClick={() => handleSectionChange('profile')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Profile</button></li>
          <li><button onClick={() => handleSectionChange('changePassword')} className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Change Password</button></li>
          <li><button className="text-xl w-full text-left py-2 px-4 hover:bg-gray-100">Logout</button></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {activeSection === 'dashboard' && <Dashboard />}
        {activeSection === 'products' && <Products />}
        {activeSection === 'addProduct' && <AddProduct />}
        {activeSection === 'orders' && <Orders />}
        {activeSection === 'customers' && <Customers />}
        {activeSection === 'reports' && <Reports />}
        {activeSection === 'profile' && <Profile />}
        {activeSection === 'changePassword' && <ChangePassword />}
      </div>
    </div>
  );
};

const Dashboard = () => <div className="p-6 bg-white shadow-sm rounded-lg">Welcome to the Seller Dashboard!</div>;

const Products = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Category</th>
            <th className="text-left py-2 px-4">Price</th>
            <th className="text-left py-2 px-4">Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">Pet Food</td>
            <td className="py-2 px-4">Food</td>
            <td className="py-2 px-4">$15.99</td>
            <td className="py-2 px-4">100</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 px-4">Pet Toys</td>
            <td className="py-2 px-4">Toys</td>
            <td className="py-2 px-4">$8.99</td>
            <td className="py-2 px-4">50</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AddProduct = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input type="text" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input type="text" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input type="number" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input type="number" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Product</button>
      </form>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Orders</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Order ID</th>
            <th className="text-left py-2 px-4">Customer</th>
            <th className="text-left py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">#12345</td>
            <td className="py-2 px-4">John Doe</td>
            <td className="py-2 px-4">Shipped</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Customers = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Customers</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Customer Name</th>
            <th className="text-left py-2 px-4">Email</th>
            <th className="text-left py-2 px-4">Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4">John Doe</td>
            <td className="py-2 px-4">john@example.com</td>
            <td className="py-2 px-4">(123) 456-7890</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Reports = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
      <div className="flex space-x-4 mt-4">
        <button className="bg-blue-500 text-white p-2 rounded-md">Daily</button>
        <button className="bg-blue-500 text-white p-2 rounded-md">Monthly</button>
        <button className="bg-blue-500 text-white p-2 rounded-md">Annual</button>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
      <div className="mt-4">
        <p className="text-gray-700">Name: John Doe</p>
        <p className="text-gray-700">Email: john@example.com</p>
        <button className="bg-blue-500 text-white p-2 mt-4 rounded-md">Edit Profile</button>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Change Password</h2>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Current Password</label>
          <input type="password" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input type="password" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm New Password</label>
          <input type="password" className="w-full p-2 border rounded-md mt-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Change Password</button>
      </form>
    </div>
  );
};

export default SellerDashboard;
