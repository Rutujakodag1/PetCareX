import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleRelatedProduct from "./SingleRelatedProduct";
const ProductDetail = () => {
    const baseUrl = 'http://petcarex-backend.onrender.com/api'
    const [productData, setproductData] = useState([]);
    const [productImgs, setproductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const { product_slug, product_id } = useParams();
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleSlideChange = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        fetchData(baseUrl + '/product/' + product_id);
        fetchRelatedData(baseUrl + '/related-products/' + product_id);
    }, []);

    function fetchData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setproductData(data);
                const imageUrls = data.product_imgs.map(imgObj => imgObj.image);
                setproductImgs(imageUrls);
                setproductTags(data.tag_list)
            });
    }


    function fetchRelatedData(baseurl) {
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setrelatedProducts(data.results);
            });
    }


    if (!productData) {
        return <div>Loading...</div>; // or use a spinner
    }


    const tagsLinks = []
    for (let i = 0; i < productTags.length; i++) {
        let tag = productTags[i].trim();
        tagsLinks.push(<Link key={tag} className="bg-pink-100 text-gray-800 py-2 px-4 rounded-full text-sm font-medium uppercase shadow-md cursor-default" to={`/products/${tag}`}>{tag}</Link>)

    }

    const sliderRef = useRef(null);

    // Scroll the slider
    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    console.log('Related Products:', relatedProducts);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Product Detail Container */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
                {/* Product Image Carousel */}
                <div className="relative">
                    {/* Main Image Display */}
                    <div className="w-full h-96 overflow-hidden">
                        {productImgs.length > 0 ? (
                            <img
                                src={productImgs[currentIndex]}
                                alt={`Slide ${currentIndex + 1}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <p className="text-center text-gray-500">No images available</p>
                        )}
                    </div>
                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {productImgs.map((img, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                                    } focus:outline-none`}
                                onClick={() => setCurrentIndex(index)}
                                aria-current={index === currentIndex ? "true" : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>


                {/* Product Info */}
                <div className="w-full md:w-1/2 p-6">
                    <h1 className="text-2xl font-bold text-gray-800">{productData.title}</h1>
                    <p className="mt-2 text-gray-600">{productData.detail}</p>
                    <p className="mt-4 text-lg font-semibold text-gray-700">{productData.price}</p>
                    {/* Reviews and Likes */}
                    <div className="flex items-center mt-4">
                        <span className="text-yellow-500">★★★★☆</span>
                        <span className="ml-2 text-gray-500">(120 Reviews)</span>
                        <span className="ml-auto flex items-center text-gray-700 cursor-pointer">
                            ❤️ <span className="ml-1">150 Likes</span>
                        </span>
                    </div>
                    {/* Specifications */}
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold">Specifications</h3>
                        <ul className="mt-2 text-gray-600">
                            <li>Weight: 1.2kg</li>
                            <li>Dimensions: 12x8x4 inches</li>
                            <li>Material: High-quality plastic</li>
                        </ul>
                    </div>
                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Add to Cart
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            Buy Now
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 my-4">
                        {tagsLinks}
                    </div>
                </div>
            </div>
            {/* Related Products */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="flex overflow-x-scroll no-scrollbar" ref={sliderRef}>
                    {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
                        relatedProducts.map((product) => (
                            <SingleRelatedProduct key={product.id} product={product} />
                        ))
                    ) : (
                        <p>No related products available.</p>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={() => scrollSlider('left')}
                    >
                        Left
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={() => scrollSlider('right')}
                    >
                        Right
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductDetail;
