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
  // Image paths for the Shop by Pets section

  // const dogImage = "../assets/pets/dog.png";
  // const catImage = "../assets/pets/cat.png";
  // const birdImage = "../assets/pets/bird.png";
  // const rabImage = "../assets/pets/rab.png";

  const bgClass = theme === 'dark' ? 'bg-[#1a202c] text-white' : 'bg-[#FFD5C5] text-gray-800';
  const bannerOverlayClass = theme === 'dark' ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-60';
  const cardClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800';
  const buttonClass = theme === 'dark' ? 'bg-orange-500 hover:bg-orange-400' : 'bg-orange-400 hover:bg-orange-500';

  // Sample product data
  // const [products, setProducts] = useState([
  //   { id: 1, name: "Dog Food", price: 20, image: food1, category: "Food" },
  //   { id: 2, name: "Cat Toy", price: 10, image: toy, category: "Toys" },
  //   { id: 3, name: "Bird Cage", price: 50, image: belt, category: "Accessories" },
  // ]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (products && products.length > 0) {
      console.log("Categories from backend:", products.map(p => p.category));
    }
  }, [products]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/products/");
        const data = await response.json();

        // Handle paginated or non-paginated DRF responses
        const productArray = Array.isArray(data) ? data : data.results;
        setProducts(productArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  // Filter state
  // const [selectedCategories, setSelectedCategories] = useState({
  //   Food: false,
  //   Toys: false,
  //   Accessories: false,
  //   Python: false,
  // });

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

  if (!Array.isArray(products)) {
    return <div>Loading products...</div>; // or handle it gracefully
  }

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


  // Featured Deals Data
  const featuredDeals = [
    {
      id: 1,
      name: "Special Dog Food",
      price: 15,
      image: food1,
      offerEndTime: 3600,
    },
    {
      id: 2,
      name: "Discounted Cat Toy",
      price: 8,
      image: toy,
      offerEndTime: new Date().getTime() + 7200000,
    },
    {
      id: 3,
      name: "Exclusive Pet Belt",
      price: 25,
      image: belt,
      offerEndTime: new Date().getTime() + 10800000,
    },
    {
      id: 4,
      name: "Special Dog Food",
      price: 15,
      image: food1,
      offerEndTime: new Date().getTime() + 36000,
    },
    {
      id: 5,
      name: "Discounted Cat Toy",
      price: 8,
      image: toy,
      offerEndTime: new Date().getTime() + 7200000,
    },
  ];

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
    // window.scrollTo({
    //   top: 0,
    //   behavior: 'smooth'
    // });
  };

  return (
    <div className={`min-h-screen ${bgClass} transition-all`}>

      {/* Banner Section */}
      <Banner
        banners={banners}
        bannerOverlayClass="bg-black bg-opacity-50"
      />

      {/* Featured Deals Section */}
      <div className="mt-10">
        <FeaturedDeals
          featuredDeals={featuredDeals}
          theme={theme}
        />
      </div>


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

          {/* View All Products Button */}
          {/* <div>
              <button onClick={goToAllProducts} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">
                See All Products
              </button>
            </div> */}
        </div>
      </div>

      {/* <button onClick={goToAllProducts}>See All Products</button> */}
      {/* Recently Viewed Section */}
      <RecentlyViewed recentlyViewed={recentlyViewed} theme={theme} />


    </div>
  );
};

export default HomePage;

// const [currentBanner, setCurrentBanner] = useState(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     setCurrentBanner((prev) => (prev + 1) % banners.length);
//   }, 3000);
//   return () => clearInterval(interval);
// }, [banners.length]);


// Featured Deals carousel state
// const [currentDeal, setCurrentDeal] = useState(0);
// const [countdowns, setCountdowns] = useState([]);
// useEffect(() => {
//   const updateCountdowns = () => {
//     const newCountdowns = featuredDeals.map((deal) => {
//       const remainingTime = deal.offerEndTime - new Date().getTime();
//       if (remainingTime <= 0) {
//         return { id: deal.id, hours: 0, minutes: 0, seconds: 0 };
//       }
//       const hours = Math.floor(remainingTime / 3600000);
//       const minutes = Math.floor((remainingTime % 3600000) / 60000);
//       const seconds = Math.floor((remainingTime % 60000) / 1000);
//       return { id: deal.id, hours, minutes, seconds };
//     });
//     setCountdowns(newCountdowns);
//   };

//   const interval = setInterval(updateCountdowns, 1000);
//   return () => clearInterval(interval); // Cleanup on unmount
// }, []);


// const handleCarouselNav = (direction) => {
// setCurrentDeal((prevDeal) => {
//   if (direction === "prev") {
//     return prevDeal === 0 ? featuredDeals.length - 1 : prevDeal - 1;
//   }
//   if (direction === "next") {
//     return (prevDeal + 1) % featuredDeals.length;
//   }
//   return prevDeal;
// });
// };


{/* Product Grid */ }
{/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                imageUrl={product.imageUrl}
                title={product.title}
                price={product.price}
                onClick={() => alert(`Product: ${product.title}`)}
              />
            ))}
          </div> */}



{/* Shop by Pet Section */ }
{/* <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Shop by Pets</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <div className={`flex flex-col items-center ${cardClass} rounded-lg`} style={{ height: '200px' }}>
              <img src={dogImage} alt="Dog" className=" mb-2" style={{ height: '160px', width: 'auto' }} />
              <h3 className="font-semibold">Dogs</h3>
            </div>
            <div className={`flex flex-col items-center ${cardClass}  rounded-lg`} style={{ height: '200px' }}>
              <img src={cat} alt="Cat" className=" mb-2" style={{ height: '160px', width: 'auto' }} />
              <h3 className="font-semibold">Cats</h3>
            </div>

            <div className={`flex flex-col items-center ${cardClass}  rounded-lg`} style={{ height: '200px' }}>
              <img src={bird} alt="Bird" className=" mb-2" style={{ height: '160px', width: 'auto' }} /> 
              <h3 className="font-semibold">Birds</h3>
            </div>
            <div className={`flex flex-col items-center ${cardClass} rounded-lg`} style={{ height: '200px' }}>
              <img src={rab} alt="Small Pets" className=" mb-2" style={{ height: '160px', width: 'auto' }} />
              <h3 className="font-semibold">Small Pets</h3>
            </div>
          </div>
        </div> */}



{/* Products Section */ }
{/* <div className="w-3/4">
            <h2 className="text-2xl font-bold mb-4">Shop Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className={`shadow-lg rounded-lg p-4 flex flex-col items-center ${cardClass}`}
                  onClick={() => handleViewProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
                  <p className="mt-2">${product.price}</p>
                  <button className={`${buttonClass} text-white font-medium rounded mt-4`}>
                    Add to Cart
                  </button>
                  <button className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div> */}



{/* Recently Viewed Items */ }
{/* <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Recently Viewed Items</h2>
          {recentlyViewed.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto">
              {recentlyViewed.map((item) => (
                <div
                  key={item.id}
                  className={`min-w-[200px] max-w-[200px] p-4 rounded-lg shadow-md ${
                    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[150px] object-cover rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No recently viewed items.</p>
          )}
        </div> */}
