import React, { useState, useEffect } from "react";
import logo from '../../assets/react.svg';

const Banner = ({ banners, bannerOverlayClass }) => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval); // Clean up the interval when the component is unmounted
  }, [banners.length]);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBanner ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={logo}
            alt={banner.text}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${bannerOverlayClass} flex items-center justify-center`}>
            <h1 className="text-3xl font-bold text-white">{banner.text}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
