import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { refresh } from '../utils/auth';

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
  const [products, setProducts] = useState([]);
  const baseUrl = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {


    try {
      let token = localStorage.getItem('token');

      const response = await axios.get(`${baseUrl}/seller/products/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data); // check shape
      console.log(response.data.results); // check shape

      setProducts(response.data.results);

      // setProducts(response.data.results); 

    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Token expired → try refresh
        const newToken = await refresh();

        if (newToken) {
          const retry = await axios.get(`${baseUrl}/seller/products/`, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          setProducts(retry.data.results);
        } else {
          console.error('Login expired. Please login again.');
        }

      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchProducts();

  }, []);
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2 px-4">Name</th>
            <th className="text-left py-2 px-4">Category</th>
            <th className="text-left py-2 px-4">Price</th>
            <th className="text-left py-2 px-4">Tags</th>
            <th className="text-left py-2 px-4">Details</th>
            <th className="text-left py-2 px-4">Image</th>
            {/* <th className="text-left py-2 px-4">Image</th> */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="py-2 px-4">{product.title}</td>
              <td className="py-2 px-4">{product.category?.title}</td> {/* depends on your serializer */}
              <td className="py-2 px-4">${product.price}</td>
              <td className="py-2 px-4">{product.tags}</td>
              <td className="py-2 px-4">{product.detail}</td>
              <td className="py-2 px-4">
                {product.product_imgs && product.product_imgs.length > 0 && (
                  <img
                    src={`${baseUrl}${product.product_imgs[0].image}`}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

// const AddProduct = () => {
//   return (
//     <div className="bg-white shadow-md p-4 rounded-lg">
//       <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>
//       <form className="mt-4">
//         <div className="mb-4">
//           <label className="block text-gray-700">Product Name</label>
//           <input type="text" className="w-full p-2 border rounded-md mt-2" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Category</label>
//           <input type="text" className="w-full p-2 border rounded-md mt-2" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Price</label>
//           <input type="number" className="w-full p-2 border rounded-md mt-2" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Stock</label>
//           <input type="number" className="w-full p-2 border rounded-md mt-2" />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">Add Product</button>
//       </form>
//     </div>
//   );
// };


const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]);

  // TEMP: replace with actual seller ID
  // const sellerId = 1; 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category_id', category);
    formData.append('price', price);
    formData.append('tags', tags);
    formData.append('detail', detail);
    formData.append('stock',stock);
    // formData.append('seller', sellerId); // ✅ Required field
    if (image) {
      formData.append('image', image);
    }

    try {
      let token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/api/seller/products/', formData, {
        headers: {
           Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setMessage('Product added successfully!');
      // Clear form
      setTitle('');
      setCategory('');
      setPrice('');
      setTags('');
      setDetail('');
      setImage(null);
    } catch (error) {
      console.error(error.response || error);
      setMessage('Failed to add product.');
    }
  };

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched categories:', data.results);
        setCategories(data.results || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">Add Product</h2>

      {message && <p className="my-2 text-green-600">{message}</p>}

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md mt-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded-md mt-2" required />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-2 border rounded-md mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)}
            className="w-full p-2 border rounded-md mt-2" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Details</label>
          <textarea value={detail} onChange={(e) => setDetail(e.target.value)}
            className="w-full p-2 border rounded-md mt-2" rows={4} />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded-md mt-2" />
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
