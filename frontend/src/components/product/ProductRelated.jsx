import React, { useState, useEffect } from 'react';

const RelatedProducts = ({ categoryId, theme }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Fetch related products based on categoryId
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const response = await fetch(`/api/products?categoryId=${categoryId}`);
      const data = await response.json();
      setRelatedProducts(data);
    };
    fetchRelatedProducts();
  }, [categoryId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {relatedProducts.length > 0 ? (
        relatedProducts.map((product) => (
          <div
            key={product.id}
            className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h4 className="text-lg font-semibold">{product.name}</h4>
            <p className="text-gray-500">${product.price}</p>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
              View Product
            </button>
          </div>
        ))
      ) : (
        <p>No related products found.</p>
      )}
    </div>
  );
};

export default RelatedProducts;
