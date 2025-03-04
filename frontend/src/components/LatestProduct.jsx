import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LatestProduct = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestProduct = async () => {
            try {
                const response = await axios.get('/api/products/latest'); // Replace with your API endpoint
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch the latest product.');
                setLoading(false);
            }
        };

        fetchLatestProduct();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {product && (
                <div>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover"
                    />
                    <div className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {product.name}
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {product.description}
                        </p>
                        <div className="mt-3 flex justify-between items-center">
                            <span className="text-xl font-bold text-gray-800 dark:text-white">
                                ${product.price}
                            </span>
                            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600 focus:outline-none">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestProduct;