// src/components/AllProducts.jsx
import React from 'react';
// import { useLocation } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useSearchParams } from "react-router";


const CategoryProducts = () => {

  const baseUrl = 'http://petcarex-backend.onrender.com/api'
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const { category_slug, category_id } = useParams();
  //   const [searchParams, setSearchParams] = useSearchParams();


  //   console.log(category_id);
  useEffect(() => {
    fetchData(baseUrl + '/products/?category=' + category_id);
  }, []);

  function fetchData(baseurl) {
    fetch(baseurl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.results);
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
    links.push(<li class="page-item"><Link onClick={() => changeUrl(baseUrl + `/products/?category=${category_id}&page=${i}`)} to={`/category/${category_slug}/${category_id}/?page=${i}`} class="page-link">{i}</Link></li>)
  }
  // if (!products) {
  //   return <div>Loading products...</div>;
  // }


  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <div className='row mb-4'> */}
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
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
          {links} {/* Ensure each element in links is already a valid <li> */}

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

export default CategoryProducts;
