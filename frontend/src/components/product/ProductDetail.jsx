import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SingleRelatedProduct from "./SingleRelatedProduct";
import logo from '../../assets/react.svg';

const ProductDetail = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const { product_slug, product_id } = useParams();

    const [productData, setproductData] = useState(null);
    const [productImgs, setproductImgs] = useState([]);
    const [productTags, setproductTags] = useState([]);
    const [relatedProducts, setrelatedProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [currentImage, setCurrentImage] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch product data
                const productResponse = await fetch(`${baseUrl}/product/${product_id}`);
                const productData = await productResponse.json();
                setproductData(productData);
                setCurrentImage(productData.image); // Set main image

                // Fetch related products
                const relatedResponse = await fetch(`${baseUrl}/related-products/${product_id}`);
                const relatedData = await relatedResponse.json();
                setrelatedProducts(relatedData.results || []);

                window.scrollTo(0, 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [product_id, baseUrl]);



    const handleNextImage = () => {
        setCurrentImageIndex(prev =>
            (prev + 1) % productData.product_imgs.length
        );
    };

    const handlePrevImage = () => {
        setCurrentImageIndex(prev =>
            (prev - 1 + productData.product_imgs.length) % productData.product_imgs.length
        );
    };;


    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = direction === "left" ? -300 : 300;
            sliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: "smooth",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!productData) {
        return <div className="text-center py-8">Product not found</div>;
    }

    const tagsLinks = []
    for (let i = 0; i < productTags.length; i++) {
        let tag = productTags[i].trim();
        tagsLinks.push(<Link key={tag} className="bg-pink-100 text-gray-800 py-2 px-4 rounded-full text-sm font-medium uppercase shadow-md cursor-default" to={`/products/${tag}`}>{tag}</Link>)

    }




    // console.log('Related Products:', relatedProducts);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Product Detail Container */}
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg">
                {/* Product Image Carousel */}
                <div className="w-full md:w-full p-4">
                    {productData.product_imgs?.length > 0 ? (
                        <div className="relative">
                            <img
                                src={currentImage}
                                alt={productData.title}
                                className="w-full h-96 object-contain rounded-lg"
                                onError={(e) => (e.target.src = logo)}
                            />

                            {productData.product_imgs.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                                    >
                                        &larr;
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
                                    >
                                        &rarr;
                                    </button>
                                </>
                            )}

                            <div className="flex gap-2 mt-4 overflow-x-auto py-2">
                                {[productData.image, ...productData.product_imgs.map(img => img.image)].map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${currentImage === img ? 'border-blue-500' : 'border-transparent'
                                            }`}
                                        onClick={() => setCurrentImage(img)}
                                        onError={(e) => (e.target.src = logo)}
                                    />
                                ))}
                            </div>

                        </div>
                    ) : (
                        <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
                            <img src={logo} alt="Default product" className="h-full object-contain" />
                        </div>
                    )}
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
            <div className="mt-8 ">
                <h2 className="text-2xl font-bold mb-4">Related Products</h2>
                <div className="flex overflow-x-scroll no-scrollbar gap-6" ref={sliderRef}>
                    {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
                        relatedProducts.map((product) => (
                            <div key={product.id} className="flex-shrink-0 w-[280px]"> {/* Fixed width for consistent sizing */}
                                <SingleRelatedProduct product={product} />
                            </div>
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
