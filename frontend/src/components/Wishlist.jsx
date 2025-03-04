import React, { useState } from "react";

const Wishlist = () => {
  // Sample wishlist data
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      petName: "Buddy",
      product: "Luxury Dog Bed",
      img: "/assets/dog-bed.png",
      link: "/products/dog-bed",
    },
    {
      id: 2,
      petName: "Whiskers",
      product: "Cat Scratching Post",
      img: "/assets/scratching-post.png",
      link: "/products/scratching-post",
    },
    {
      id: 3,
      petName: "Nibbles",
      product: "Rabbit Food Pack",
      img: "/assets/rabbit-food.png",
      link: "/products/rabbit-food",
    },
  ]);

  // Handle removing an item from the wishlist
  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
    alert("Item removed from your wishlist.");
  };

  return (
    <div className="bg-gradient-to-b from-[#DEECE1] to-[#FFD5C5] min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={item.img}
                alt={item.product}
                className="w-32 h-32 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{item.product}</h2>
              <p className="text-sm text-gray-600">For: {item.petName}</p>
              <div className="flex space-x-4 mt-4">
                <a
                  href={item.link}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  View Product
                </a>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Your wishlist is empty. Start adding items you love!
        </p>
      )}
    </div>
  );
};

export default Wishlist;
