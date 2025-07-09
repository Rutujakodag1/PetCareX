// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/layout/Navbar'
// import ContactForm from './components/ContactForm'
import ContactUs from './components/pages/ContactForm'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Login from './components/pages/Login';
import Logout from './components/pages/Logout';
import Home from './components/Home';
import Signup from './components/pages/Signup';
import PetProfile from './components/petProfile/PetProfile';
// import PetCategories from './components/PetCategories';
import CheckoutPage from './components/pages/CheckoutPage';
import ConsultationBooking from './components/ConsultationBooking';
import PetAdoption from './components/PetAdoption';
import PetCareBlog from './components/PetBlogs';
import PetService from './components/PetServices';
import ProductReview from './components/ReviewRatings';
import UserDashboard from './components/Dashboard';
import OrderSuccess from './components/order/OrderSuccess';
import OrderFailure from './components/order/OrderFailure';
import Orders from './components/order/Orders';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import SellerDashboard from './components/SellerDashboard';
import AllProducts from './components/product/AllProducts';
import LatestProduct from './components/product/LatestProduct';
import CategoryProducts from './components/product/CategoryProducts';
import PetCategories from './components/PetCategories';
import ProductDetail from './components/product/ProductDetail';
// import CategoryProduct from './components/CategoryProducts';
// import Categories from './components/Categories';
import TagProducts from './components/product/TagProducts';
import ScrollToTop from './ScrollToTop';
import { useEffect, useState } from 'react';


function App() {
  // const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    } else if (savedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  // Apply theme + save preference
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <>
      <div className="bg-gradient-to-br 
from-white via-gray-100 to-gray-200 
dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#334155] 
text-[#1f2937] dark:text-[#f8fafc] min-h-screen transition-colors">
        <ScrollToTop />
        {/* <Router > */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home Page */}

          <Route path="/contact" element={<ContactUs />} />
          <Route path="/pet-profile" element={<PetProfile />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          <Route path="/categories" element={<PetCategories />} />
          <Route path="/category/:category_slug/:category_id" element={<CategoryProducts />} />
          <Route path="/products/:tag" element={<TagProducts />} />
          <Route path="/consultation-booking" element={<ConsultationBooking />} />
          <Route path="/pet-adoption" element={<PetAdoption />} />
          <Route path="/blogs" element={<PetCareBlog />} />
          <Route path="/services" element={<PetService />} />

          <Route path="/reviews-ratings" element={<ProductReview />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/order/failure" element={<OrderFailure />} />

          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/logout" element={<Logout />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page */}
          <Route path="/customer/orders" element={<Orders />} />
          <Route path="/customer/dashboard" element={<UserDashboard />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/products" element={<AllProducts />} />

          <Route path='/latest' element={<LatestProduct />} />

          <Route path='/product/:product_slug/:product_id' element={<ProductDetail />} />

          {/* <Route path='/categoriesproduct' element={<CategoryProduct />} />
        <Route path='/categories' element={<Categories />} /> */}

        </Routes>
        <Footer />
        {/* </Router> */}
        {/* <h1>Vite + React</h1> */}
        {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
        {/* </ScrollToTop> */}
      </div>
    </>
  )
}

export default App
