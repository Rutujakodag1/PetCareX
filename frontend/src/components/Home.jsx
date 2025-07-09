import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../ThemeContext";
import axios from 'axios'
import banner1 from '../assets/pet1.jpg';
import banner2 from '../assets/pet2.jpg';
import banner3 from '../assets/pet3.jpg';
import belt from '../assets/products/belt.jpg';
import food1 from '../assets/products/food1.jpg';
import toy from '../assets/products/toy.webp';
import catImage from '../assets/pets/cat.png';
import birdImage from '../assets/pets/bird.png';
import dogImage from '../assets/pets/dog.png';
import rabImage from '../assets/pets/rab.png';

// In Home.jsx
import Banner from "./homeComponents/Banner.jsx"; // Correct relative path
import ProductCard from "./homeComponents/ProductCard.jsx"; // Correct relative path
import FeaturedDeals from "./homeComponents/FeaturedDeals.jsx"; // Correct relative path
import FilterSidebar from "./homeComponents/Sidebar.jsx";
import RecentlyViewed from "./homeComponents/RecentlyViewed.jsx";
import ShopByPets from "./homeComponents/ShopByPets";
// import AllProducts from "./AllProducts.jsx";
import { Link, useNavigate } from "react-router-dom";
import AllProducts from "./product/AllProducts.jsx";
import SingleProduct from "./product/SingleProduct.jsx";


const HomePage = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({});


  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  const safeCategories = Array.isArray(categories) ? categories : [];

  // Convert category ID to name
const categoryMap = Object.fromEntries(
  safeCategories.map((cat) => [cat.id, cat.name])
);

// Convert name to ID (for filtering)
const reverseCategoryMap = Object.fromEntries(
  safeCategories.map((cat) => [cat.name, cat.id])
);


  const bgClass = theme === 'dark' ? 'bg-[#1a202c] text-white' : 'bg-[#FFD5C5] text-gray-800';
  const bannerOverlayClass = theme === 'dark' ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-60';
  const cardClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const buttonClass = theme === 'dark' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-orange-400 hover:bg-orange-500';

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (products && products.length > 0) {
      console.log("Categories from backend:", products.map(p => p.category));
    }
  }, [products]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        //   , {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        // Handle paginated or non-paginated DRF responses
        const productArray = Array.isArray(data) ? data : data.results;
        setProducts(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
        // setProducts([]);
      }
    };

    fetchProducts();
  }, []);




  useEffect(() => {
    const initialSelected = {};
    safeCategories.forEach(cat => {
      initialSelected[cat.name] = false;
    });
    setSelectedCategories(initialSelected);
  }, [categories]);

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Recently viewed items state
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Add item to recently viewed
  const handleViewProduct = (product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return updated;
    });
  };

  // Handle category filter change
  // const handleCategoryChange = (category) => {
  //   setSelectedCategories((prev) => ({
  //     ...prev,
  //     [category]: !prev[category],
  //   }));
  // };

const handleCategoryChange = (categoryName) => {
  setSelectedCategories((prev) => ({
    ...prev,
    [categoryName]: !prev[categoryName],
  }));
};
  // Handle price range change
  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  // if (!Array.isArray(products)) {
  //   return <div>Loading products...</div>; // or handle it gracefully
  // }

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const categoryName = categoryMap[product.category] || 'Unknown';
 // convert ID to name
    const isCategorySelected = selectedCategories[categoryName];
    const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
  
    // If no category is selected, show all
    const noCategorySelected = Object.values(selectedCategories).every(val => !val);
  
    return (isCategorySelected || noCategorySelected) && isWithinPriceRange;
  });

  // Sample banner data
  const banners = [
    { id: 1, image: banner1, text: "Welcome to PetCareX" },
    { id: 2, image: banner2, text: "Best Products for Your Pets" },
    { id: 3, image: banner3, text: "Quality Pet Care Essentials" },
  ];


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(stored);
  }, []);


  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    
    if (filteredProducts.length > 0 && randomProducts.length === 0) {
      const shuffled = [...filteredProducts].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setRandomProducts(selected);
    }
  }, [filteredProducts]);

  // Navigate to all products
  const goToAllProducts = () => {
    navigate('/products', { state: { products } }); // Passing products via state

  };

  return (
    <div className={`min-h-screen ${bgClass} transition-all`}>

      {/* Banner Section */}
      <Banner
        banners={banners}
        bannerOverlayClass="bg-black bg-opacity-50"
      />



      {/* Shop by Pet Section */}
      <ShopByPets
        dogImage={dogImage}
        catImage={catImage}
        birdImage={birdImage}
        rabImage={rabImage}
        theme={theme} // Pass theme here
      />

      {/* Sidebar Section */}
      <div className="flex p-4 gap-4">
        <FilterSidebar
          theme={theme}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          handleCategoryChange={handleCategoryChange}
          handlePriceChange={handlePriceChange}
        />

        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Shop Products</h2>
            <button onClick={goToAllProducts} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
              See All Products
            </button>
          </div>
          {products.length === 0 ? (
            <p>Loading products...</p>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...filteredProducts]
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((product) => (
                <SingleProduct
                  key={product.id}
                  product={product}
                  buttonClass={buttonClass}
                  theme={theme}
                  onViewProduct={handleViewProduct}
                />
                
              ))}
              

          </div>
        )}
          
        </div>
      </div>

      {/* <button onClick={goToAllProducts}>See All Products</button> */}
      {/* Recently Viewed Section */}
      <RecentlyViewed recentlyViewed={recentlyViewed} theme={theme} />
      {/* <SingleProduct recentlyViewed = {recentlyViewed} /> */}


    </div>
  );
};

export default HomePage;
