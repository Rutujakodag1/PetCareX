// src/components/AllProducts.jsx
import React from 'react';
// import { useLocation } from 'react-router-dom';
// import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';


const PetCategories = () => {
  // const location = useLocation();
  // const products = location.state?.products;

  const baseUrl = 'http://127.0.0.1:8000/api'
  const [categories, setCategories] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() =>{
    fetchData(baseUrl+'/categories');
  },[]);

  function fetchData(baseurl) {
    fetch(baseurl)
    .then((response) => response.json())
    .then((data) => {
      setCategories(data.results);
      setTotalResults(data.count);
  });
  }

  function changeUrl(baseurl) {
    fetchData(baseurl);
  }
  var links = [];
  var limit = 1;
  var totalLinks = totalResults / limit;
  for (let i = 1; i <= totalLinks; i++) {
    links.push(
      <li key={i} className="page-item">
        <Link
          onClick={() => changeUrl(baseUrl + `/categories/?page=${i}`)}
          to={`/categories/?page=${i}`}
          className="page-link"
        >
          {i}
        </Link>
      </li>
    );
  }
  
  // if (!products) {
  //   return <div>Loading products...</div>;
  // }

 
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={ "https://cdn.stocksnap.io/img-thumbs/280h/dog-animal_DOTORLBDD7.jpg"}
              alt = {category.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">
                <Link to={`/category/${category.title}/${category.id}`}>
                  {category.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-600 mt-2">Short description about the category.</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2 items-center">
          {/* Previous Page Button */}
          <li>
            <button
              className="px-4 py-2 border rounded-md text-gray-400 border-gray-300 cursor-not-allowed"
              disabled
              aria-label="Previous Page"
            >
              &laquo;
            </button>
          </li>

          {/* Pagination Links */}
          {/* <li className="flex space-x-2"> */}
            {links} {/* Dynamically generate page links here */}
          {/* </li> */}
          
            {/* Next Page Button */}
          <li>
            <button
              className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
              aria-label="Next Page"
              >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PetCategories;
