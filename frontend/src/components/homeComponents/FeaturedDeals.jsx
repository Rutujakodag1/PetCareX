import React, { useState, useEffect } from "react";

const FeaturedDeals = ({ featuredDeals, theme }) => {
  const [countdowns, setCountdowns] = useState([]);

  // Calculate countdown for each deal
  const calculateCountdowns = () => {
    const currentTime = new Date().getTime();
    const updatedCountdowns = featuredDeals.map((deal) => {
      const timeLeft = deal.offerEndTime - currentTime;

      if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return { id: deal.id, hours, minutes, seconds };
      } else {
        return { id: deal.id, hours: 0, minutes: 0, seconds: 0 }; // Expired
      }
    });
    setCountdowns(updatedCountdowns);
  };

  // Update countdowns every second
  useEffect(() => {
    if (featuredDeals.length === 0) return;

    calculateCountdowns(); // Initial call

    const interval = setInterval(() => {
      calculateCountdowns();
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [featuredDeals]);

  return (
    <div className="p-4">
  <h2 className="text-3xl font-bold mb-6 text-center text-[#4A5568] dark:text-[#FFD5C5]">
    Featured PetCare Deals
  </h2>
  <div className="flex overflow-x-auto gap-6 py-4">
    {featuredDeals.map((deal, index) => (
      <div
        key={deal.id}
        className={`relative w-80 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl ${
          theme === "dark"
            ? "bg-[#2D3748] text-[#E2E8F0]"
            : "bg-gradient-to-br from-[#FFFAE5] to-[#E3F9E5] text-[#2D3748]"
        }`}
        style={{ minWidth: "250px" }}
      >
        <img
          src={deal.image}
          alt={deal.name}
          className="w-full h-40 object-cover rounded-t-lg transition-all duration-500 hover:opacity-90"
        />
        <div className="p-4">
          <h3 className="font-semibold text-xl">{deal.name}</h3>
          <p className="mt-2 text-lg font-medium text-[#38B2AC]">
            ${deal.price}
          </p>
          <div className="mt-4 flex flex-col">
            <h4 className="text-sm font-semibold text-[#718096]">Offer ends in:</h4>
            <p className="font-semibold text-xl text-[#4A5568] dark:text-[#FFD5C5]">
              {countdowns[index]
                ? `${countdowns[index].hours}h ${countdowns[index].minutes}m ${countdowns[index].seconds}s`
                : "Expired"}
            </p>
          </div>
        </div>
        {/* Adjusted overlay for dark mode */}
        {countdowns[index]?.hours === 0 &&
          countdowns[index]?.minutes === 0 &&
          countdowns[index]?.seconds === 0 && (
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#4A5568]  bg-opacity-70 flex items-center justify-center text-white font-bold text-xl"
            >
              <div className="flex flex-col items-center">
                <p className="dark:text-[#2D3748] text-white">Expired</p>
                <span className="mt-2 text-4xl dark:text-[#2D3748] text-white">
                  🐾
                </span>
              </div>
            </div>
          )}
      </div>
    ))}
  </div>
</div>
  
  );
};

export default FeaturedDeals;
